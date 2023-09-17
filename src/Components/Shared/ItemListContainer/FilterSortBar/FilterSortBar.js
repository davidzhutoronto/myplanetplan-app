/**
 * Path: src/Components/Shared/ItemListContainer/SearchBar/SearchBar.js
 * Author: Misha
 * Date Create: 16-Nov-2022
 * Purpose of this component: the container for the FilterButton and the SortButton
 */

import React, { useState } from 'react';

import { BsSliders, BsArrowDownUp } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Collapse from 'react-bootstrap/Collapse';

import { FILTERSORT_OPTION } from '../../Misc/Enums';
import Filter from './Filter';
import Sort from './Sort';
import './FilterSortBar.css';

const FilterSortBar = ({ filter, setFilter, setSort, sort }) => {
  const [options, setOptions] = useState(null);
  const [open, setOpen] = useState(false);
  const [closeFilter, setCloseFilter] = useState(false);

  const openOption = (option) => {
    setOptions(option);
    setOpen(options === option ? !open : true);
    setCloseFilter(false);
  };

  return (
    <div className={'mt-2 mb-2 flsort'}>
      <ButtonToolbar className={'filtersortbar'}>
        <ButtonGroup className={'w-100'}>
          <Button
            className={'btnw'}
            onClick={() => openOption(FILTERSORT_OPTION.FILTER)}
            variant={'white'}
            aria-expanded={open}
          >
            <BsSliders className={'icon'} />
            Filter
          </Button>
          <Button
            className={'btnw'}
            onClick={() => openOption(FILTERSORT_OPTION.SORT)}
            variant={'white'}
            aria-expanded={open}
          >
            <BsArrowDownUp className={'icon'} />
            Order by
          </Button>
        </ButtonGroup>
      </ButtonToolbar>

      <Collapse in={open}>
        <div>
          <Filter
            filter={filter}
            setFilter={setFilter}
            show={options}
            closeFilter={closeFilter}
            setCloseFilter={setCloseFilter}
            setOpen={setOpen}
          />
          <Sort sort={sort} setSort={setSort} show={options} />
        </div>
      </Collapse>
    </div>
  );
};

export default FilterSortBar;
