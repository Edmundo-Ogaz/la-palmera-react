import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { save as saveComuna } from '../../store/comunaReducer'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PropTypes from 'prop-types';

import { getAll as ciudadGetAll } from '../../services/ciudadService';

export default function NewComuna(props) {
	console.log('NewComuna')
	
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
    <h2>Nueva Comuna</h2>
    <Formik
			initialValues={ { code: '', name: '', city: '' } }
			validate={ values => {
				const errors = {};
				if (!values.code) {
					errors.code = 'Required';
				}
				if (!values.name) {
					errors.name = 'Required';
				}
				if (!values.cityCode) {
					errors.cityCode = 'Required';
				}
				return errors;
			} }
			onSubmit={ (values, { setSubmitting }) => {
				dispatch(
					saveComuna(values.code, values.name, values.cityCode)
				)
				.then(() => props.onClose())
			} }
		>
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <Field
						type="code"
						name="code"
						placeholder="Código"
						onChange={ e => customChange(e, setFieldValue) }
					/>
          <Field
						type="name"
						name="name"
						placeholder="Nombre"
						onChange={ e => customChange(e, setFieldValue) }
					/>
          <ErrorMessage name="name" component="div" />
          <Field as="select" name="cityCode">
            <option value="">TODOS</option>
            {ciudades.map(ciudad =>
              <option key={ ciudad.codigo } value={ ciudad.codigo }>{ciudad.nombre}</option>
							)}
          </Field>
          <ErrorMessage name="cityCode" component="div" />
          <button type="submit" disabled={ isSubmitting }>
            Submit
          </button>
        </Form>
				)}
    </Formik>
  </main>
	);
}

NewComuna.propTypes = {
	onClose: PropTypes.func
}