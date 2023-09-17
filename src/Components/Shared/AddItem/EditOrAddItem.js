/**
 * Path: /src/Components/Shared/AddItem/AddItem.js
 * Author: David
 * Date Create: 1-Oct-2022
 * Purpose of this component: add an item page, a form, add an item to database
 */

import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from 'react-oidc-context';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Row from 'react-bootstrap/Row';

import { AuthAccessContext } from '../../../App';
import ItemDifficulty from './ItemDifficulty';
import HttpClient from '../../../services/HttpClientService';
import { PAGES, DIFFICULTY, COST, ROLE, MODE } from '../Misc/Enums';

import './EditOrAddItem.css';

const EditOrAddItem = ({ close, page, mode, item, setRefresh }) => {
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const [difficulties, setDifficulties] = useState([]);
  const [repeatabilities, setRepeatabilities] = useState([]);
  const [taskArray, setTaskArray] = useState([]);

  //Add task count
  const [taskList, setTaskList] = useState([]);

  const auth = useAuth();
  const client = new HttpClient(auth.user.access_token);
  const authAccessContext = useContext(AuthAccessContext);

  // Read and Store tasks if they exist to update them.
  const readTask = async () => {
    if (mode === MODE.UPDATE.Name) {
      try {
        const data = await client.get(
          `item-tasks/${item.item_id}/${
            page === PAGES.HOME.Name ? item.user_item_id : item.item_id
          }`
        );
        if (data && Array.isArray(data)) {
          setTaskList(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    readTask();
  }, [mode]);

  const handleTaskChange = (index, event) => {
    let data = [...taskList];
    data[index][event.target.name] = event.target.value;
    setTaskList(data);
  };

  const addTask = () => {
    let newTask = { item: item.item_id, name: '', description: '' };
    setTaskList([...taskList, newTask]);
  };

  const removeTask = async (task) => {
    try {
      await client.delete('item-task/:item_id', {
        item_id: task.item_id,
        task_id: task.task_id,
      });
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  const logIndex = (index, task) => {
    let data = [...taskList];
    const temp = taskArray;
    temp.push({ ['task_id']: task.task_id, ['item_id']: item.item_id });
    setTaskArray(temp);

    data.splice(index, 1);
    setTaskList(data);
  };

  const editPrepare = () => {
    if (mode === MODE.UPDATE.Name) {
      setInputs((values) => ({
        ...values,
        ['name']: item.name,
        ['summary']: item.summary,
        ['description']: item.description,
        ['repeatable']: item.repeatable,
        [COST.MONEY.value]: item.cost_money,
        [COST.TIME.value]: item.cost_time,
        [COST.EFFORT.value]: item.cost_effort,
        [COST.MONEY.stringVersion]: item.cost_money_value,
        [COST.TIME.stringVersion]: item.cost_time_value,
        [COST.EFFORT.stringVersion]: item.cost_effort_value,
      }));
    }

    // specific to private items, set user and set all difficulties to easy.
    if (page === PAGES.HOME.Name && authAccessContext && authAccessContext.hasRole(ROLE.USER)) {
      // Get only the id for easy difficulty.
      const easyDifficulty = difficulties.filter((d) => d.value === DIFFICULTY.EASY.displayName)[0];

      setInputs((values) => ({
        ...values,
        [COST.MONEY.value]: easyDifficulty.domain_id,
        [COST.TIME.value]: easyDifficulty.domain_id,
        [COST.EFFORT.value]: easyDifficulty.domain_id,
        [COST.MONEY.stringVersion]: DIFFICULTY.EASY.displayName,
        [COST.TIME.stringVersion]: DIFFICULTY.EASY.displayName,
        [COST.EFFORT.stringVersion]: DIFFICULTY.EASY.displayName,
        ['owner']: auth.user.profile.sub,
      }));
    }
  };

  const handleChange = (event) => {
    //reads name and value from the form
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // Only for selectbox changes
    let nameString, valueString; // Used in the API to calculate the points yielded.
    if (target.nodeName === 'SELECT') {
      nameString = target.options[target.selectedIndex].getAttribute('name');
      valueString = target.options[target.selectedIndex].innerHTML;
      setInputs((values) => ({ ...values, [nameString]: valueString }));
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    //validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    //submitting the form
    if (mode === MODE.ADD.Name) {
      const newItem = await client.post('public-items', inputs);
      if (!newItem || newItem.length === 0) return;
      for (let index in taskList) {
        taskList[index].item = newItem.item_id;
        await client.post('item-task', taskList[index]);
      }
      close();
    }

    // Update task
    if (mode === MODE.UPDATE.Name) {
      for (let index in taskList) {
        taskList[index].task_id
          ? await client.put('item-task', taskList[index], item.item_id)
          : await client.post('item-task', taskList[index]);
      }
      await client.put('public-items', inputs, item.item_id);
      close();
    }

    if (taskArray.length > 0) {
      for (let i in taskArray) {
        await removeTask(taskArray[i]);
      }
    }
    setRefresh();
  };

  const getDomains = async () => {
    setDifficulties(await client.getById('domains', 'Difficulty'));
    setRepeatabilities(await client.getById('domains', 'Repeatable'));
  };

  useEffect(() => {
    getDomains();
  }, []);

  useEffect(() => {
    if (difficulties.length > 0) editPrepare();
  }, [difficulties]);

  return (
    //The container Row and Col, right Col has a Form
    <Container>
      <Row>
        <Col className="mt-3">
          {/* onSubmit for creating private item needs to be created. 
            Now Creating private item and Creating public item are using same onSubmimt.*/}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Item Name"
                name="name"
                value={mode === MODE.UPDATE.Name ? inputs.name || item.name : inputs.name || ''}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your item name
              </Form.Control.Feedback>
            </Form.Group>

            <ItemDifficulty
              page={page}
              name="cost_money"
              label="Cost Difficulty"
              currentValue={
                mode === MODE.UPDATE.Name ? inputs.cost_money || item.cost_money : inputs.cost_money
              }
              options={difficulties}
              onChange={handleChange}
            />

            <ItemDifficulty
              page={page}
              name="cost_effort"
              label="Effort Difficulty"
              currentValue={
                mode === MODE.UPDATE.Name
                  ? inputs.cost_effort || item.cost_effort
                  : inputs.cost_effort
              }
              options={difficulties}
              onChange={handleChange}
            />

            <ItemDifficulty
              page={page}
              name="cost_time"
              label="Time Cost Difficulty"
              currentValue={
                mode === MODE.UPDATE.Name ? inputs.cost_time || item.cost_time : inputs.cost_time
              }
              options={difficulties}
              onChange={handleChange}
            />

            <Form.Group className="mb-3" controlId="formBasicRepeatable">
              <Form.Label>Repeatable</Form.Label>
              <Form.Select
                required
                aria-label="repeatable"
                name="repeatable"
                value={
                  mode === MODE.UPDATE.Name
                    ? inputs.repeatable || item.repeatable
                    : inputs.repeatable || ''
                }
                onChange={handleChange}
              >
                <option value="" />
                {repeatabilities.map((item) => (
                  <option key={item.domain_id} value={item.domain_id}>
                    {item.value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please enter repeatable</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Summary</Form.Label>
              <Form.Control
                required
                rows="2"
                as="textarea"
                aria-label="With textarea"
                name="summary"
                value={
                  mode === MODE.UPDATE.Name ? inputs.summary || item.summary : inputs.summary || ''
                }
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please enter summary</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                required
                rows="2"
                as="textarea"
                aria-label="With textarea"
                name="description"
                value={
                  mode === MODE.UPDATE.Name
                    ? inputs.description || item.description
                    : inputs.description || ''
                }
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please enter description</Form.Control.Feedback>
            </Form.Group>

            {/* Task */}
            {!taskList || taskList.length === 0 ? (
              <></>
            ) : (
              taskList.map((task, index) => (
                <div className="mb-3" key={index}>
                  <label>Task {index + 1}</label>
                  <Button
                    variant="link"
                    onClick={() => logIndex(index, task)}
                    className={task.completed ? 'task-completed' : ''}
                  >
                    <RiDeleteBin6Line size={23} color="black" />
                  </Button>

                  <input
                    className="taskInput"
                    placeholder="Task name"
                    name="name"
                    value={taskList[index].name}
                    onChange={(event) => handleTaskChange(index, event)}
                  />

                  <input
                    className="taskInput"
                    placeholder="Task description"
                    name="description"
                    value={taskList[index].description}
                    onChange={(event) => handleTaskChange(index, event)}
                  />
                </div>
              ))
            )}

            <div className="col-md-12">
              <Button className="mb-3" variant="outline-dark" onClick={addTask}>
                + Add Task
              </Button>
            </div>

            <Button variant="success" id="submitBtn" type="submit">
              Submit
            </Button>
            <Button className="ms-3" variant="secondary" onClick={close} id="cancelBtn">
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrAddItem;
