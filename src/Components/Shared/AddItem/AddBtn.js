/**
 * Path: /src/Components/Shared/AddItem/AddBtn.js
 * Author: David
 * Date Create: 1-Oct-2022
 * Purpose of this component: a plus sign button that opens up a modal that can be
 * used to add an item
 */

import React from 'react';

import { AiFillPlusCircle, AiOutlineCheckCircle } from 'react-icons/ai';

const AddBtn = ({ onClick, added }) => {
  return (
    <div>
      <button className="btn addBtn" onClick={onClick}>
        {!added && <AiFillPlusCircle color="green" size={35} />}
        {added && <AiOutlineCheckCircle color="green" size={35} />}
      </button>
    </div>
  );
};

export default AddBtn;
