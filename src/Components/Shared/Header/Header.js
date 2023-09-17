/**
 * Path: /src/Components/Shared/Header/Header.js
 * Author: Misha
 * Date Create: 5-Oct-2022
 * Purpose of this component: header of each page
 */

import React from 'react';
import { useAuth } from 'react-oidc-context';
import { PAGES } from '../Misc/Enums';
import './Header.css';

const Header = ({ page }) => {
  const auth = useAuth();

  return (
    <div className="header-container">
      <h3 className="header-title text-center mb-0">
        {page === PAGES.HOME.Name && auth.user ? (
          <>
            Welcome <br /> {auth.user.profile.name}!
          </>
        ) : (
          <>{page}</>
        )}
      </h3>
    </div>
  );
};

export default Header;
