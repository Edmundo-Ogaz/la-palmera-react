import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { getAll as ciudadGetAll } from '../../service/ciudad';
import { save } from '../../service/comuna'

export default function NewComuna() {
	console.log('NewComuna')
	
	const [ ciudades, setCiudades ] = useState([])
	const navigate = useNavigate();

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
					save(values.code, values.name, values.cityCode)
					.then(response => navigate('/comunas/list', { state: [ response ] } ))
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
        <button
				onClick={ () => {
					navigate('/comunas/list');
				} }
			>
            Lista
        </button>
        <button
				onClick={ () => {
					navigate('/comunas/filtro');
				} }
			>
            Filtro
        </button>
    </main>
	);
}