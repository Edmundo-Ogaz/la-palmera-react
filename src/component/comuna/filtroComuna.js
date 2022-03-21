import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';

import { getAll as comunaGetAll, search as comunaSearch } from '../../service/comuna';
import { getAll as ciudadGetAll } from '../../service/ciudad';

export default function FiltroComuna() {
	console.log('FiltroComuna')

    const [ comunas, setComunas ] = useState([])
	const [ ciudades, setCiudades ] = useState([])
	
	const navigate = useNavigate();
    
    useEffect(() => {
		comunaGetAll().then(response => setComunas(response.data));
		ciudadGetAll().then(response => setCiudades(response.data));
	}, [])

    return (
        <main style={ { padding: '1rem' } }>
            <h2>Filtro Comuna</h2>
            <Formik 
				initialValues={ { comuna: '', ciudad: '' } }
				validate={ values => {
					const errors = {};
					return errors;
				} }
				onSubmit={ (values, { setSubmitting }) => {
					comunaSearch(values.comuna, values.ciudad)
					.then(response => {
						navigate('/comunas/list', { state: response })
					})
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
            <button
				onClick={ () => {
					navigate('/comunas/new');
				} }
			>
                Nueva Comuna
            </button>
        </main>
  	);
}