/**
 * Path: /src/Components/Shared/ItemListContainer/ItemList/ItemList.js
 * Author: ??
 * Date Create: 10-Oct-2022
 * Purpose of this component: read item list from end point api
 */

import React, { useState, useEffect, useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import { FaCheckCircle } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';

import { AuthAccessContext } from '../../../../App';
import AddBtn from '../../AddItem/AddBtn';
import { CgRepeat } from 'react-icons/cg';
import Checkbox from '../../../Home/Checkbox/Checkbox';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import ItemCost from './ItemCost';
import ItemProgress from '../../../Home/ItemProgress';
import { PAGES, ROLE } from '../../Misc/Enums';
import ProtectedByRole from '../../Auth/ProtectedByRole';

import './ItemList.css';

const ItemList = ({
  page,
  setItemDetails,
  addToList,
  deleteItemFromList,
  markAsDone,
  data,
  setData,
  getUser,
}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalItemAdded, setModalItemAdded] = useState(false);

  // HOME States
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  // make and stop drawing confetti.
  // When num is 0, drawing confetti stops.
  const [confettiNum, setConfettiNum] = useState(0);

  const authAccessContext = useContext(AuthAccessContext);

  // Needed to prevent the item from defaulting to the last item in the list.
  // If removed, adding and completing an item will always do so for the last item, even if it is not targeted.
  const openModalForItem = (item) => {
    setModalItem(item);
    setModalItemAdded(item.isadded);
    setAddModalOpen(true);
  };

  // Adds item to list and closes modal
  const addItemToList = async () => {
    await addToList(modalItem);
    setAddModalOpen(false);
  };

  // removes item from list and closes modal, uses an argument because it is not available in the list.
  const removeFromList = async (item) => {
    await deleteItemFromList(item);
    setAddModalOpen(false);
  };

  // Opens completed modal, sets modal item to make sure it completed the right item.
  const openCompletedModal = (e, item) => {
    e.target.checked = false;
    setModalItem(item);
    setCheckModalOpen(true);
  };

  // Once a user clicks the done button, confetti is drawn.

  const markItemAsDone = async (e) => {
    e.target.classList.add('completed');
    const response = await markAsDone(modalItem);

    if (response) {
      const check = document.getElementById('check-' + modalItem.item_id);
      check.classList.add('completed');
      check.nextSibling.classList.add('completed');
      check.checked = true;
    }

    setConfettiNum(80);
    setCheckModalOpen(false);

    // time-outs used to time when the item is removed from the list
    setTimeout(async () => {
      const container = document.getElementById(modalItem.item_id);
      container.style.animation = 'linear 0.5s fadeout';

      setTimeout(async () => {
        setData(data.filter((i) => i.item_id != modalItem.item_id));
        await getUser();
      }, 500);
    }, 3000);
  };

  const cancelItemDone = () => {
    setCheckModalOpen(false);
  };

  const setKey = (item) => {
    let key;
    page === PAGES.HISTORY.Name ? (key = item.user_item_history_id) : (key = item.item_id);
    return key;
  };

  useEffect(() => {
    setTimeout(() => {
      setConfettiNum(0);
    }, 2000);
  }, [checkModalOpen]);

  return (
    <>
      <ReactConfetti numberOfPieces={confettiNum} />
      <ListGroup as="ol" className={'mb-5'}>
        {data.map((item) => {
          return item.show || item.show === undefined ? (
            <ListGroup.Item
              as="li"
              key={setKey(item)}
              id={setKey(item)}
              className={'item-container ' + (item.isadded === true && 'added')}
            >
              {/* Using React-Bootstrap Grid system*/}
              <Container className="ms-0">
                <Row>
                  {page === PAGES.HOME.Name && (
                    <Col className="col align-self-center" xs={2}>
                      <Checkbox
                        onClick={(e) => openCompletedModal(e, item)}
                        isChecked={false}
                        id={item.item_id}
                      />
                    </Col>
                  )}

                  {page === PAGES.HISTORY.Name && (
                    <Col className="col align-self-center" xs={2}>
                      <FaCheckCircle size={20} style={{ color: 'green' }} />
                    </Col>
                  )}

                  <Col
                    xs={
                      authAccessContext && authAccessContext.hasRole('admin')
                        ? 12
                        : page === PAGES.HISTORY.Name
                        ? 8
                        : 9
                    }
                    className="cursor-pointer"
                    onClick={() => setItemDetails(item)}
                  >
                    <Row className="fw-bold" xs={8}>
                      {item.name}
                    </Row>

                    <Row xs={4} className="pt-1">
                      <Col className="noPadding item-points" xs={4}>
                        {item.points} points
                      </Col>

                      {page ===
                        PAGES.DISCOVER.Name /* Only render this when user is on discover*/ && (
                        <Col className="noPadding" xs={8}>
                          <ItemCost item={item} />
                        </Col>
                      )}

                      {page === PAGES.HISTORY.Name && (
                        <Col className="noPadding item-points" xs={8}>
                          {item.d_completed}
                        </Col>
                      )}

                      {page === PAGES.HOME.Name && item.tasks && (
                        <Col className="noPadding" xs={8}>
                          <Row>
                            <ItemProgress
                              tasks={item.tasks}
                              tasksCompleted={item.tasks_completed}
                            />
                          </Row>
                        </Col>
                      )}
                    </Row>
                  </Col>

                  {item.repeatable_value != 'None' && (
                    <Col className="col align-self-center" xs={1}>
                      <CgRepeat size={20} style={{ color: 'green' }} />
                    </Col>
                  )}
                  {item.repeatable_value === 'None' && (
                    <Col className="col align-self-center" xs={1} />
                  )}

                  {/* Only display this when the user has the user role */}
                  <ProtectedByRole role={ROLE.USER}>
                    {page === PAGES.DISCOVER.Name && (
                      <Col className="noPadding addBtn" xs={2}>
                        {!item.isadded && (
                          <AddBtn onClick={() => openModalForItem(item)} added={item.isadded} />
                        )}
                      </Col>
                    )}
                  </ProtectedByRole>
                </Row>
              </Container>
            </ListGroup.Item>
          ) : null;
        })}
      </ListGroup>

      <ConfirmationModal
        complete={false}
        modalOpen={addModalOpen}
        onHide={() => setAddModalOpen(false)}
        added={modalItemAdded}
        confirm={modalItemAdded ? () => removeFromList(modalItem) : () => addItemToList(modalItem)}
        cancel={() => setAddModalOpen(false)}
      />

      <ConfirmationModal
        complete={true}
        modalOpen={checkModalOpen}
        onHide={() => setCheckModalOpen(false)}
        added={false}
        confirm={(e) => markItemAsDone(e)}
        cancel={() => cancelItemDone()}
      />
    </>
  );
};

export default ItemList;
