import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { getLoggedUser, setLoggedUser, getToken, setUserSession, removeUserSession } from '../session/sessionStorage';
import Login from '../pages/login/Login';
import Comunas from '../pages/comuna/comunas';
import NewComuna from '../pages/comuna/newComuna';
import ListComuna from '../pages/comuna/listComuna';
import FiltroComuna from '../pages/comuna/filtroComuna';
import ModifyComuna from '../pages/comuna/modifyComuna';
import axios from 'axios';
import { verifyToken } from '../service/token' 

export default function Router() {
	console.log('Router')
    const [ isLoggedIn, setIsLoggedIn ] = useState(
        getLoggedUser() === true
      );
    const [ authLoading, setAuthLoading ] = useState(true);

      useEffect(() => {
        setLoggedUser(isLoggedIn)
      }, [ isLoggedIn ]);

      const logIn = () => {
          setIsLoggedIn(true);
          setAuthLoading(false);
        }

        const logOut = () => {
            setIsLoggedIn(false);
            removeUserSession()
        };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    verifyToken()
    .then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
      setIsLoggedIn(false)
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <Login onLogIn={ logIn } /> } />
                <Route path="/" element={ isLoggedIn ? <Dashboard onLogOut={ logOut } /> : <Navigate to='/login'/> }>
                    <Route path="comunas" element={ <Comunas /> }>
                        <Route index element={ <FiltroComuna /> } />
                        <Route path="filtro" element={ <FiltroComuna /> } />
                        <Route path="new" element={ <NewComuna /> } />
                        <Route path="list" element={ <ListComuna /> } />
                        <Route path="modify" element={ <ModifyComuna /> } />
                    </Route>
                    <Route
                    path="*"
                    element={
                        <main style={ { padding: '1rem' } }>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}