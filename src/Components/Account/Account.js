/**
 * Path: /src/Components/Account/Account.js
 * Author: Haerin
 * Date Create: 15-Nov-2022
 * Purpose of this component: Displays account page of the web app
 */

import React from 'react';

import AccountAction from './AccountAction';
import UserInfo from './UserInfo';

import './Account.css';

const Account = ({ user }) => {
  return (
    <>
      <UserInfo user={user} />
      <AccountAction />
    </>
  );
};

export default Account;
