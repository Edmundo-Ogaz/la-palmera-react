import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import { getToken, removeUserSession, setUserSession } from './service/sessionStorage';

import Comunas from './component/comuna/comunas';
import NewComuna from './component/comuna/newComuna';
import ListComuna from './component/comuna/listComuna';
import FiltroComuna from './component/comuna/filtroComuna';
import ModifyComuna from './component/comuna/modifyComuna';

import { verifyToken } from './service/token'

export default function Router() {
	console.log('Router')
	
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
    <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={ <PublicRoute /> } >
                <Route index element={ <Login /> } />
            </Route>
            <Route path="/" element={ <PrivateRoute /> } >
                <Route path="comunas" element={ <Comunas /> } >
                    <Route index element={ <FiltroComuna /> } />
                    <Route path="filtro" element={ <FiltroComuna /> } />
                    <Route path="new" element={ <NewComuna /> } />
                    <Route path="list" element={ <ListComuna /> } />
                    <Route path="modify" element={ <ModifyComuna /> } />
                </Route>
            </Route>
            <Route path="*"	element={ 
                <main style={ { padding: '1rem' } }>
                    <p>There's nothing here!</p>
                </main>
				}
				/>
        </Routes>
    </BrowserRouter>
	);
}