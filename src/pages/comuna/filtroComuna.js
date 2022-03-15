import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { getAll as comunaGetAll, search as comunaSearch } from '../../service/comuna';
import { getAll as ciudadGetAll } from '../../service/ciudad';
import { verifyToken } from '../../service/token'
import { removeUserSession } from '../../session/sessionStorage'

export default function FiltroComuna() {
  const [ comunas, setComunas ] = useState([])
  const [ ciudades, setCiudades ] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken()
    .then(() => {
      comunaGetAll().then(response => setComunas(response.data));
      ciudadGetAll().then(response => setCiudades(response.data));
    })
    .catch(() => {
      removeUserSession()
      navigate('/login');
    })
  })

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
          comunaSearch(values.comuna, values.ciudad).then(response => {
            console.table(response.data)
            navigate('/comunas/list', { state: response.data })
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
          <p>
              <button
          onClick={ () => {
            navigate('/comunas/new');
          } }
        >
                  Nueva Comuna
              </button>
          </p>
      </main>
  );
}