import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';

import PrivateRoute from './utils/PrivateRoute.js';
import PublicRoute from './utils/PublicRoute';

import { getToken, getEspiration } from './services/sessionStorage';

import Comunas from './components/comuna';
import Cities from './components/city';

import { verifyToken } from './services/tokenService'

import { Provider } from 'react-redux';
import { store } from './store';

export default function App(props) {
  console.log('App')

  const [ authLoading, setAuthLoading ] = useState(true);

  useEffect(() => {
    const token = getToken()
    const expiration = getEspiration()
    if (!token || !expiration)
      return;

    verifyToken(token)
      .then(() => {
        const DIF = Math.abs(new Date(expiration).getTime() - new Date().getTime())
        console.log(DIF)
        setTimeout(() => {
          window.location = '/login';
        }, DIF)
        setAuthLoading(false)
      }).catch(error => {
        console.error(error)
        setAuthLoading(false);
        window.location = '/login';
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={ <PublicRoute /> } >
            <Route index element={ <Login /> } />
          </Route>
          <Route path="/" element={ <PrivateRoute /> } >
            <Route path="comunas" element={ <Comunas /> } />
            <Route path="cities" element={ <Cities /> } />
          </Route>
          <Route
            path="*"
            element={
              <main style={ { padding: '1rem' } }>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}