/**
 * Path: /src/Components/Shared/Auth/ProtectedBtAuth.js
 * Author: Atakan
 * Date Create: 1-Oct-2022
 * Purpose of this component: role protection
 */

import { useContext } from 'react';

import { AuthAccessContext } from '../../../App';

const ProtectedByRole = (props) => {
  const authAccessContext = useContext(AuthAccessContext);

  // return when context is not set
  if (!authAccessContext) {
    return null;
  }

  // return null when role is false
  if (!authAccessContext.hasRole(props.role)) {
    return null;
  }

  return props.children;
};

export default ProtectedByRole;
