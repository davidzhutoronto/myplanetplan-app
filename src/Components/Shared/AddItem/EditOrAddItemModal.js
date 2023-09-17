/**
 * Path: /src/Components/Shared/AddItem/AddItemModal.js
 * Author: David
 * Date Create: 1-Oct-2022
 * Purpose of this component: add item modal page
 */

import React from 'react';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { MODE } from '../Misc/Enums';

import EditOrAddItem from './EditOrAddItem';

const EditOrAddItemModal = ({ close, item, mode, page, setRefresh }) => {
  return (
    <Modal
      show={mode === MODE.UPDATE.Name || mode === MODE.ADD.Name}
      onHide={close}
      fullscreen="md-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>{mode === MODE.ADD.Name ? 'Create Item' : 'Edit Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="noPadding">
          <EditOrAddItem
            item={item}
            close={close}
            mode={mode}
            page={page}
            setRefresh={setRefresh}
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditOrAddItemModal;
