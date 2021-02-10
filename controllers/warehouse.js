/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/10 02:02:50 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { request, response } = require('express')
const http = require('http')
const midware = require('../utils/middleware')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const dataHandler = require('./data')

let productData = [['beanies'], ['gloves'], ['facemasks']]

const parseData = () => {
	
}

const collectData = async (items) => {
	let manufacturers = []
	let index = 0
	let ret = []
	for (index = 0; index < 3; index++) {
			ret = await dataHandler.getProducts(items[index], manufacturers)
							.catch(error => logger.log(error))
			productData[items[index]] = ret[0]
	}
	while (manufacturers.length > 0) {
		const temp = [...manufacturers]
		for (index = 0; index < temp.length; index++) {
			ret = await dataHandler.getAvailability(temp[index])
							.catch(error => console.log(error))
			if (!ret || !ret.response || ret.response.length < 50) {
				console.log(`Bad data for ${temp[index]}!\nTrying again soon...`)
			} else {
				console.log(`Got response for ${temp[index]}`)
				
				const toRemove = manufacturers.indexOf(temp[index])
				if (toRemove > -1)
					manufacturers.splice(toRemove, 1)
//				console.log(manufacturers)
			}
		}
	}
}

collectData(['beanies', 'gloves', 'facemasks'])

warehouseRouter.get('/', (request, response, next) => {
	response.status(301).redirect('/warehouse')
})

warehouseRouter.get('/warehouse', (request, response, next) => {
	response.status(200).send('<h1>Hello World!<br>I think the UI will be here soon!</h1>')
})

warehouseRouter.get('/warehouse/beanies', (request, response, next) => {
	response.json(productData['beanies'])
})

warehouseRouter.get('/warehouse/facemasks', (request, response, next) => {
	response.json(productData['facemasks'])
})

warehouseRouter.get('/warehouse/gloves', (request, response, next) => {
	response.json(productData['gloves'])
})

module.exports = warehouseRouter