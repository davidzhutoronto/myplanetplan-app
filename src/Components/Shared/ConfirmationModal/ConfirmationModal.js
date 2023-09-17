import React from 'react';

import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = ({ complete, modalOpen, onHide, added, confirm, cancel }) => {
  return (
    <Modal show={modalOpen} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>
          {complete ? 'Mark item as done' : added ? 'Remove Item' : 'Add Item'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {complete
          ? 'Have you done your item?'
          : added
          ? 'Do you want to remove this item from your list?'
          : 'Do you want to add this item to your list?'}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-success" onClick={confirm}>
          Yes
        </button>
        <button className="btn btn-light" onClick={cancel}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
