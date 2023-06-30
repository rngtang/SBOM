import React from 'react';
import { NavLink } from 'react-router-dom';
import chipImage from './images/chip.png';
import './MySideNav.css';

const MySideNav = ({loggedIn}) => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-royalblue rounded sidebar">
      <div className="sidebar-sticky">
        <div className="navbar-logo">
          <NavLink to="/home">
            <img src={chipImage} alt="Logo" className="logo-image" />
          </NavLink>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          {loggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/viewsboms" className="nav-link" activeClassName="active">
                  View SBOMs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/generatesboms" className="nav-link" activeClassName="active">
                  Generate SBOMs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link" activeClassName="active">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link" activeClassName="active">
                  Logout
                </NavLink>
              </li>
              </>
          )}
        </ul>
      </div>
    </nav>
    );
};

export default MySideNav;
