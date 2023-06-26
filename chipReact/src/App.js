import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ViewSBOMs from './pages/ViewSBOMs';
import GenerateSBOMs from './pages/GenerateSBOMs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/viewsboms' element={<ViewSBOMs/>} />
          <Route path='/generatesboms' element={<GenerateSBOMs/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
