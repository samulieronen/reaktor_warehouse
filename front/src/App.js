import React, { useState, useEffect } from 'react'
import dataService from './services/data'
import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'
import './App.css'

const Styles = styled.div`
  padding: 1rem;

  table {
	border-collapse: collapse;
    margin: 0 auto;
    font-size: 1em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

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
		padding: 10px 15px;
		text-align: left;
	  	border-bottom: 1px solid black;
	  	border-right: 1px solid black;

	  :last-child {
		border-right: 0;
	  }
	}
	}
	tfoot {
		td {
			border-bottom: 0px;
	  		border-right: 0px;
		}
	}
	`

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
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		usePagination
	)

	return (
		<div className="datatable">
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
									if (cell.value === 'INSTOCK' || cell.value === 'OUTOFSTOCK' || cell.value === 'LESSTHAN10')
										return <td className={cell.value} {...cell.getCellProps()}>{cell.render('Cell')}</td>
									else
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})}
				<tfoot>
    				<tr>
      					<td colSpan="10">
							<button className="pageBtn" onClick={() => previousPage()} disabled={!canPreviousPage}>
							{'<'}
							</button>{' '}
						</td>
						<td>
							Page {pageIndex + 1} of {pageCount + 1}
						</td>
						<td>
							<select
								className="pageMenu"
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
						</td>
      					<td>
							<button className="pageBtn" onClick={() => nextPage()} disabled={!canNextPage}>
							{'>'}
							</button>{' '}
						</td>
    				</tr>
  				</tfoot>
				</tbody>
			</table>
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
			<div className="update">
				<h3>Last update: {info.updateTime}</h3>
				<h3>Status: {info.status}</h3>
			</div>
			<div className="categories">
				<h2>Switch category</h2>
				<button className="catBtn" onClick={() => handleCategoryClick('beanies')}>Beanies</button>{' '}
				<button className="catBtn" onClick={() => handleCategoryClick('gloves')}>Gloves</button>{' '}
				<button className="catBtn" onClick={() => handleCategoryClick('facemasks')}>Facemasks</button>{' '}
			</div>
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
