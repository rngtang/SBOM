import React from 'react';
import { NavLink } from 'react-router-dom';
import chipImage from './images/chip.png';
import './MySideNav.css';

const MySideNav = ({loggedIn}) => {
    return (
      <div className="sidebar-sticky">
      <nav className="col-md-2 d-md-block bg-navblue sidebar">
        
      
        <div className="navbar-logo">
          <NavLink to="/home">
            <img src={chipImage} alt="Logo" className="logo-image" />
          </NavLink>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          </li>
          {loggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/viewsboms" className="nav-link">
                  View SBOMs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/generatesboms" className="nav-link">
                  Generate SBOMs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
              </>
          )}
        </ul>
        
    </nav>
    </div>
    );
};

export default MySideNav;