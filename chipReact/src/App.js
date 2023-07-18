import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Logout from './pages/Logout';
import MySideNav from './components/MySideNav';
import { Button } from 'react-bootstrap';
import Vulnerability from './pages/Vulnerability';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [netId, setNetId] = useState(null);
  //somehow update these later idk
  // const username = "this cow";
  // const netid = "cow123";

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    fetch('http://localhost:8080/current_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setUserId(data.id);
          setNetId(data.netid);
          setUserName(data.email);//change this later to username
        }
        // console.log("current user", data.id);
        // console.log("current netid", data.netid);
        // console.log("current netid from state", netId);
      })
      .catch((error) => {
        setLoggedIn(false);
      });
    // debugger lines below
    // console.log("1setloggedin: " + loggedIn);
    // console.log("1setloggingout: " + loggingOut);
  };

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
            {!loggingOut && netId && userName && <MySideNav loggedIn={loggedIn} username={userName} netid={netId} />}
            <div className='pages'>
              {/* login button */}
              {!loggedIn && !loggingOut && <Button className="login-button" onClick={handleLoginClick}>Log in</Button>}
              <Routes>
                {/* routes that are always open */}
                <Route path="/home" element={<Home />} />
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setLoggingOut={setLoggingOut} loggedIn={loggedIn} loggingOut={loggingOut} />} />
                {/* create routes after logged in */}
                {loggedIn && userId && (
                  <>
                    <Route path="/viewsboms" element={<ViewSBOMs userId={userId} />} />
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
