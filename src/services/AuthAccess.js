/**
 * Path: /src/services/authAccess.js
 * Author: Atakan
 * Date Create: 15-Oct-2022
 * Purpose of this component: authentication class, see below for details
 */

class AuthAccess {
  constructor(token) {
    this.resourceaccess = this.getResourceAccessOfClientID(token);
  }

  /** Returns a object representation of the JWT token */
  getParsedJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return undefined;
    }
  }

  /** Returns ResourceAccess roles of ClientID from JWT token */
  getResourceAccessOfClientID(token) {
    try {
      return this.getParsedJwt(token)['realm_access']['roles'];
    } catch (error) {
      return undefined;
    }
  }

  /** Check if user has resource access role */
  hasRole(role) {
    try {
      return this.resourceaccess.includes(role.value);
    } catch (error) {
      return undefined;
    }
  }
}

export default AuthAccess;
