/**
 * Path: /src/Components/Shared/ItemListContainer/Details/ItemDetails.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: shows item details
 */

import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Linkify from 'react-linkify';

import { CgRepeat } from 'react-icons/cg';
import { AiOutlineCheck } from 'react-icons/ai';
import { COST, PAGES } from '../../Misc/Enums';
import ItemDetailCost from './ItemDetailsCost';
import ItemProgress from '../../../Home/ItemProgress';
import AddTask from '../../AddTask/AddTask';
import Task from '../../Task/Task';

import './ItemDetails.css';

const ItemDetails = ({ item, page, setRefresh, markAsDone, close }) => {
  if (!item) return null;

  const markItemAsDone = async () => {
    const res = await markAsDone(item);
    if (res) {
      close();
      setRefresh();
    }
  };

  return (
    <Container className="details-container mb-5">
      {page === PAGES.HOME.Name && (
        <Row className="mb-2">
          <button
            className="btn btn-success align-items-center justify-content-center"
            onClick={markItemAsDone}
          >
            <AiOutlineCheck className="mx-2" size={20} />
            Mark as Done
          </button>
        </Row>
      )}
      {page === PAGES.HISTORY.Name && (
        <Row className="mb-2">
          <h5>Date Completed</h5>
          <p>{item.d_completed}</p>
        </Row>
      )}
      <Row>
        <h5>Summary</h5>
        <p>{item.summary}</p>
      </Row>
      <Row>
        <h5>Description</h5>
        {/* Linkify no longer supports properties={{target: 'blank'}}, this is the recommended workaround from the repo. */}
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <p className="description">{item.description}</p>
        </Linkify>
      </Row>

      <Row className="details-cost-row">
        <h5>Difficulty</h5>
        <ItemDetailCost iconType={COST.MONEY} level={item.cost_money_value} />
        <ItemDetailCost iconType={COST.EFFORT} level={item.cost_effort_value} />
        <ItemDetailCost iconType={COST.TIME} level={item.cost_time_value} />
      </Row>

      <Row>
        <h5>Points</h5>
        <p>{item.points}</p>
      </Row>

      <Row>
        <h5>Repeatability</h5>
        <p>
          <CgRepeat size={25} /> {item.repeatable_value}
        </p>
      </Row>

      <Row>
        <h5>Tasks</h5>
        {page === PAGES.HOME.Name && item.tasks && (
          <ItemProgress
            tasks={item.tasks}
            tasksCompleted={item.tasks_completed}
            itemDetails={true}
          />
        )}
        <Task item={item} setRefresh={setRefresh} page={page} />
        <AddTask page={page} item={item} setRefresh={setRefresh} />
      </Row>
    </Container>
  );
};

export default ItemDetails;
