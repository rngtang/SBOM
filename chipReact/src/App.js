import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Logout from './pages/Logout';
import MySideNav from './components/MySideNav';
import Vulnerability from './pages/Vulnerability';
import SbomTree from './pages/tree-rendering/SbomTree';

const App = () => {
  // create states for being logged in, in the process of logging out, the ID of the user, the user's preferred name, the user's netid
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [netId, setNetId] = useState(null);

  // create a handle for checking login status
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // check if user is correctly logged in
  const checkLoginStatus = () => {
    fetch('http://localhost:8080/current_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

      // check if response is valid, indicating user is valid
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      })

      // data from SHIB
      .then((data) => {
        // console.log(data);
        if (data) {
          setUserId(data.id);
          setNetId(data.netid);
          setUserName(data.username);
        }
        // debugger lines
        // console.log("current user", data.id);
        // console.log("current netid", data.netid);
        // console.log("current netid from state", netId);
      })

      // catch errors
      .catch((error) => {
        setLoggedIn(false);
      });
    // debugger lines
    // console.log("1setloggedin: " + loggedIn);
    // console.log("1setloggingout: " + loggingOut);
  };

  // create a handle for clicking login
  const handleLoginClick = () => {
    const acsUrl = process.env.REACT_APP_ACS_URL;
    const samlEndpoint = 'https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu&RelayState=';
    window.location.href = `${samlEndpoint}${acsUrl}`;
  }

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="main-content">
            {/* load navbar */}
            {!loggingOut && <MySideNav loggedIn={loggedIn} username={userName} netid={netId} handleLoginClick={handleLoginClick} />}
            <div className='pages'>
              <Routes>
                <Route exact path='/' element={<Navigate to ="/home" />}/>
                <Route exact path="/" element={<Home />} />
                {/* routes that are always open */}
                <Route path="/home" element={<Home />} />
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setLoggingOut={setLoggingOut} loggedIn={loggedIn} loggingOut={loggingOut} />} />
                {/* create routes after logged in */}
                {loggedIn && userId && (
                  <>
                    <Route path="/viewsboms" element={<ViewSBOMs userId={userId} />} />
                    <Route path="/sbom/:sbomId" element={<SbomTree />} />
                    <Route path="/generatesboms" element={<GenerateSBOMs />} />
                    <Route path="/vulnerability" element={<Vulnerability />} />
                  </>
                )}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;