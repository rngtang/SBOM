import React, {useState, useEffect} from 'react';
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
  const[loggedIn, setLoggedIn] = useState(false);

  useEffect(() =>{
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  const handleLoginClick = () => {
    const acsUrl = encodeURIComponent(process.env.REACT_APP_ACS_URL);
    const samlEndpoint = 'https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu&RelayState=';
    window.location.href = `${samlEndpoint}${acsUrl}`;
    setLoggedIn(true);
}

  

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
        <MySideNav loggedIn={loggedIn} />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
            <Button className="login-button" onClick={handleLoginClick}>Log in</Button>
            <Routes>
              <Route path="/home" element={<Home />} />
              {loggedIn && (
                <>
                <Route path="/viewsboms" element={<ViewSBOMs />} />
                <Route path="/generatesboms" element={<GenerateSBOMs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />.
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>

  );
};

export default App;
