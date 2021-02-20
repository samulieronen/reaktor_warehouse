/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/07 12:50:10 by seronen           #+#    #+#             */
/*   Updated: 2021/02/20 15:10:12 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const warehouseRouter = require('./controllers/warehouse')
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('api/build'))

app.use('/', warehouseRouter)


module.exports = app