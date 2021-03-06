/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/24 14:26:38 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// [ 'umpante', 'juuran', 'niksleh', 'laion', 'ippal', 'abiplos' ] Feb 18, 23.53
//

const { request, response } = require('express')
const logger = require('../utils/log')
const warehouseRouter = require('express').Router()
const dataHandler = require('./data')
const config = require('../utils/config')

const parseString = require('xml2js').parseString

const info = {
	Status: '',
	updateTime: 'Unknown'
}

let productData = {}
let freshData = {}

let availabilityData = []
let manufacturers = []

const syncManufacturers = (products) => {

	let newManufacturers = []
	for (var prop in products) {
		if (Object.prototype.hasOwnProperty.call(products, prop)) {
			let items = {}
			for (item of products[prop])
			{
				if (item) {
					if (!newManufacturers.includes(item.manufacturer)) {
						newManufacturers.push(item.manufacturer)
					}
					item.color = item.color.toString()
					items[item.id] = item
				}
			}
			products[prop] = items
		}
	}
	manufacturers = newManufacturers;
}

const linkAvailability = (instockvalue, id) => {
	if (!item)
		return
	for (var prop in freshData) {
		if (Object.prototype.hasOwnProperty.call(freshData, prop)) {
			if (freshData[prop][id]) {
				let target = freshData[prop][id]
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

const collectData = async (mode) => {
	info.status = 'Fetching products'
	freshData = await dataHandler.fetchAllProducts()
	syncManufacturers(freshData)

	if (!mode) {
		productData = freshData
	}

	info.status = 'Fetching availability data'
	let tries = 0
	mans = [...manufacturers]
	while (mans.length > 0) {
		if (tries === config.MAX_TRIES) {
			logger.error(`Tried ${config.MAX_TRIES} times with no avail.`)
			info.status = `Could not fetch availability data for: ${mans}. Trying again in ${config.REFRESH_RATE / 60000} minutes!`
			break
		}
		tmp = await dataHandler.fetchAllAvailabilities(mans)
		let index = 0
		tmpmans = [...mans]
		for (item of tmp) {
			if (item) {
				if (item.response !== '[]' && item.response.length > 0) {
					availabilityData = availabilityData.concat(item.response)
					mans.splice(mans.indexOf(tmpmans[index]), 1)
				}
			}
			index++
		}
		tries++
	}
	info.status = 'Parsing availability data'
	parseAvailability()
}

//	Fetch preliminary data

collectData(0)
	.then(() => {
		info.updateTime = new Date().toTimeString()
		productData = freshData
		freshData = {}
		info.status = 'Data fetch successful'
//		logger.log('Data fetched!')
	})
	.catch(error => logger.error(error))


// Refresh data every $refreshRate ms

setInterval(() => {
	collectData(1)
	.then(() => {
		info.updateTime = new Date().toTimeString()
		productData = freshData
		freshData = {}
		info.status = 'Data refresh successful'
//		logger.log('Data refreshed!')
	})
	.catch(error => logger.error(error))
}, config.REFRESH_RATE)



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

warehouseRouter.get('*', (request, response) => {
    response.send({error: 'Invalid API endpoint'});
    response.end();
})

module.exports = warehouseRouter
