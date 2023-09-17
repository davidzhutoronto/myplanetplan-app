/**
 * Path: /src/Components/Discover/Discover.js
 * Author: David
 * Date Create: 15-Nov-2022
 * Purpose of this component: Displays Discover page of the web app
 */

import React, { useContext, useEffect, useState } from 'react';

import { useAuth } from 'react-oidc-context';

import { RefreshContext } from '../../App';
import ItemListContainer from '../Shared/ItemListContainer/ItemListContainer';
import HttpClient from '../../services/HttpClientService';

const Discover = ({ page, setRefresh }) => {
  const [data, setData] = useState(null);
  const auth = useAuth();
  const refresh = useContext(RefreshContext);

  const fetchData = async () => {
    try {
      const client = new HttpClient(auth.user ? auth.user.access_token : '');
      const rdata = await client.get('public-items');
      if (!rdata || rdata.error) {
        setData({ error: true });
        return;
      }
      setData(rdata);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <>
      <ItemListContainer page={page} data={data} setData={setData} setRefresh={setRefresh} />
    </>
  );
};

export default Discover;
