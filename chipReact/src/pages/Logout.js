import React from 'react';

const LogoutButton = ({ setLoggedIn }) => {
    const handleLogoutClick = () => {
        setLoggedIn(false);
    }
    return (
        <div className='page'>
            <a href='/home' onClick={handleLogoutClick}>Log out</a>
        </div>
    );
};


const Logout = () => {
    return (
        <div>
            <LogoutButton/>
        </div>
    );
};

export default Logout;