/**
 * Path: /src/Components/Home/Checkbox.js
 * Author: Haerin
 * Date Create: 15-Oct-2022
 * Purpose of this component: a customized checkbox that is used on home page
 */

import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import './Checkbox.css';

const Checkbox = ({ onClick, id, isChecked }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={'check-' + id}
        onChange={onClick}
        defaultChecked={isChecked}
        className={isChecked ? 'completed' : ''}
      />
      <label htmlFor={'check-' + id} onChange={onClick} className={isChecked ? 'completed' : ''}>
        <BsCheckLg size={15} color="white" />
      </label>
    </div>
  );
};

export default Checkbox;
