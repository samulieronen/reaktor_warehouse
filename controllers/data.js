/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/08 01:35:14 by seronen           #+#    #+#             */
/*   Updated: 2021/02/12 00:51:41 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fetch = require('node-fetch')
const config = require('../utils/config')
const logger = require('../utils/log')

const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/'

const fetchAllProducts = async () => {
	const [beanies, facemasks, gloves] = await Promise.all([
		fetch(`${baseUrl}products/beanies`)
			.then(response => response.json()
			.catch(error => console.log(error))),
		fetch(`${baseUrl}products/facemasks`)
			.then(response => response.json()
			.catch(error => console.log(error))),
		fetch(`${baseUrl}products/gloves`)
			.then(response => response.json()
			.catch(error => console.log(error)))
	])
	return {
		beanies,
		facemasks,
		gloves
	}
}

const fetchAllAvailabilities = async (items) => {
	const availability = await Promise.all(items.map(item => 
		fetch(`${baseUrl}availability/${item}`)
			.then(response => response.json())
			.catch(error => console.log(error))))
	return availability
}

module.exports = {
	fetchAllProducts,
	fetchAllAvailabilities
}