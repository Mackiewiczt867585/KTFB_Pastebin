import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AuthContext } from './Context/Auth';

function AuthRoute() {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute;