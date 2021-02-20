/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 12:33:48 by seronen           #+#    #+#             */
/*   Updated: 2021/02/07 12:58:27 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/log')

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.log(`Server running on port ${config.PORT}`)
})
