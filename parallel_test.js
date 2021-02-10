/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parallel_test.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: seronen <seronen@student.hive.fi>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/10 23:49:58 by seronen           #+#    #+#             */
/*   Updated: 2021/02/11 00:10:43 by seronen          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const parallelRequest = require('parallel-http-request')

let req = new parallelRequest();

const baseUrl = 'https://bad-api-assignment.reaktor.com/v2'

manufacturers = ['umpante', 'ippal', 'niksleh', 'abiplos', 'okkau', 'laion']

manufacturers_test = ['umpante', 'ippal']

let index = 0
for (index = 0; index < manufacturers.length ;index++) {
    req.add({
                url: `${baseUrl}availability/${manufacturers[index]}`,
                method: 'get'
            })
}
req.send(response => {
    console.log(response[0].status)
    console.log(response[1].status)
    console.log(response[2].status)
    console.log(response[3].status)
    console.log(response[4].status)
    console.log(response[5].status)
})