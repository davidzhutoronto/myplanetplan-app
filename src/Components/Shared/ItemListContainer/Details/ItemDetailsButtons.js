/**
 * Path: /src/Components/Shared/ItemListContainer/Details/ItemDetailsButton.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: buttons of item details
 */

import React from 'react';

import { VscAdd } from 'react-icons/vsc';
import Button from 'react-bootstrap/Button';

import { useAuth } from 'react-oidc-context';
import ProtectedByRole from '../../Auth/ProtectedByRole';

import { PAGES, ROLE } from '../../Misc/Enums';

const ItemDetailsButtons = ({
  page,
  changeModeToEdit,
  close,
  item,
  addItemToList,
  deleteItemFromList,
  deleteItem,
}) => {
  const auth = useAuth();

  const deleteItemAdmin = async () => {
    await deleteItem(item);
    close();
  };

  const deleteUserItem = async () => {
    await deleteItemFromList(item);
    close();
  };

  const addItem = async () => {
    await addItemToList(item);
    close();
  };

  return (
    <div className="detail-button-container">
      <ProtectedByRole role={ROLE.USER}>
        {(page === PAGES.HOME.Name || item.isadded) && (
          <button className="btn btn-danger left-btn" onClick={deleteUserItem}>
            Remove from List
          </button>
        )}

        {page === PAGES.HOME.Name && auth.user.profile.sub === item.owner && (
          <Button variant="outline-dark" className="left-btn" onClick={changeModeToEdit}>
            Edit
          </Button>
        )}

        {page === PAGES.DISCOVER.Name && !item.isadded && (
          <button className="btn btn-success left-btn" onClick={addItem}>
            <VscAdd size={20} />
            Add to List
          </button>
        )}
      </ProtectedByRole>

      {/* Item edit button for admin */}
      {page === PAGES.DISCOVER.Name && (
        <ProtectedByRole role={ROLE.ADMIN}>
          <button className="btn btn-danger left-btn" onClick={deleteItemAdmin}>
            Delete Item
          </button>
          <Button variant="outline-dark" className="left-btn" onClick={changeModeToEdit}>
            Edit
          </Button>
        </ProtectedByRole>
      )}

      <button className="btn btn-secondary" onClick={close}>
        Close
      </button>
    </div>
  );
};

export default ItemDetailsButtons;
