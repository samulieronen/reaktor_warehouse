import React, { useState, useEffect } from 'react'
import dataService from './services/data'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'
import './App.css'

const Styles = styled.div`
  padding: 1rem;

  table {
	border-spacing: 0;
	border: 1px solid black;

	tr {
	  :last-child {
		td {
		  border-bottom: 0;
		}
	  }
	  :nth-child(even) {background-color: #f2f2f2;}
	}

	th,
	td {
		padding: 15px;
		text-align: left;
	  	border-bottom: 1px solid black;
	  	border-right: 1px solid black;

	  :last-child {
		border-right: 0;
	  }
	}`

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		nextPage,
		pageCount,
		previousPage,
		setPageSize,
		state: { pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 2 },
		},
		usePagination
	)

	return (
		<div>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className="pagination">
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize} items
						</option>
					))}
				</select>
				<div>
					<h3>Pagecount: {pageCount}</h3>
					<h3>Page size: {pageSize}</h3>
				</div>
			</div>
		</div>
	)
}

function App() {

	const [category, setCategory] = useState('beanies')
	const [data, setData] = useState([])

	const init_info = {
		updateTime: 'Unknown'
	}
	const [info, setInfo] = useState(init_info)

	const columns = React.useMemo(() => [
		{
			Header: "NAME",
			accessor: "name"
		},
		{
			Header: "MANUFACTURER",
			accessor: "manufacturer"
		},
		{
			Header: "AVAILABILITY",
			accessor: "availability"
		},
		{
			Header: "COLOR",
			accessor: "color"
		},
		{
			Header: "PRICE",
			accessor: "price"
		},
		{
			Header: "ID",
			accessor: "id"
		}
	], [])

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

	useEffect(() => {
		dataService
			.info()
			.then(response => {
				setInfo(response)
			})
			.catch(error => console.log(error))
	}, [])

	const handleCategoryClick = (new_category) => {
		setCategory(new_category)
	}
	console.log("Rendering...")
	return (
		<div>
			<h1>Reaktor Warehouse</h1>
			<h2 className="update">Last update: {info.updateTime}</h2>
			<h2>Switch category</h2>
			<button className="catBtn" onClick={() => handleCategoryClick('beanies')}>Beanies</button>
			<button className="catBtn" onClick={() => handleCategoryClick('gloves')}>Gloves</button>
			<button className="catBtn" onClick={() => handleCategoryClick('facemasks')}>Facemasks</button>
			<h2>Current category: {category}</h2>
			<Styles>
				<Table
					columns={columns}
					data={data}
				/>
			</Styles>
		</div>
	)
}

export default App
