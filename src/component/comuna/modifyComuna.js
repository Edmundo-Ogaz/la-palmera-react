import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux'
import { modify as modifyStore } from '../../store/comunaReducer'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PropTypes from 'prop-types';

import { getAll as ciudadGetAll } from '../../service/ciudad';

export default function ModifyComuna(props) {
	console.log('ModifyComuna')

	const { comuna } = props
	const [ ciudades, setCiudades ] = useState([])

	const dispatch = useDispatch();

	useEffect(() => {
		ciudadGetAll().then(response => setCiudades(response.data));
	}, [])

	const customChange = (e, setFieldValue) => {
		setFieldValue(e.target.name, e.target.value);
	};

  	return (
      	<main style={ { padding: '1rem' } }>
          <h2>Modificar Comuna</h2>
          	<Formik
				initialValues={ { code: comuna.code, name: comuna.name, codeCity: comuna.codeCity } }
				validate={ values => {
					const errors = {};
					if (!values.code) {
						errors.code = 'Required';
					}
					if (!values.name) {
						errors.name = 'Required';
					}
					if (!values.codeCity) {
						errors.codeCity = 'Required';
					}
					return errors;
				} }
				onSubmit={ (values, actions) => {
					dispatch(
						modifyStore(values.code, values.name, values.codeCity)
					).then(() => props.onClose())
				} }
				onChange={ (values, actions) => {
					console.log('On Change');
				} }
				>
              	{({ values, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                  <Form>
                      <Field
					  		type="code"
							name="code"
							placeholder="Código"
							onChange={ e => customChange(e, setFieldValue) }
							disabled={ true }
						/>
                      <ErrorMessage name="code" component="div" />
                      <Field
							type="name"
							name="name"
							placeholder="Nombre"
							onChange={ e => customChange(e, setFieldValue) }
					  />
                      <ErrorMessage name="name" component="div" />
                      <Field as="select" name="codeCity">
                          <option value="">TODOS</option>
                          {ciudades.map(ciudad =>
                              <option key={ ciudad.codigo } value={ ciudad.codigo }>{ciudad.nombre}</option>
							)}
                      </Field>
                      <ErrorMessage name="codeCity" component="div" />
                      <button type="submit">Submit</button>
                  </Form>
        		)}
          	</Formik>
      	</main>
  	);
}

ModifyComuna.propTypes = {
	comuna: PropTypes.object,
	onClose: PropTypes.func
}