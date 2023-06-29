import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MyAccordian from './pages/MyAccordian';
import MySideNav from './components/MySideNav';
import Login from './components/Login'; 
import ProtectedRoute from './utils/ProtectedRoute'; 
import { UserContext } from './UserContext';


const App = () => {
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    const response = await fetch('/current_user', { credentials: 'include' });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else {
      console.log('No user is logged in');
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="container-fluid">
          <div className="row">
            <MySideNav />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <MyAccordian />
              <Routes>
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/viewsboms" element={<ProtectedRoute element={<ViewSBOMs />} />} />
                <Route path="/generatesboms" element={<ProtectedRoute element={<GenerateSBOMs />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
