/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/18 14:20:26 by seronen           #+#    #+#             */
/*   Updated: 2021/02/19 00:29:52 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from 'axios'

const url = 'http://localhost:3001/api/warehouse/'

const fetch = (product) => {
    console.log(`Fetching ${product} data!`)
	const request = axios.get(`${url}${product}`)
	return (request.then(response => response.data))
}

const info = () => {
    const request = axios.get(`${url}info`)
    return (request.then(response => response.data))
}

const dataService = {
    fetch,
    info
}

export default dataService
