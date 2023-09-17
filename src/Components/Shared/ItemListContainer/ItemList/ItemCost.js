/**
 * Path: /src/Components/Shared/ItemListContainer/ItemList/ItemCost.js
 * Author: David
 * Date Create: 10-Oct-2022
 * Purpose of this component: item costs and their icons
 */

import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import icons
import { IoConstructOutline } from 'react-icons/io5';
import { AiOutlineClockCircle, AiOutlineDollarCircle } from 'react-icons/ai';

const ItemCost = (props) => {
  return (
    <Row>
      <Col xs={1} className="noPadding item-cost-icon-col">
        <AiOutlineDollarCircle size={20} className="item-cost-icon" />
      </Col>
      <Col xs={3} className="noPadding px-1 item-cost-text">
        {props.item.cost_money_value}
      </Col>
      <Col xs={1} className="noPadding item-cost-icon-col">
        <IoConstructOutline size={20} className="item-cost-icon" />
      </Col>
      <Col xs={3} className="noPadding px-1 item-cost-text">
        {props.item.cost_effort_value}
      </Col>
      <Col xs={1} className="noPadding item-cost-icon-col">
        <AiOutlineClockCircle size={20} className="item-cost-icon" />
      </Col>
      <Col xs={3} className="noPadding px-1 item-cost-text">
        {props.item.cost_time_value}
      </Col>
    </Row>
  );
};

export default ItemCost;
