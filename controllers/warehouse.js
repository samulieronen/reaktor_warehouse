/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/11 16:18:35 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { request, response } = require('express')
const http = require('http')
const midware = require('../utils/middleware')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const dataHandler = require('./data')

const parseString = require('xml2js').parseString

const refreshRate = 330000 // 5,5mins

const maxTries = 6

const loading = {
	code: 1,
	message: 'Fetching data, hold tight!'
}

const invalid = {
	code: -1,
	message: 'No data!'
}

let productData = {
	beanies: loading,
	gloves: loading,
	facemasks: loading
}

let availabilityData = []

let manufacturers = ['umpante', 'ippal', 'niksleh', 'abiplos', 'okkau', 'laion']

const syncManufacturers = (products) => {
	for (item of products.gloves) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	for (item of products.beanies) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	for (item of products.facemasks) {
		if (!manufacturers.includes(item.manufacturer))
			manufacturers.push(item.manufacturer)
	}
	console.log('Manufacturers list synced!')
}

const linkAvailability = (item) => {
	let index
	for (index = 0; index < productData.beanies.length; index++) {
		if (productData.beanies[index].id == item.id) {
			productData.beanies[index]['availability'] = item.DATAPAYLOAD.AVAILABILITY.INSTOCKVALUE[0]
			return
		}
	}
	for (index = 0; index < productData.facemasks.length; index++) {
		if (productData.facemasks[index].id == item.id) {
			productData.facemasks[index]['availability'] = item.DATAPAYLOAD.AVAILABILITY.INSTOCKVALUE[0]
			return
		}
	}
	for (index = 0; index < productData.gloves.length; index++) {
		if (productData.gloves[index].id == item.id) {
			productData.gloves[index]['availability'] = item.DATAPAYLOAD.AVAILABILITY.INSTOCKVALUE[0]
			return
		}
	}
}

const parseAvailability = () => {
	for (item of availabilityData) {
		xml = item.DATAPAYLOAD
		item.id = item.id.toLowerCase()
		parseString(xml, (err, result) => {
			item.DATAPAYLOAD = result
		});
		linkAvailability(item)
	}
}

const collectData = async () => {
	productData = await dataHandler.fetchAllProducts()
	console.log('Productdata fetched!')
	syncManufacturers(productData)

	let tries = 0
	mans = [...manufacturers]
	while (mans.length > 0) {
		if (tries === maxTries) {
			console.log(`Tried ${maxTries} times with no avail.`)
			break
		}
		tmp = await dataHandler.fetchAllAvailabilities(mans)
		let index = 0
		tmpmans = [...mans]
		for (item of tmp) {
			let tmpData = item.response
			if (tmpData !== '[]' && tmpData.length > 0) {
				availabilityData = availabilityData.concat(tmpData)
				mans.splice(mans.indexOf(tmpmans[index]), 1)
				console.log(`Got data for ${tmpmans[index]}.`)
			}
			else
				console.log(`Invalid data for ${tmpmans[index]}!`)
			index++
		}
		tries++
	}
	console.log('Data fetched!')
	parseAvailability()
	console.log('Data parsed and synced!')
}

//	Fetch preliminary data

collectData()

// Refresh data every $refreshRate ms

setInterval(() => {
	collectData()
	.then(() => console.log('Data refreshed!'))
}, refreshRate)

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
	if (value >= 0 && value < availabilityData.length)
		response.json(availabilityData[value])
	else
		response.json(invalid)
})

module.exports = warehouseRouter
