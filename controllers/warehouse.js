/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/09 19:20:54 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { request, response } = require('express')
const http = require('http')
const midware = require('../utils/middleware')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const data = require('../data')

let availabilityData = []
let productData = [['beanies'], ['gloves'], ['facemasks']]

const collectData = async (items) => {
	let manufacturers = []
	let index
	let ret
	for (index = 0; index < 3; index++) {
			ret = await data.getProducts(items[index], manufacturers)
							.catch(error => logger.log(error))
			productData[items[index]] = ret[0]
	}
}

collectData(['beanies', 'gloves', 'facemasks'])

warehouseRouter.get('/warehouse', (request, response, next) => {
	response.status(200).send('<h1>Hello World!</h1>')
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