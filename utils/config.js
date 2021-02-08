/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   config.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 12:51:55 by seronen           #+#    #+#             */
/*   Updated: 2021/02/08 01:56:28 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

require('dotenv').config()

PORT = process.env.PORT || 3001
BASE_URL = 'https://bad-api-assignment.reaktor.com/v2/'
FORCE_ERROR = process.env.FORCE_ERROR || false

HEADERS = {
	'content-type': 'application/json'
}
if (FORCE_ERROR) {
	HEADERS = {
		'content-type': 'application/json',
		'x-force-error-mode': 'all'
	}
}


module.exports = {
    PORT,
	BASE_URL,
	HEADERS
}
