# reaktor_warehouse
Reaktor's pre-assignment for Summer 2021.<br>

## Link
[Deployed to Heroku -> Go check it out!](https://reaktor-warehouse-s21.herokuapp.com/)

## Some things worth mentioning
– For the api, I used Node.js and Express.js as I am most comfortable using them.<br><br>
– Frontend is made on top of create-react-app with React.js and datagrid made with react-table which was lightweight enough to handle all the data.<br>
<br>
– Implemented pagination as I had problems with exceeding the maximum call stack size when rendering all data in one go...<br>
– Availability is color coded for fast interpretation.<br>
– Backend refreshing data every 5mins by default<br>
<br><br>

## How to run?
```
$ npm install
$ npm start
```

## Description
On a cold start, product data is fetched near instantly, but availability data seems to take up to 20 seconds to fetch. Keep refreshing the page.<br>
There is a status field which tells you what the backend is doing. It will also display an error message if the availability data cannot be fetched.<br>
I used a list of promises and fetched all product data first. Then I synced my manufacturers list which I need to fetch the availability data, hash the products by ID, (and make some adjustments to the data), so that I have the latest list of manufacturers.<br><br>
After that, I fetch the availability data.<br>
For the availability data, I used a similar list of promises, but now generated from the list of manufacturers which we got earlier.<br>
After it has got the data, we parse the xml payload individually, and link the availability data with the product using the ID.<br>
Now the previous "hashing" comes to play, as there is no need to iterate every time over all the products to find the single one, instead, I can now simply reference to a single product using the ID, as the products are stored in as a key: value pair.<br>
This decreases the time complexity enormously.<br>
<br>

## .ENV recognized variables for API
`PORT` = port what api should listen (defaults to 3001)<br>
`FORCE_ERROR` = Optional x-force-error-mode if you want to break the leagcy api (true / false, defaults to false)<br>
`REFRESH_RATE` = Amount of ms to set the update interval for api (defaults to 300000, 5 mins)<br>
`MAX_TRIES` = Amount of tries the availability fetcher should make if the response keeps on being bad. (defaults to 6 tries)
