/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   middleware.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 13:24:30 by seronen           #+#    #+#             */
/*   Updated: 2021/02/07 20:27:15 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const logger = require('./log')

const invalidEndpoint = (request, response, error, next) => {
	response.status(404).send({ error:'Invalid API Endpoint!' })
}

const errorHandler = (request, response, error, next) => {
	logger.error(error.message)
}

module.exports = {
	invalidEndpoint
}