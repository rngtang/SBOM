import React from 'react';
import '../App.css';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from 'react-router-dom';
import logo from './images/chip.png';

function MySideNav(){
    const navigate = useNavigate({onToggle, isOpen});
    
    return (
        <SideNav
            onToggle={onToggle}
            expanded={isOpen}

            onSelect={(selected) => {
                console.log(selected);
                navigate('/'+selected);
            }}
            className='mysidenav'
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected = "home">
                <NavItem eventKey="logo" className="nav-item-logo">
                    {/* <NavIcon>
                        <img src={logo} alt="Logo" style={{width: "100%", maxHeight: "120px"}}/>
                    </NavIcon> */}
                    
                </NavItem>
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Home</NavText>
                </NavItem>  
                <NavItem eventKey="viewsboms">
                    <NavIcon>
                        <i className="fa fa-fw fa-eye" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>View SBOMs</NavText>
                </NavItem>
                <NavItem eventKey="generatesboms">
                    <NavIcon>
                        <i className="fa fa-fw fa-screwdriver-wrench" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Generate SBOMs</NavText>
                </NavItem>
                <NavItem eventKey="Profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Profile</NavText>
                </NavItem>
                <NavItem eventKey="Logout">
                    <NavIcon>
                        <i className="fa fa-fw fa-right-from-bracket" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}

export default MySideNav;
