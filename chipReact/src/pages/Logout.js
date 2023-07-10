import React from 'react';
import styles from './Logout.module.css';

const LogoutMessage = () => {
    return (
        <body>
            <div>
                <div className={styles.text}>
                    <h1>You have successfully logged out!</h1> <br></br>
                    <a href='/home' style={{ textDecoration: 'none' }}>&#8592; Back to home page</a>
                </div>
            </div>
        </body>   
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
