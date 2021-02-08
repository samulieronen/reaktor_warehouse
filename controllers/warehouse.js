/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   warehouse.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:43:50 by seronen           #+#    #+#             */
/*   Updated: 2021/02/08 02:01:01 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { request, response } = require('express')
const http = require('http')
const midware = require('../utils/middleware')
const warehouseRouter = require('express').Router()
const data = require('./data')


const init = [ { status: 'Hang tight, fetching data!' } ]

let availabilityData = []



let productData = [['beanies', init], ['gloves', init], ['facemasks', init]]

const collectData = async () => {
	productData['beanies'] = await data.getProducts('beanies')
	productData['gloves'] = await data.getProducts('gloves')
	productData['facemasks'] = await data.getProducts('facemasks')
}

collectData()

warehouseRouter.get('/', (request, response, next) => {
	response.redirect(301, '/warehouse')
})

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