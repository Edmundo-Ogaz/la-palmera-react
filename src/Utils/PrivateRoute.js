import React from 'react';
import { Navigate } from 'react-router-dom';

import Dashboard from '../Dashboard';

import { getToken } from './Common';

function PrivateRoute() {
  console.log('PrivateRoute')

  return getToken() ? <Dashboard/> : <Navigate to="/login" />
}

export default PrivateRoute;