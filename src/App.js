/**
 * Path: /src/App.js
 * Author: MyPlanetPlan Development Team
 * Date Create: 15-Oct-2022
 * Purpose of this component: the MyPlanetPlan web app
 */

import React, { createContext, useEffect, useState } from 'react';

import Account from './Components/Account/Account';
import AuthAccess from './services/AuthAccess';
import Discover from './Components/Discover/Discover';
import Header from './Components/Shared/Header/Header';
import History from './Components/History/History';
import Home from './Components/Home/Home';
import Navbar from './Components/Shared/Navbar/Navbar';
import { PAGES } from './Components/Shared/Misc/Enums';
import ProtectedByAuth from './Components/Shared/Auth/ProtectedByAuth';
import { useAuth } from 'react-oidc-context';
import HttpClient from './services/HttpClientService';

import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';

export const AuthAccessContext = createContext();
export const RefreshContext = createContext();

const App = () => {
  // Enum state for all possible pages.
  const [user, setUser] = useState(undefined);
  const [page, setPage] = useState(PAGES.HOME);
  const [authAccess, setAuthAccess] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  //assume it's landing
  const [isLanding, setIsLanding] = useState(true);

  const auth = useAuth();

  const getUser = async () => {
    const client = new HttpClient(auth.user.access_token);
    let rUser = await client.get('useraccount');
    if (!rUser || rUser.error || !Array.isArray(rUser)) {
      rUser = await client.post('useraccount');
    }
    setUser(rUser[0]);
  };

  useEffect(() => {
    auth.isAuthenticated && !auth.isLoading ? setIsLanding(false) : setIsLanding(true);
    if (auth.isAuthenticated && !auth.isLoading) {
      // set new authaccess for resource access
      setAuthAccess(new AuthAccess(auth.user.access_token));

      // get KeyCloak UserId from oidc-context, if user is new, saves as user in mpp database
      getUser();

      // removes old query string from uri
      window.history.pushState({}, '', document.location.href.split('?')[0]);
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  return (
    <AuthAccessContext.Provider value={authAccess}>
      <RefreshContext.Provider value={refresh}>
        <Navbar setPage={setPage} />
        <div id="page-content">
          <Header page={page.Name} />
          {isLanding
            ? page === PAGES.HOME && <LandingPage />
            : page === PAGES.HOME && (
                <ProtectedByAuth>
                  <Home
                    page={PAGES.HOME.Name}
                    user={user}
                    getUser={() => getUser(auth.user.profile.sub)}
                    setRefresh={() => setRefresh(!refresh)}
                  />
                </ProtectedByAuth>
              )}

          {page === PAGES.DISCOVER && (
            <Discover
              page={PAGES.DISCOVER.Name}
              user={user}
              getUser={() => getUser(auth.user.profile.sub)}
              setRefresh={() => setRefresh(!refresh)}
            />
          )}

          {page === PAGES.HISTORY && (
            <ProtectedByAuth>
              <History page={PAGES.HISTORY.Name} />
            </ProtectedByAuth>
          )}

          {page === PAGES.ACCOUNT && (
            <ProtectedByAuth>
              <Account user={user} />
            </ProtectedByAuth>
          )}
        </div>
      </RefreshContext.Provider>
    </AuthAccessContext.Provider>
  );
};

export default App;
