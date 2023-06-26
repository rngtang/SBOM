import React from 'react';
import './App.css';
import MySideNav from './components/MySideNav';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
function App() {
  return (
    <Router > 
      <MySideNav/>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/viewsboms' element={<ViewSBOMs/>} />
        <Route path='/generatesboms' element={<GenerateSBOMs/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/logout' element={<Logout/>} />

      </Routes>
    </Router>
  );
}

export default App;
