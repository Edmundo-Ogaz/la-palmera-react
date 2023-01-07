import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux'
import { modify as modifyStore } from '../../store/cityReducer'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PropTypes from 'prop-types';

import { getAll as regionGetAll } from '../../services/regionService';

export default function ModifyCity(props) {
	console.log('ModifyCity')

	const { city } = props
	const [ regions, setRegions ] = useState([])

	const dispatch = useDispatch();

	useEffect(() => {
		regionGetAll().then(response => setRegions(response.data));
	}, [])

	const customChange = (e, setFieldValue) => {
		setFieldValue(e.target.name, e.target.value);
	};

	return (
  <main style={ { padding: '1rem' } }>
    <h2>Modificar Ciudad</h2>
    <Formik
				initialValues={ { code: city.code, name: city.name, codeCity: city.codeRegion } }
				validate={ values => {
					const errors = {};
					if (!values.code) {
						errors.code = 'Required';
					}
					if (!values.name) {
						errors.name = 'Required';
					}
					if (!values.codeRegion) {
						errors.codeRegion = 'Required';
					}
					return errors;
				} }
				onSubmit={ (values, actions) => {
					dispatch(
						modifyStore(values.code, values.name, values.codeRegion)
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
          <Field as="select" name="codeRegion">
            <option value="">TODOS</option>
            {regions.map(region =>
              <option key={ region.codigo } value={ region.codigo }>{region.nombre}</option>
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

ModifyCity.propTypes = {
	city: PropTypes.object,
	onClose: PropTypes.func
}