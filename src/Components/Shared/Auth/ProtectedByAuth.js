/**
 * Path: /src/Components/Shared/Auth/ProtectedBtAuth.js
 * Author: Atakan
 * Date Create: 1-Oct-2022
 * Purpose of this component: authentication protection
 */

import React from 'react';

import { useAuth } from 'react-oidc-context';
import Login from './Login';

const ProtectedByAuth = ({ children }) => {
  const auth = useAuth();

  // return children if authenticated is true
  if (auth.isAuthenticated) {
    return children;
  }

  if (auth.isLoading) {
    return;
  }

  if (auth.error) {
    return 'Something went wrong!';
  }

  return (
    <div>
      <h1>Welcome, please login! </h1>
      <Login />
    </div>
  );
};

export default ProtectedByAuth;
