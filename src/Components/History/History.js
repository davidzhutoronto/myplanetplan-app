/**
 * Path: /src/Components/History/History.js
 * Author: Haerin
 * Date Create: 15-Oct-2022
 * Purpose of this component: Displays History page of the web app
 */

import React, { useEffect, useState } from 'react';

import HttpClient from '../../services/HttpClientService';
import { useAuth } from 'react-oidc-context';

import ItemListContainer from '../Shared/ItemListContainer/ItemListContainer';

import './History.css';

const History = ({ page }) => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const client = new HttpClient(auth.user.access_token);
      const rdata = await client.get('user-item-history');
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
  }, []);

  return (
    <>
      <ItemListContainer page={page} data={data} setData={setData} />
    </>
  );
};

export default History;
