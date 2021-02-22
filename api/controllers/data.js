/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/08 01:35:14 by seronen           #+#    #+#             */
/*   Updated: 2021/02/22 14:45:20 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fetch = require('node-fetch')
const config = require('../utils/config')

const fetchAllProducts = async () => {
	const [beanies, facemasks, gloves] = await Promise.all([
		fetch(`${config.BASE_URL}products/beanies`, { method: 'GET', headers: config.HEADERS})
			.then(response => response.json()
			.catch(error => console.log(error))),
		fetch(`${config.BASE_URL}products/facemasks`, { method: 'GET', headers: config.HEADERS})
			.then(response => response.json()
			.catch(error => console.log(error))),
		fetch(`${config.BASE_URL}products/gloves`, { method: 'GET', headers: config.HEADERS})
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
		fetch(`${config.BASE_URL}availability/${item}`, { method: 'GET', headers: config.HEADERS})
			.then(response => response.json())
			.catch(error => console.log(error))))
	return availability
}

module.exports = {
	fetchAllProducts,
	fetchAllAvailabilities
}