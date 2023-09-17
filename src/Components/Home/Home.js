/**
 * Path: /src/Components/Home/Home.js
 * Author: Haerin
 * Date Create: 15-Oct-2022
 * Purpose of this component: Home page of the app
 */

import React, { useEffect, useState, useContext } from 'react';
import HttpClient from '../../services/HttpClientService';
import { useAuth } from 'react-oidc-context';

import { RefreshContext } from '../../App';
import ItemListContainer from '../Shared/ItemListContainer/ItemListContainer';
import Visuals from './Visuals/Visuals';

import './Home.css';

const Home = ({ page, user, getUser, setRefresh }) => {
  const [data, setData] = useState(null);

  const refresh = useContext(RefreshContext);

  const auth = useAuth();
  const client = new HttpClient(auth.user.access_token);

  /**TO BE DONE: get points from the API, make some sensible scaling */
  const points = user ? user.points : 0;

  const fetchData = async () => {
    try {
      let rdata = await client.get('user-item');
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
      <Visuals points={points} />
      <ItemListContainer
        page={page}
        data={data}
        setData={setData}
        getUser={getUser}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Home;
