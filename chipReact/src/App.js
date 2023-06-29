import LoginPage from './pages/LoginPage';
import React, { useState } from 'react';
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);


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
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
