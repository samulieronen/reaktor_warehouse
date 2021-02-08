/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/08 01:35:14 by seronen           #+#    #+#             */
/*   Updated: 2021/02/08 01:58:06 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fetch = require('node-fetch')
const config = require('../utils/config')
const logger = require('../utils/log')

const getProducts = async (name) => {
	const response = await fetch(config.BASE_URL + 'products/' + name, { 'method': 'GET', 'headers': config.HEADERS })
		.catch(error => {
			logger.error(error)
		})
	if (!response.ok)
		throw new Error(`Error occured while fetching ${item} data!`)
	const data = await response.json()
	return data
}

const getAvailability = async (name) => {
	const response = await fetch(config.BASE_URL + 'availability/' + name, { 'method': 'GET', 'headers': config.HEADERS })
	.catch(error => {
		logger.error(error)
	})
	if (!response.ok)
		throw new Error('Error occured while fetching availability data!')
	const data = await response.json()
	return data
	
}

module.exports = {
	getProducts,
	getAvailability
}