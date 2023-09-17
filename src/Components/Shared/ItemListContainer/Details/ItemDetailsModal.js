/**
 * Path: /src/Components/Shared/ItemListContainer/Details/ItemDetailsModal.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: item detail modal
 */

import React from 'react';

import Modal from 'react-bootstrap/Modal';

import ItemDetails from './ItemDetails';
import ItemDetailsButtons from './ItemDetailsButtons';

const ItemDetailsModal = ({
  page,
  item,
  changeModeToEdit,
  close,
  addToList,
  deleteItemFromList,
  deleteItem,
  markAsDone,
  setRefresh,
}) => {
  const modalTitle = item === null ? null : item.name;

  return (
    <Modal show={item} fullscreen="md-down" onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title className="details-title">{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ItemDetails
          page={page}
          item={item}
          setRefresh={setRefresh}
          markAsDone={markAsDone}
          close={close}
        />
      </Modal.Body>

      {/* Render delete button on Home.
               add button on Discover*/}
      <Modal.Footer>
        <ItemDetailsButtons
          page={page}
          item={item}
          changeModeToEdit={changeModeToEdit}
          close={close}
          deleteItem={deleteItem}
          addItemToList={addToList}
          deleteItemFromList={deleteItemFromList}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ItemDetailsModal;
