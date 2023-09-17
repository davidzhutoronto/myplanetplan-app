/**
 * Path: /src/Components/Shared/ItemListContainer/ItemList/ItemListContainer.js
 * Author: ??
 * Date Create: 10-Oct-2022
 * Purpose of this component: the combination of item list and its detail modal
 */

import React, { useEffect, useState, useContext } from 'react';

import { useAuth } from 'react-oidc-context';

import EditOrAddItemModal from '../AddItem/EditOrAddItemModal';
import HttpClient from '../../../services/HttpClientService';
import ItemList from './ItemList/ItemList';
import FilterSortBar from './FilterSortBar/FilterSortBar';
import ItemDetailsModal from './Details/ItemDetailsModal';
import { DIFFICULTY, PAGES, ROLE, SORT, SORT_ORDER, MODE } from '../Misc/Enums';
import ProtectedByRole from '../Auth/ProtectedByRole';
import PlusButton from '../../Shared/PlusButton/PlusButton';
import { AuthAccessContext, RefreshContext } from '../../../App';

const ItemListContainer = ({ page, data, setData, getUser, setRefresh }) => {
  const [itemDetails, setItemDetails] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(SORT);
  const [mode, setMode] = useState(false);
  const [listMessage, setListMessage] = useState('Loading...');
  const refresh = useContext(RefreshContext);
  const auth = useAuth();
  const authAccessContext = useContext(AuthAccessContext);
  const client = new HttpClient(auth.user ? auth.user.access_token : '');

  const orderDataBy = (value) => {
    return data.slice().sort((a, b) => {
      if (sort.orderBy === SORT_ORDER.ASCENDING.value) {
        return DIFFICULTY[a[value].toUpperCase()].value - DIFFICULTY[b[value].toUpperCase()].value;
      }
      return DIFFICULTY[b[value].toUpperCase()].value - DIFFICULTY[a[value].toUpperCase()].value;
    });
  };

  useEffect(() => {
    if (!sort.orderBy && !sort.value) return;

    if (sort.value === SORT_ORDER.POINTS.value) {
      const newData = data.slice().sort((a, b) => {
        if (sort.orderBy === SORT_ORDER.ASCENDING.value) {
          return a.points - b.points;
        }
        return b.points - a.points;
      });
      setData(newData);
    } else if (sort.value === SORT_ORDER.DEFAULT.value) {
      if (!data) return;
      const newData = data.slice().sort((a, b) => {
        const aDate = a.d_created || a.d_completed;
        const bDate = b.d_created || b.d_completed;
        if (sort.orderBy === SORT_ORDER.ASCENDING.value) {
          return new Date(aDate) - new Date(bDate);
        }
        return new Date(bDate) - new Date(aDate);
      });
      setData(newData);
    } else {
      setData(orderDataBy(sort.value + '_value'));
    }
  }, [sort]);

  useEffect(() => {
    if (!data || !filter) return;

    const newData = [...data];

    for (const itm in data) {
      newData[itm] = { ...newData[itm], show: false };
    }

    newData.map((e) => {
      const cost_values = {
        cost_money: DIFFICULTY[e.cost_money_value.toUpperCase()].value.toString(),
        cost_effort: DIFFICULTY[e.cost_effort_value.toUpperCase()].value.toString(),
        cost_time: DIFFICULTY[e.cost_time_value.toUpperCase()].value.toString(),
      };

      const show = Object.entries(filter).every(([key, value]) => {
        return cost_values[key].indexOf(value) > -1;
      });

      if (show) e.show = true;
    });

    if (Object.keys(filter).length === 0) {
      for (const itm in data) {
        newData[itm] = { ...newData[itm], show: undefined };
      }
    }

    newData['noShow'] = false;
    let totalNoShow = 0;

    for (const nd in newData) {
      if (newData[nd].show === false) {
        totalNoShow++;
      }
    }

    if (newData.length === totalNoShow) {
      newData['noShow'] = true;
    }

    setData(newData);
  }, [filter]);

  // Used to refresh the ItemDetails after editing.
  useEffect(() => {
    if (itemDetails) {
      getItemDetails();
    }
  }, [refresh]);

  // Used to give error after timeout
  useEffect(() => {
    if (!data) {
      setListMessage('Loading...');
    } else if (data.error) {
      setListMessage('Something went wrong!');
    }
  }, [data]);

  const addToList = async (item) => {
    try {
      await client.post('user-item', {
        item_id: item.item_id,
      });
      setRefresh();
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  const deleteItemFromList = async (item) => {
    try {
      await client.delete('user-item-delete', {
        user_item_id: item.user_item_id,
        item_id: item.item_id,
      });
      setRefresh();
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  const markAsDone = async (item) => {
    try {
      return await client.post('user-item-complete', {
        item_id: item.item_id,
      });
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  // Used to refresh the ItemDetails after editing.
  const getItemDetails = async () => {
    // User Refresh ItemDetails
    if (
      (authAccessContext && authAccessContext.hasRole(ROLE.USER)) ||
      (authAccessContext && authAccessContext.hasRole(ROLE.ADMIN))
    )
      try {
        const itemRefresh = await client.getById('itemdetails', itemDetails.item_id);
        setItemDetails(itemRefresh.pop());
      } catch (error) {
        alert('Something went wrong, please try again.');
      }
  };

  const deleteItem = async (item) => {
    try {
      const result = await client.deleteById('public-items', item.item_id);
      setRefresh();
      return result;
    } catch (error) {
      alert('Something went wrong, please try again.');
    }
  };

  if (!auth.isAuthenticated && page !== PAGES.DISCOVER.Name) {
    return (
      <div className="InfoMessage">
        <p> Please log in to make your personal list</p>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="InfoMessage">
        <p>{listMessage}</p>
      </div>
    );
  }

  return (
    <>
      <FilterSortBar setFilter={setFilter} setSort={setSort} sort={sort} filter={filter} />

      {data.length > 0 && !data['noShow'] ? (
        <>
          <ItemList
            page={page}
            data={data}
            setData={setData}
            getUser={getUser}
            setItemDetails={setItemDetails}
            addToList={addToList}
            deleteItemFromList={deleteItemFromList}
            markAsDone={markAsDone}
          />

          <ItemDetailsModal
            page={page}
            item={itemDetails}
            changeModeToEdit={() => setMode(MODE.UPDATE.Name)}
            close={() => setItemDetails(false)}
            addToList={addToList}
            deleteItemFromList={deleteItemFromList}
            deleteItem={deleteItem}
            markAsDone={markAsDone}
            setRefresh={setRefresh}
          />
        </>
      ) : (
        <div className="InfoMessage">
          <p>This list is empty!</p>
        </div>
      )}

      <EditOrAddItemModal
        close={() => {
          setMode(false);
        }}
        item={itemDetails}
        mode={mode}
        page={page}
        setRefresh={setRefresh}
      />

      <ProtectedByRole role={ROLE.USER}>
        {page === PAGES.HOME.Name && (
          <PlusButton onClick={() => setMode(MODE.ADD.Name)} size={65} />
        )}
      </ProtectedByRole>

      <ProtectedByRole role={ROLE.ADMIN}>
        {page === PAGES.DISCOVER.Name && (
          <PlusButton onClick={() => setMode(MODE.ADD.Name)} size={65} />
        )}
      </ProtectedByRole>
    </>
  );
};

export default ItemListContainer;
