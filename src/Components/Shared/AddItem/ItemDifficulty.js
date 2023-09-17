/**
 * Path: /src/Components/Shared/AddItem/AddItemDifficulty.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: item difficulty on add item modal page
 */

import React from 'react';
import Form from 'react-bootstrap/Form';
import { PAGES } from '../Misc/Enums';

const ItemDifficulty = ({ label, name, onChange, currentValue, options, page }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicCost">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        disabled={page === PAGES.HOME.Name}
        required
        aria-label={name}
        name={name}
        onChange={onChange}
        value={currentValue || ''}
      >
        {page === PAGES.HOME.Name ? <option>Easy</option> : <option value="" />}
        {page === PAGES.DISCOVER.Name &&
          options.map((item) => (
            <option key={item.domain_id} value={item.domain_id} name={name + '_value'}>
              {item.value}
            </option>
          ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">Please enter {label}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default ItemDifficulty;
