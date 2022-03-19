import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { getAll as comunaGetAll, update } from '../../service/comuna';
import { getAll as ciudadGetAll } from '../../service/ciudad';
import { verifyToken } from '../../service/token'
import { removeUserSession } from '../../session/sessionStorage'

export default function ModifyComuna() {
	console.log('ModifyComuna')
  const [ comunas, setComunas ] = useState([])
  const [ ciudades, setCiudades ] = useState([])
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // verifyToken()
    // .then(() => {
    //   comunaGetAll().then(response => setComunas(response.data));
      ciudadGetAll().then(response => setCiudades(response.data));
    // })
    // .catch(() => {
    //   removeUserSession()
    //   navigate('/login');
    // })
  }, [])

const customChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value);
  };

  	return (
      	<main style={ { padding: '1rem' } }>
          <h2>Modificar Comuna</h2>
          	<Formik
				initialValues={ { code: state.code, name: state.name, cityCode: state.cityCode } }
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
				onSubmit={ (values, actions) => {
					update(values.code, values.name, values.cityCode)
					.then(response => navigate('/comunas/list', { state: [ response ] } ))
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
                      <Field
							type="name"
							name="name"
							placeholder="Nombre"
							onChange={ e => customChange(e, setFieldValue) }
					  />
                      <Field as="select" name="cityCode">
                          <option value="">TODOS</option>
                          {ciudades.map(ciudad =>
                              <option key={ ciudad.codigo } value={ ciudad.codigo }>{ciudad.nombre}</option>
							)}
                      </Field>
                      <ErrorMessage name="ciudad" component="div" />
                      <button type="submit">Submit</button>
                  </Form>
        		)}
          	</Formik>
      	</main>
  	);
}