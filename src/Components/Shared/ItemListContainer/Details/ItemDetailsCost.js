/**
 * Path: /src/Components/Shared/ItemListContainer/Details/ItemDetailsCost.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: cost label on item detail page
 */

import React from 'react';

import Col from 'react-bootstrap/Col';

const ItemDetailCost = (props) => {
  const iconType = props.iconType;
  const icon = iconType.icon;

  return (
    <Col className="details-cost-container">
      {icon}
      <label className="details-cost-label">{props.level}</label>
    </Col>
  );
};

export default ItemDetailCost;
