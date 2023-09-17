/**
 * Path: /src/Components/Shared/Auth/Logout.js
 * Author: Atakan
 * Date Create: 1-Oct-2022
 * Purpose of this component: to see if a user is authenticated and displays a logout button
 */

import React from 'react';

import { useAuth } from 'react-oidc-context';

const Login = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return 'Something went wrong!';
  }

  return (
    <button className="btn btn-secondary" onClick={() => auth.signoutRedirect()}>
      Logout
    </button>
  );
};

export default Login;
