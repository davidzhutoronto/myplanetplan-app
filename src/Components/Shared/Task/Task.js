/**
 * Path: /src/Components/Shared/Task/Task.js
 * Author: Shahin
 * Date Create: 24-Nov-2022
 * Purpose of this component: Loads all tasks for an item
 */

import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RefreshContext } from '../../../App';
import Checkbox from '../../Home/Checkbox/Checkbox';
import HttpClient from '../../../services/HttpClientService';
import { PAGES } from '../Misc/Enums';
import './task.css';

const Task = ({ item, page, setRefresh }) => {
  const [data, setData] = useState(null);
  const [listMessage, setListMessage] = useState('Loading...');
  const refresh = useContext(RefreshContext);
  const auth = useAuth();
  const client = new HttpClient(auth.user ? auth.user.access_token : '');

  const fetchData = async () => {
    try {
      const rdata =
        page === PAGES.HOME.Name
          ? await client.get(`item-tasks/${item.item_id}/${item.user_item_id}`)
          : await client.get(`item-tasks/${item.item_id}/${item.item_id}`);
      if (!rdata || rdata.error) {
        setData({ error: true });
        return;
      }
      setData(rdata);
    } catch (error) {
      console.error(error);
    }
  };

  const checkHandler = async (e, task) => {
    if (task.completed) return;
    try {
      await client.post('item-task-complete', {
        item_id: task.item_id,
        task_id: task.task_id,
        user_item_id: item.user_item_id,
      });
    } catch (error) {
      console.error(error);
    }
    setRefresh();
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Handles loading and error messages
  useEffect(() => {
    if (!data) {
      setListMessage('Loading...');
    } else if (data.error) {
      setListMessage('Something went wrong!');
    }
  }, [data]);

  // Display loading or error message
  if (!data || data.error) {
    return <p>{listMessage}</p>;
  }

  return (
    <div>
      {data && data.length > 0 ? (
        <ListGroup as="ol" className={'mt-2 tasklist'}>
          {data.map((task) => {
            return (
              <ListGroup.Item key={task.task_id} className={'lg-task '}>
                <Row>
                  <Col xs={10}>
                    <b>{task.name}</b>
                    <div className="text-break">{task.description}</div>
                  </Col>
                  {page === PAGES.HOME.Name ? (
                    <Col xs={2} className="d-flex justify-content-end">
                      <Checkbox
                        key={task.task_id}
                        id={task.task_id}
                        onClick={(e) => checkHandler(e, task)}
                        isChecked={task.completed}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <p>This item has no tasks</p>
      )}
    </div>
  );
};

export default Task;
