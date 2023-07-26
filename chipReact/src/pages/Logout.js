import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// const Logout = ({ setLoggedIn}) => {
    // const [showMessage, setShowMessage] = useState(false);
    // const goHome = useNavigate();

    // useEffect(() => {
    //     const handleLogout = () => {
    //         if(window.confirm('Are you sure you want to log out?')){
    //             setLoggedIn(false);
    //             setShowMessage(true);
    //         } else {
    //             goHome('/home');
    //         }
    //     };

    //     handleLogout();
    // }, [goHome])

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