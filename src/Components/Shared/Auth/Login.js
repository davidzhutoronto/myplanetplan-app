/**
 * Path: /src/Components/Shared/Auth/Login.js
 * Author: Atakan
 * Date Create: 1-Oct-2022
 * Purpose of this component: to see if a user is authenticated and displays a login button
 */

import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from 'react-oidc-context';

const Login = () => {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return;
  }
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return 'Something went wrong!';
  }

  return (
    <Button variant="success" onClick={() => auth.signinRedirect()}>
      Use for Free!
    </Button>
  );
};

export default Login;
