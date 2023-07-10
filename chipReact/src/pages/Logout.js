import React from 'react';
import styles from './Logout.module.css';

const LogoutMessage = () => {
    return (
        <div className={styles.text}>
            <h1>You have successfully logged out!</h1>
            <a href='/home'>Back to home page.</a>
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
