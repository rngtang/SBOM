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

const Logout = ({ setLoggedIn, setLoggingOut, loggedIn, loggingOut }) => {
    // const [showMessage, setShowMessage] = useState(false);
    // console.log("2setloggedin: " + loggedIn);
    // console.log("2setloggingout: " + loggingOut);

    // useEffect(() => {
    //     if (window.confirm('Are you sure you want to log out?')) {
    //         setLoggedIn(false);
    //         setLoggingOut(true);
    //         setShowMessage(true);
    //         // console.log("3setloggedin: " + loggedIn);
    //         // console.log("3setloggingout: " + loggingOut);
    //     }
    // }, [])
    setLoggedIn(false);
    setLoggingOut(true);

    return (
        <div>
            {/* {showMessage && <LogoutMessage />} */}
            {<LogoutMessage />}
        </div>
    );
};

export default Logout;
