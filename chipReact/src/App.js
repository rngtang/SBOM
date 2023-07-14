import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MySideNav from './components/MySideNav';
import { Button } from 'react-bootstrap';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    //TODO: need to replace with actual logic to check if user is logged in @Caleb
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
        } else {
          throw new Error('Not logged in');
        }
      })
      .catch((error) => {
        setLoggedIn(false);
      });

    //setLogedIn(true) if user is logged in
  }

  const handleLoginClick = () => {
    //TODO: add any login logic here @Caleb
    const acsUrl = process.env.REACT_APP_ACS_URL;
    const samlEndpoint = 'https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu&RelayState=';
    window.location.href = `${samlEndpoint}${acsUrl}`;

    // setLoggedIn(true);
  }

  const [loggingOut, setLoggingOut] = useState(false);

  return (
    
    <Router>
      
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="main-content">
            {/* col-md-9 ml-sm-auto col-lg-10 px-4 */}
            {!loggingOut && <MySideNav loggedIn={loggedIn} />}

            <div className='pages'>
              {!loggedIn && !loggingOut && <Button className="login-button" onClick={handleLoginClick}>Log in</Button>}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setLoggingOut={setLoggingOut}/>}/>
                {loggedIn && (
                  <>
                    <Route path="/viewsboms" element={<ViewSBOMs />} />
                    <Route path="/generatesboms" element={<GenerateSBOMs />} />
                    <Route path="/profile" element={<Profile />} />
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
