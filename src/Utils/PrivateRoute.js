import React from 'react';
import { Navigate } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

import { getToken } from '../service/sessionStorage';

function PrivateRoute() {
  console.log('PrivateRoute')

  return getToken() ? <Dashboard/> : <Navigate to="/login" />
}

export default PrivateRoute;