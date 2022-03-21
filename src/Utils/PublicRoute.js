import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../service/sessionStorage';

// handle the public routes
function PublicRoute() {
  console.log('PublicRoute')
  return !getToken() ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRoute;