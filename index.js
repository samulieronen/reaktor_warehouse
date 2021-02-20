/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 12:33:48 by seronen           #+#    #+#             */
/*   Updated: 2021/02/20 15:01:34 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('./api/app')
const http = require('http')
const config = require('./api/utils/config')
const logger = require('./api/utils/log')

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.log(`Server running on port ${config.PORT}`)
})
