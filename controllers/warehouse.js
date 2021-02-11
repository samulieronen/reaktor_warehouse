/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/11 02:50:51 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { request, response } = require('express')
const http = require('http')
const midware = require('../utils/middleware')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const dataHandler = require('./data')

let productData = {
	beanies: ['Fetching data, hold tight!'],
	gloves: ['Fetching data, hold tight!'],
	facemasks: ['Fetching data, hold tight!']
}

let availabilityData = []

let manufacturers = ['umpante', 'ippal', 'niksleh', 'abiplos', 'okkau', 'laion']

const syncManufacturers = (items) => {
	for (item of productData.gloves) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	for (item of productData.beanies) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	for (item of productData.facemasks) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	console.log(manufacturers)
}

const collectData = async () => {
	productData = await dataHandler.fetchAllProducts()
	syncManufacturers(productData)
	availabilityData = await dataHandler.fetchAllAvailabilities(manufacturers)
}

collectData()

warehouseRouter.get('/', (request, response, next) => {
	response.status(301).redirect('/warehouse')
})

warehouseRouter.get('/warehouse', (request, response, next) => {
	response.status(200).send('<h1>Hello World!<br>I think the UI will be here soon!</h1>')
})

warehouseRouter.get('/warehouse/beanies', (request, response, next) => {
	response.json(productData.beanies)
})

warehouseRouter.get('/warehouse/facemasks', (request, response, next) => {
	response.json(productData.facemasks)
})

warehouseRouter.get('/warehouse/gloves', (request, response, next) => {
	response.json(productData.gloves)
})

warehouseRouter.get('/warehouse/availability', (request, response, next) => {
	response.json(availabilityData)
})

warehouseRouter.get('/warehouse/availability/:id', (request, response, next) => {
	const value = Number(request.params.id)
	response.json(availabilityData[value])
})

module.exports = warehouseRouter