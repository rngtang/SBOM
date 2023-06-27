import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MySideNav from './components/MySideNav';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <MySideNav />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/viewsboms" element={<ViewSBOMs />} />
              <Route path="/generatesboms" element={<GenerateSBOMs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
