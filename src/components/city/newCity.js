import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { save as saveComuna } from '../../store/cityReducer'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import PropTypes from 'prop-types';

import { getAll as regionGetAll } from '../../services/regionService';

export default function NewCity(props) {
	console.log('NewCity')
	
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
    <h2>Nueva Ciudad</h2>
    <Formik
			initialValues={ { code: '', name: '', region: '' } }
			validate={ values => {
				const errors = {};
				if (!values.code) {
					errors.code = 'Required';
				}
				if (!values.name) {
					errors.name = 'Required';
				}
				if (!values.regionCode) {
					errors.regionCode = 'Required';
				}
				return errors;
			} }
			onSubmit={ (values, { setSubmitting }) => {
				dispatch(
					saveComuna(values.code, values.name, values.regionCode)
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
          <Field as="select" name="regionCode">
            <option value="">TODOS</option>
            {regions.map(region =>
              <option key={ region.codigo } value={ region.codigo }>{region.nombre}</option>
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

NewCity.propTypes = {
	onClose: PropTypes.func
}