import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { getLoggedUser, setLoggedUser, getToken, setUserSession, removeUserSession } from '../utils/common';
import Login from "../pages/login/Login";
import Comunas from "../pages/comuna/comunas";
import NewComuna from "../pages/comuna/newComuna";
import ListComuna from "../pages/comuna/listComuna";
import FiltroComuna from "../pages/comuna/filtroComuna";
import axios from 'axios';

export default function Router() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        getLoggedUser() === true
      );
    const [authLoading, setAuthLoading] = useState(true);

      useEffect(() => {
        setLoggedUser(isLoggedIn)
      }, [isLoggedIn]);

      const logIn = () => {
          setIsLoggedIn(true);
          setAuthLoading(false);
        }

        // pass this callback to components you want to allow logging out
        // it will update the local state and then get persisted
        const logOut = () => {
            setIsLoggedIn(false);
            removeUserSession()
        };

//         const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:8081/verifyToken?token=${token}`).then(response => {
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
                <Route path="/login" element={<Login onLogIn={logIn} />} />
                <Route path="/" element={isLoggedIn ? <Dashboard onLogOut={logOut} /> : <Navigate to='/login'/> }>
                    <Route path="comunas" element={<Comunas />}>
                        <Route index element={<FiltroComuna />} />
                        <Route path="filtro" element={<FiltroComuna />} />
                        <Route path="new" element={<NewComuna />} />
                        <Route path="list" element={<ListComuna />} />
                    </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}