import React, { useEffect, useState } from 'react';
import styles from './Logout.module.css';

const LogoutMessage = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.text}>
                <h2>You have successfully logged out!</h2> <br></br>
                <a href='/home' style={{ textDecoration: 'none' }}>&#8592; Back to home page</a>
            </div>
        </div>
    );
};

const Logout = ({ setLoggedIn, setLoggingOut }) => {
    // set states for being logged out, and currently logging out
    setLoggedIn(false);
    setLoggingOut(true);

    return (
        <div>
            {<LogoutMessage />}
        </div>
    );
};

export default Logout;