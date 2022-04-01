import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import { getToken, removeUserSession, setUserSession } from './services/sessionStorage';

import Comunas from './components/comuna';

import { verifyToken } from './services/tokenService'

import { Provider } from 'react-redux';
import { store } from './store';

export default function App( props ) {
	console.log('App')

	const [ authLoading, setAuthLoading ] = useState(true);

	useEffect(() => {
		const token = getToken();
		if (!token) {
			return;
		}

		verifyToken(token)
		.then(response => {
			setUserSession(response.token, response.user);
			setAuthLoading(false);
		}).catch(error => {
			removeUserSession();
			setAuthLoading(false);
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
                  </Route>
                  <Route path="*"	element={ 
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