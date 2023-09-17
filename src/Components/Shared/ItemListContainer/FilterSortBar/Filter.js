/**
 * Path: src/Components/Shared/ItemListContainer/SearchBar/Filter/FilterPage.js
 * Author: David
 * Date Create: 15-Oct-2022
 * Purpose of this component: the filter page
 */

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { CATEGORIES, DIFFICULTY, FILTER_ORDER, FILTERSORT_OPTION } from '../../Misc/Enums';
import Button from 'react-bootstrap/Button';

const Filter = ({ filter, setFilter, show, closeFilter, setCloseFilter, setOpen }) => {
  const handleChange = (event) => {
    const cost_value = event.target.parentNode.parentNode.id;
    const filter_cost_value = event.target.value;
    const checked = event.target.checked;

    if (!filter_cost_value || !cost_value) {
      return;
    }

    // Create an empty object to store the updated filter
    let newFilter = {};
    // Get the current value for the relevant key in the filter object
    const key = filter[cost_value];

    // If the checkbox is checked and the key is not already in the filter object,
    // add it to the newFilter object with the filter cost value as the value
    if (checked === true && !key) {
      newFilter[cost_value] = [filter_cost_value];
    } else {
      // If the key is already present in the filter object, add the filter cost
      // value to the array of values for that key
      newFilter[cost_value] = [...key, filter_cost_value];
    }

    // If the checkbox is not checked, remove the filter cost value from the array
    // of values for the relevant key in the filter object
    if (checked === false) {
      newFilter[cost_value] = key.filter((e) => e !== filter_cost_value);
    }

    // Set the updated filter object using the setFilter hook
    setFilter({ ...filter, ...newFilter });
  };

  if (closeFilter) return;

  return (
    <Accordion style={show === FILTERSORT_OPTION.FILTER ? {} : { display: 'none' }}>
      <Button
        className={'w-100 bg-white reset-button'}
        variant={'white'}
        onClick={() => {
          setFilter({});
          setOpen(false);
          setTimeout(() => {
            setCloseFilter(true);
          }, 10);
        }}
      >
        Reset
      </Button>

      {Object.entries(FILTER_ORDER).map(([key, filter]) => {
        let options = key === 'CATEGORY' ? CATEGORIES : DIFFICULTY;

        return (
          <Accordion.Item eventKey={key} key={key}>
            <Accordion.Header>{filter.displayName}</Accordion.Header>
            <Accordion.Body id={filter.value}>
              {Object.values(options).map((obj) => {
                return (
                  <Form.Check key={obj.value + key}>
                    <Form.Check.Input
                      id={obj.value + key}
                      value={obj.value}
                      onChange={handleChange}
                      type="checkbox"
                    />
                    <Form.Check.Label htmlFor={obj.value + key}>{obj.displayName}</Form.Check.Label>
                  </Form.Check>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default Filter;
