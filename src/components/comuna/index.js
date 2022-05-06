import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { search, selectComuna, removeStore } from '../../store/comunaReducer';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import Modal from '../../components/modal'
import Dialog from '../../components/dialog'

import NewComuna from './newComuna'
import ModifyComuna from './modifyComuna'

import { getAll as comunaGetAll } from '../../services/comunaService';
import { getAll as ciudadGetAll } from '../../services/ciudadService';

const columns = [
	{ field: 'code', headerName: 'Código', width: 130 },
	{ field: 'name', headerName: 'Nombre', width: 130 },
	{ field: 'codeCity', headerName: 'Ciudad', width: 130 },
];

export default function Comunas() {
  console.log('Comunas')
  const [ comunas, setComunas ] = useState([])
	const [ ciudades, setCiudades ] = useState([])

	const rows = useSelector(selectComuna);
	const [ selectionModel, setSelectionModel ] = useState([])

	const [ openModal, setOpenModal ] = useState(false)
	const [ elementModel, setElementModel ] = useState()

	const [ openDialog, setOpenDialog ] = useState(false)
	const [ titleDialog, setTitleDialog ] = useState('')
	const [ contentDialog ] = useState('¿Desea continuar?')
	const [ agreeDialog, setAgreeDialog ] = useState(() => {})

	const dispatch = useDispatch();
	    
  useEffect(() => {
		comunaGetAll().then(response => setComunas(response.data));
		ciudadGetAll().then(response => setCiudades(response.data));
        dispatch(search())    
	}, [])

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
  <>
    <main style={ { width: '100%' } }>
      <h2>Filtro Comuna</h2>
      <Formik
				initialValues={ { comuna: '', ciudad: '' } }
				validate={ values => {
						const errors = {};
						return errors;
				} }
				onSubmit={ (values, { setSubmitting }) => {
						dispatch(search(values.comuna, values.ciudad))
				} }
			>
        {({ isSubmitting }) => (
          <Form>
            <Field as="select" name="comuna">
              <option value="">TODOS</option>
              {comunas.map(comuna =>
                <option key={ comuna.codigo } value={ comuna.codigo }>{comuna.nombre}</option>
						)}
            </Field>
            <ErrorMessage name="comuna" component="div" />
            <Field as="select" name="ciudad">
              <option value="">TODOS</option>
              {ciudades.map(ciudad =>
                <option key={ ciudad.codigo } value={ ciudad.codigo }>{ciudad.nombre}</option>
						)}
            </Field>
            <ErrorMessage name="ciudad" component="div" />
            <button type="submit" disabled={ isSubmitting }>
              Submit
            </button>
          </Form>
				)}
      </Formik>
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
      <button onClick={ () => {
				setTitleDialog('Nuevo')
				setAgreeDialog(() => () => {
					setElementModel(
  					<NewComuna
							onClose={ () => setOpenModal(false) }
						/>
					)
					setOpenDialog(false)
					setOpenModal(true)
				} )
				setOpenDialog(true)
      } }
			>
        Nueva Comuna
      </button>
      <button
				onClick={ () => {
					setTitleDialog('Modificar')
					setAgreeDialog(() => () => {
						const selected = rows.find((row) => row.id === selectionModel[ 0 ])
						setElementModel(
  						<ModifyComuna
								comuna={ selected }
								onClose={ () => setOpenModal(false) }
							/>
						)
						setOpenDialog(false)
						setOpenModal(true)
					} )
										setOpenDialog(true)
				} }
			>
        Modificar Comuna
      </button>
      <button
				onClick={ () => {
					setTitleDialog('Eliminar')
					setAgreeDialog(() => () => {
						const selected = rows.find((row) => row.id === selectionModel[ 0 ])
						dispatch(
								removeStore(selected.code)
						).then(() => setOpenDialog(false))
					} )
					setOpenDialog(true)
				} }
			>
        Eliminar
      </button>
    </main>
    <Modal
			open={ openModal }
			onClose={ () => setOpenModal(false) }
		>
      {elementModel}
    </Modal>
    <Dialog
			title={ titleDialog }
			content={ contentDialog }
			open={ openDialog }
			onClose={ () => setOpenDialog(false) }
			agree={ agreeDialog }
		>
    </Dialog>
  </>
	);
}