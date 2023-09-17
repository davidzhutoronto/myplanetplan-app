/**
 * Path: /src/Components/Shared/PlusButton/PlusButton.js
 * Author: David
 * Date Create: 15-Oct-2022
 * Purpose of this component: a customized plus button
 */

import React from 'react';

import { AiFillPlusCircle } from 'react-icons/ai';

import './PlusButton.css';

function AddBtn(props) {
  return (
    <button className="PlusBtn" onClick={props.onClick}>
      <AiFillPlusCircle color="green" size={props.size} />
    </button>
  );
}

export default AddBtn;
