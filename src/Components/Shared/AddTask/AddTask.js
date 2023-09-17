/**
 * Path: /src/Components/Shared/AddTask/AddTaskButton.js
 * Author: Shahin
 * Date Create: 24-Nov-2022
 * Purpose of this component: Button for Add task
 */

import React, { useRef, forwardRef, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import ProtectedByRole from '../Auth/ProtectedByRole';
import { ROLE, PAGES } from '../Misc/Enums';
import HttpClient from '../../../services/HttpClientService';

import './AddTask.css';

const AddTask = ({ page, item, setRefresh }) => {
  const [open, setOpen] = useState(false);

  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const auth = useAuth();
  const client = new HttpClient(auth.user ? auth.user.access_token : null);
  const collapseElement = useRef(null);

  const openCollapse = () => {
    setOpen(!open);
    setTimeout(() => {
      collapseElement.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }, 400);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value, ['item']: item.item_id }));
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
    if (await client.post('item-task', inputs)) {
      setOpen(false);
      setInputs({});
      setRefresh();
    }
  };

  return (
    <div className="task-buttons mt-2">
      <ProtectedByRole role={ROLE.ADMIN}>
        {page === PAGES.DISCOVER.Name && (
          <Button className="w-100 bg-white add-task-btn" variant={'white'} onClick={openCollapse}>
            Admin Add Task
          </Button>
        )}
      </ProtectedByRole>
      <ProtectedByRole role={ROLE.USER}>
        {page === PAGES.HOME.Name && item.owner === auth.user.profile.sub && (
          <Button className="w-100 bg-white add-task-btn" variant={'white'} onClick={openCollapse}>
            Add Task
          </Button>
        )}
      </ProtectedByRole>

      <Collapse in={open}>
        <div className="input-fields" ref={collapseElement}>
          <br></br>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter task name"
                name="name"
                value={inputs.name || ''}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your task name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                rows="2"
                required
                as="textarea"
                aria-label="With textarea"
                placeholder="Enter task description"
                name="description"
                value={inputs.description || ''}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a description for your task.
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <div className="input-group-append d-flex justify-content-end">
              <button
                className="btn btn-success mx-2"
                type="submit"
                onSubmit={() => setOpen(!open)}
              >
                Submit
              </button>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  setInputs({});
                  setOpen(!open);
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Collapse>
    </div>
  );
};
export default AddTask;
