import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { search, selectCity, removeStore } from '../../store/cityReducer';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import Modal from '../../components/modal'
import Dialog from '../../components/dialog'

import NewCity from './newCity'
import ModifyCity from './modifyCity'

import { getAll as cityGetAll } from '../../services/cityService';
import { getAll as regionGetAll } from '../../services/regionService';

const columns = [
  { field: 'code', headerName: 'Código', width: 130 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'codeRegion', headerName: 'Región', width: 130 },
];

export default function Cities() {
  console.log('Cities')
  const [ cities, setCities ] = useState([])
  const [ regions, setRegions ] = useState([])

  const rows = useSelector(selectCity);
  const [ selectionModel, setSelectionModel ] = useState([])

  const [ openModal, setOpenModal ] = useState(false)
  const [ elementModel, setElementModel ] = useState()

  const [ openDialog, setOpenDialog ] = useState(false)
  const [ titleDialog, setTitleDialog ] = useState('')
  const [ contentDialog ] = useState('¿Desea continuar?')
  const [ agreeDialog, setAgreeDialog ] = useState(() => { })

  const dispatch = useDispatch();

  useEffect(() => {
    cityGetAll().then(response => setCities(response.data));
    regionGetAll().then(response => setRegions(response.data));
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
        <h2>Filtro Ciudad</h2>
        <Formik
          initialValues={ { city: '', region: '' } }
          validate={ values => {
            const errors = {};
            return errors;
          } }
          onSubmit={ (values, { setSubmitting }) => {
            dispatch(search(values.city, values.region))
          } }
        >
          {({ isSubmitting }) => (
            <Form>
              <Field as="select" name="city">
                <option value="">TODOS</option>
                {cities.map(city =>
                  <option key={ city.codigo } value={ city.codigo }>{city.nombre}</option>
                )}
              </Field>
              <ErrorMessage name="city" component="div" />
              <Field as="select" name="region">
                <option value="">TODOS</option>
                {regions.map(region =>
                  <option key={ region.codigo } value={ region.codigo }>{region.nombre}</option>
                )}
              </Field>
              <ErrorMessage name="region" component="div" />
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
              <NewCity
                onClose={ () => setOpenModal(false) }
              />
            )
            setOpenDialog(false)
            setOpenModal(true)
          })
          setOpenDialog(true)
        } }
        >
          Nueva Ciudad
        </button>
        <button
          onClick={ () => {
            setTitleDialog('Modificar')
            setAgreeDialog(() => () => {
              const selected = rows.find((row) => row.id === selectionModel[ 0 ])
              setElementModel(
                <ModifyCity
                  comuna={ selected }
                  onClose={ () => setOpenModal(false) }
                />
              )
              setOpenDialog(false)
              setOpenModal(true)
            })
            setOpenDialog(true)
          } }
        >
          Modificar Ciudad
        </button>
        <button
          onClick={ () => {
            setTitleDialog('Eliminar')
            setAgreeDialog(() => () => {
              const selected = rows.find((row) => row.id === selectionModel[ 0 ])
              dispatch(
                removeStore(selected.code)
              ).then(() => setOpenDialog(false))
            })
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