/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/19 15:37:26 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// [ 'umpante', 'juuran', 'niksleh', 'laion', 'ippal', 'abiplos' ] Feb 18, 23.53
//

const { request, response } = require('express')
const midware = require('../utils/middleware')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const dataHandler = require('./data')

const parseString = require('xml2js').parseString

const refreshRate = 330000 // 5,5mins

const maxTries = 6

const info = {
	updateTime: "",
	noAvail: []
}

const loading = {
	code: 1,
	message: 'Fetching data, hold tight!'
}

let productData = {
	beanies: loading,
	gloves: loading,
	facemasks: loading
}

let availabilityData = []
let manufacturers = []

const syncManufacturers = (products) => {
	let newManufacturers = []
	let gloves = {}
	for (item of products.gloves) {
		if (!newManufacturers.includes(item.manufacturer))
			newManufacturers.push(item.manufacturer)
		gloves[item.id] = item
	}
	productData.gloves = gloves
	
	let beanies = {}
	for (item of products.beanies) {
		if (!newManufacturers.includes(item.manufacturer))
			newManufacturers.push(item.manufacturer)
		beanies[item.id] = item
	}
	productData.beanies = beanies

	let facemasks = {}
	for (item of products.facemasks) {
		if (!newManufacturers.includes(item.manufacturer))
			newManufacturers.push(item.manufacturer)
		facemasks[item.id] = item
	}
	productData.facemasks = facemasks

	manufacturers = newManufacturers;
}

const linkAvailability = (instockvalue, id) => {
	if (!item)
		return
	for (var prop in productData) {
		if (Object.prototype.hasOwnProperty.call(productData, prop)) {
			if (productData[prop][id]) {
				let target = productData[prop][id]
				target['availability'] = instockvalue
				return
			}
		}
	}
}

const parseAvailability = () => {
	for (item of availabilityData) {
		xml = item.DATAPAYLOAD
		item.id = item.id.toLowerCase()
		parseString(xml, (err, result) => {
			if (result.AVAILABILITY && result.AVAILABILITY.INSTOCKVALUE)
				linkAvailability(result.AVAILABILITY.INSTOCKVALUE[0], item.id)
			else
			linkAvailability('NO DATA', item.id)
		})
	}
}

const collectData = async () => {
	productData = await dataHandler.fetchAllProducts()
	syncManufacturers(productData)

	let tries = 0
	mans = [...manufacturers]
	console.log(mans)
	while (mans.length > 0) {
		if (tries === maxTries) {
			logger.error(`Tried ${maxTries} times with no avail.`)
			logger.error(`Could not fetch data for ${mans}`)
			info.noAvail.concat(mans)
			break
		}
		tmp = await dataHandler.fetchAllAvailabilities(mans)
		let index = 0
		tmpmans = [...mans]
		for (item of tmp) {
			if (item) {
				let tmpData = item.response
				if (tmpData !== '[]' && tmpData.length > 0) {
					availabilityData = availabilityData.concat(tmpData)
					mans.splice(mans.indexOf(tmpmans[index]), 1)
				}
			}
			else
				logger.log(`Invalid data for ${tmpmans[index]}!`)
			index++
		}
		tries++
	}
	parseAvailability()
}

//	Fetch preliminary data

collectData()
	.then(() => {
		info.updateTime = new Date().toTimeString()
		logger.log('Data fetched!')
	})
	.catch(error => logger.error(error))


// Refresh data every $refreshRate ms

setInterval(() => {
	collectData()
	.then(() => {
		info.updateTime = new Date().toTimeString()
		logger.log('Data refreshed!')
	})
	.catch(error => logger.error(error))
}, refreshRate)



warehouseRouter.get('/', (request, response, next) => {
	response.status(200).send('<h1>Hello World!</h1>')
})

warehouseRouter.get('/api/warehouse/beanies', (request, response, next) => {
	response.json(productData.beanies)
})

warehouseRouter.get('/api/warehouse/facemasks', (request, response, next) => {
	response.json(productData.facemasks)
})

warehouseRouter.get('/api/warehouse/gloves', (request, response, next) => {
	response.json(productData.gloves)
})

warehouseRouter.get('/api/warehouse/info', (request, response, next) => {
	response.json(info)
})

module.exports = warehouseRouter
