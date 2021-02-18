import React, { useState, useEffect } from 'react'
import dataService from './services/data'
import MaterialTable from 'material-table'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import './App.css'

const columns = [
	{ 
		title: "NAME",
		field: "name"
	},
	{
		title: "MANUFACTURER",
		field: "manufacturer"
	},
	{
		title: "AVAILABILITY",
		field: "availability"
	},
	{ 
		title: "COLOR",
		field: "color"
	}, 
	{ 
		title: "PRICE",
		field: "price"
	},
	{
		title: "ID",
		field: "id"
	}
]

function App() {

	const [category, setCategory] = useState('beanies')
	const [data, setData] = useState([])

	useEffect(() => {
		dataService
			.fetch(category)
			.then(response => {
				let temp = []
				for (let prop in response) {
					if (Object.prototype.hasOwnProperty.call(response, prop)) {
						temp.push(response[prop])
					}
				}
				setData(temp)
			})
			.catch(error => console.log(error))
	}, [category])

	const handleCategoryClick = (new_category) => {
		setCategory(new_category)
	}
	console.log("Rendering Page")
	return (
		<div>
			<h1>Reaktor Warehouse</h1>
			<h2>Switch category</h2>
			<button className="catBtn" onClick={() => handleCategoryClick('beanies')}>Beanies</button>
			<button className="catBtn" onClick={() => handleCategoryClick('gloves')}>Gloves</button>
			<button className="catBtn" onClick={() => handleCategoryClick('facemasks')}>Facemasks</button>
			<MaterialTable
				columns={columns}
            	data={data}
            	title={`Current category: ${category}`}
				icons={{
					PreviousPage: React.forwardRef((props, ref) => <ArrowBackIcon ref={ref}/>),
					NextPage: React.forwardRef((props, ref) => <ArrowForwardIcon ref={ref}/>),
					LastPage:  React.forwardRef((props, ref) => <LastPageIcon ref={ref}/>),
					FirstPage:  React.forwardRef((props, ref) =>< FirstPageIcon ref={ref}/>)
				}}
				options={{
					search: false,
					sorting: false
				  }}
          	/>
		</div>
	)
}

export default App;
