/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/08 01:35:14 by seronen           #+#    #+#             */
/*   Updated: 2021/02/11 12:53:52 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fetch = require('node-fetch')
const config = require('../utils/config')
const logger = require('../utils/log')

const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/'

const fetchAllProducts = async () => {
	const [beanies, facemasks, gloves] = await Promise.all([
		fetch(`${baseUrl}products/beanies`).then(response => response.json()),
		fetch(`${baseUrl}products/facemasks`).then(response => response.json()),
		fetch(`${baseUrl}products/gloves`).then(response => response.json())
	])
	return {
		beanies,
		facemasks,
		gloves
	}
}

const fetchAllAvailabilities = async (manufacturers) => {
	const availability = await Promise.all(manufacturers.map(item => 
		fetch(`${baseUrl}availability/${item}`).then(response => response.json())
	))
	return availability
}

module.exports = {
	fetchAllProducts,
	fetchAllAvailabilities
}