import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { IoIosArrowForward } from 'react-icons/io';

import Logout from '../Shared/Auth/Logout';

const AccountAction = () => {
  // useState to open and close Modal
  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => {
    setShowLogout(false);
    setShowDelete(false);
  };

  const handleDeleteAccount = () => {
    // TODO : Delete account
    setShowDelete(false);
  };

  return (
    <Col className="action-container">
      {/* Logout Modal */}
      <Modal show={showLogout} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to Logout?</Modal.Body>

        <Modal.Footer>
          <Logout />
          <Button variant="Secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete account Modal */}
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
          <Button variant="Secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="aitem cursor-pointer" onClick={() => setShowLogout(true)}>
        <div>
          Logout <IoIosArrowForward />
        </div>
      </Row>

      <Row className="aitem cursor-pointer" onClick={() => setShowDelete(true)}>
        <div>
          Delete account <IoIosArrowForward />
        </div>
      </Row>
    </Col>
  );
};

export default AccountAction;
