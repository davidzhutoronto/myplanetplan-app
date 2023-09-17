/**
 * Path: /src/index.js
 * Author: React
 * Date Create: 15-Sept-2022
 * Purpose of this component: the index page...
 */

import React from 'react';

import { AuthProvider } from 'react-oidc-context';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { oidcConfig } from './config';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
