/**
 * Path: src/Components/Shared/ItemListContainer/SearchBar/SortButton/SortButton.js
 * Author: David
 * Date Create: 15-Oct-2022
 * Purpose of this component: a customized sort dropdown button
 */

import React from 'react';
import { FILTERSORT_OPTION, SORT_ORDER } from '../../Misc/Enums';
import { ListGroup } from 'react-bootstrap';

const Sort = ({ setSort, sort, show }) => {
  const handleSelect = (e) => {
    const ekey = e.target.id;

    if (ekey === SORT_ORDER.ASCENDING.value || ekey === SORT_ORDER.DESCENDING.value) {
      setSort({ ...sort, orderBy: ekey });
      return;
    }

    setSort({ ...sort, value: ekey });
  };

  return (
    <ListGroup style={show === FILTERSORT_OPTION.SORT ? {} : { display: 'none' }}>
      {Object.values(SORT_ORDER).map((item) => {
        return (
          <ListGroup.Item
            className="action-item"
            active={sort.value === item.value || sort['orderBy'] === item.value}
            key={item.value}
            id={item.value}
            onClick={handleSelect}
          >
            {item.displayName}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Sort;
