import React from 'react';

const LogoutMessage = () => {
    return (
        <div>
            <a href='/home'>you have logged out. press here to go home.</a>
        </div>
    );
};


const Logout = ({ setLoggedIn, setLoggingOut }) => {
    setLoggedIn(false);
    setLoggingOut(true);
    return (
        <div>
            <LogoutMessage />
        </div>
    );
};

export default Logout;
