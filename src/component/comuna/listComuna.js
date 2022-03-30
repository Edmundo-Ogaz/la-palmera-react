import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import { remove } from '../../service/comuna'

const columns = [
	{ field: 'code', headerName: 'Código', width: 130 },
	{ field: 'name', headerName: 'Nombre', width: 130 },
	{ field: 'codeCity', headerName: 'Ciudad', width: 130 },
  ];

export default function ListComuna() {
	console.log('ListComuna')

	const navigate = useNavigate()
	const { state } = useLocation()
	const [ selectionModel, setSelectionModel ] = useState([])
	const [ rows, setRows ] = useState(state.map((comuna, index) => {
		return { id: index, code: comuna.code, name: comuna.name, codeCity: comuna.codeCity }
	}))

	const handleSelection = (selection) => {
		if (selection.length > 1) {
			const selectionSet = new Set(selectionModel)
			const result = selection.filter((s) => !selectionSet.has(s))
			setSelectionModel(result)
		} else {
			setSelectionModel(selection)
		}
	}

  	return (
      	<main style={ { height: 400, width: '100%' } }>
          	<h2>List Comuna</h2>
          	<div style={ { height: 400, width: '100%' } }>
              <DataGrid
					rows={ rows }
					columns={ columns }
					pageSize={ 5 }
					rowsPerPageOptions={ [ 5 ] }
					checkboxSelection
					disableSelectionOnClick
					hideFooterSelectedRowCount
					onSelectionModelChange={ handleSelection }
					selectionModel={ selectionModel }
				/>
          	</div>
          	<button
				onClick={ () => {
					navigate('/comunas/new')
				} }
				>
              	Nueva Comuna
          	</button>
          	<button
				onClick={ () => {
					const selected = rows.find((row) => row.id === selectionModel[ 0 ])
					navigate('/comunas/modify', { state: selected })
				} }
				>
              Modificar
          	</button>
          <button
				onClick={ () => {
					const selected = rows.find((row) => row.id === selectionModel[ 0 ])
					remove(selected.code)
					.then(() => {
						setSelectionModel([])
						setRows(rows.filter((row) => row.code !== selected.code))
					})
				} }
				>
              Eliminar
          	</button>
          	<button
				onClick={ () => {
					navigate('/comunas/filtro')
				} }
				>
              	Volver
          	</button>
      	</main>
  	);
}