/**
 * Path: /src/Components/Shared/Navbar/Navbar.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: navigation bar of the web app
 */

import React, { useState } from 'react';

import NavbarItem from './NavbarItem';
import { PAGES } from '../Misc/Enums';

import logo from './LogoMPP.png';
import './Navbar.css';

const Navbar = ({ setPage }) => {
  const [pageNum, setPageNum] = useState(PAGES.HOME.pageIndex);

  const handleClick = (pageName, pageNum) => {
    setPage(pageName);
    setPageNum(pageNum);
  };

  return (
    <nav className="navbar-container">
      <img
        src={logo}
        alt="MyPlanetPlan"
        className="mpp-logo"
        onClick={() => handleClick(PAGES.HOME, PAGES.HOME.pageIndex)}
      />
      <ul className="navbar-itemList">
        {Object.values(PAGES).map((page) => (
          <NavbarItem
            key={page.pageIndex}
            itemName={page.Name}
            pageNum={pageNum}
            onClick={() => handleClick(page, page.pageIndex)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
