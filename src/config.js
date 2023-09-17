/**
 * Path: /src/config.js
 * Author:
 * Date Create: 1-Oct-2022
 * Purpose of this component: all configuration variables
 */

export const oidcConfig = {
  authority: process.env.REACT_APP_KEYCLOAK_URL,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENTID,
  redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URL,
  post_logout_redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URL,
  automaticSilentRenew: true,
};

export const PointsThresholdsVisuals = [1000, 5000, 25000, 100000, 500000];
