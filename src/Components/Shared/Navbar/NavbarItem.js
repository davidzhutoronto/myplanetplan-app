/**
 * Path: /src/Components/Shared/Navbar/NavbarItem.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: all items in navigation bar
 */

import React from 'react';

import { PAGES } from '../Misc/Enums';

import { AiOutlineHome, AiOutlineHistory, AiOutlineCompass, AiOutlineUser } from 'react-icons/ai';

const NavbarItem = ({ pageNum, itemName, onClick }) => {
  const isActive = pageNum === PAGES[itemName.toUpperCase()].pageIndex;
  const getPageTitle = () => {
    return <p className={isActive ? 'nav-name active' : 'nav-name'}>{itemName}</p>;
  };

  // Assigns icons to navbarItems using their itemName attribute
  const getIcon = () => {
    switch (itemName) {
      case PAGES.HOME.Name:
        return <AiOutlineHome className={isActive ? 'nav-image active' : 'nav-image'} />;

      case PAGES.DISCOVER.Name:
        return <AiOutlineCompass className={isActive ? 'nav-image active' : 'nav-image'} />;

      case PAGES.HISTORY.Name:
        return <AiOutlineHistory className={isActive ? 'nav-image active' : 'nav-image'} />;

      case PAGES.ACCOUNT.Name:
        return <AiOutlineUser className={isActive ? 'nav-image active' : 'nav-image'} />;

      default:
        return '';
    }
  };

  return (
    <li className="navbar-item">
      <button className="btn nav-link" onClick={onClick}>
        {/* onClick is given in parent component. */}

        {getPageTitle(pageNum)}
        {/* On desktop version - get all titles, pass in pageNum so that active page is displayed in black, otherwise grey*/}

        {getIcon(pageNum)}
        {/* On Mobile version - uses itemName to add icons, pass in pageNum so that active page icon is displayed in black, otherwise grey  */}
      </button>
    </li>
  );
};

export default NavbarItem;
