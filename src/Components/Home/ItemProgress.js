/**
 * Path: /src/Components/Home/ItemProgress.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: progress bar on home page
 */

import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ItemProgress = ({ tasks, tasksCompleted, itemDetails }) => {
  if (!tasks || !tasksCompleted || !(tasks > 0)) return;

  const progress = tasksCompleted / tasks;

  return (
    <Row className="align-items-center justify-content-center">
      <Col xs={9}>
        <ProgressBar variant="success" now={progress * 100} />
      </Col>
      <Col xs={3} className={itemDetails ? 'progress-text-large' : 'progress-text'}>
        {tasksCompleted}/{tasks}
      </Col>
    </Row>
  );
};

export default ItemProgress;
