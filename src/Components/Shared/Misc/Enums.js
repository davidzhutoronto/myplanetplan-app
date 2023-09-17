/**
 * Path: /src/Components/Shared/Misc/Enums.js
 * Author: Misha
 * Date Create: 30-Oct-2022
 * Purpose of this component: stores all statics enums class
 */

import React from 'react';

import { IoConstructOutline } from 'react-icons/io5';
import { AiOutlineClockCircle, AiOutlineDollarCircle } from 'react-icons/ai';

const PAGES = {
  HOME: {
    pageIndex: 0,
    Name: 'Home',
  },
  DISCOVER: {
    pageIndex: 1,
    Name: 'Discover',
  },
  HISTORY: {
    pageIndex: 2,
    Name: 'History',
  },
  ACCOUNT: {
    pageIndex: 3,
    Name: 'Account',
  },
};

const ROLE = {
  ADMIN: {
    value: 'admin',
    description: 'Admin role',
  },
  USER: {
    value: 'user',
    description: 'User role',
  },
};

const DIFFICULTY = {
  EASY: {
    displayName: 'Easy',
    value: 0,
  },
  MEDIUM: {
    displayName: 'Medium',
    value: 1,
  },
  HARD: {
    displayName: 'Hard',
    value: 2,
  },
  EXTREME: {
    displayName: 'Extreme',
    value: 3,
  },
};

const COST = {
  MONEY: {
    value: 'cost_money',
    displayName: 'Money',
    stringVersion: 'cost_money_value',
    icon: <AiOutlineDollarCircle className="cost-icon" />,
  },
  TIME: {
    value: 'cost_time',
    displayName: 'Time',
    stringVersion: 'cost_time_value',
    icon: <AiOutlineClockCircle className="cost-icon" />,
  },
  EFFORT: {
    value: 'cost_effort',
    displayName: 'Effort',
    stringVersion: 'cost_effort_value',
    icon: <IoConstructOutline className="cost-icon" />,
  },
};

const SORT_ORDER = {
  DEFAULT: {
    displayName: 'Newest',
    value: 'sort_default',
  },
  POINTS: {
    displayName: 'Points',
    value: 'total_points',
  },
  ...COST,
  ASCENDING: {
    displayName: 'Ascending',
    value: 'order_asc',
  },
  DESCENDING: {
    displayName: 'Descending',
    value: 'order_desc',
  },
};

const SORT = {
  orderBy: SORT_ORDER.DESCENDING.value,
  value: SORT_ORDER.DEFAULT.value,
};

const CATEGORIES = {
  GARDEN: {
    displayName: 'Garden',
    value: 'garden',
  },
  RECYCLING: {
    displayName: 'Recycling',
    value: 'recycling',
  },
  WATER: {
    displayName: 'Water',
    value: 'water',
  },
  ENERGY: {
    displayName: 'Energy',
    value: 'energy',
  },
  AIR: {
    displayName: 'Air',
    value: 'air',
  },
  SPORTS: {
    displayName: 'Sports',
    value: 'sports',
  },
  HOLIDAY: {
    displayName: 'Holiday',
    value: 'holiday',
  },
  FOOD: {
    displayName: 'Food',
    value: 'food',
  },
  CLOTHING: {
    displayName: 'Clothing',
    value: 'clothing',
  },
};

const FILTER_ORDER = {
  ...COST,
  // CATEGORY: {
  //   displayName: 'Category',
  //   value: 'category_order',
  // },
};

const MODE = {
  ADD: {
    Name: 'Add',
  },
  UPDATE: {
    Name: 'Update',
  },
};

const FILTERSORT_OPTION = {
  FILTER: 'Filter',
  SORT: 'Sort',
};

export {
  PAGES,
  DIFFICULTY,
  COST,
  ROLE,
  SORT,
  SORT_ORDER,
  FILTER_ORDER,
  CATEGORIES,
  MODE,
  FILTERSORT_OPTION,
};
