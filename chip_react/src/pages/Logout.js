import React from 'react';
import styles from './GenerateSBOMs.module.css';

const LogoutMessage = () => {
    return (
        <div className={styles.section}> 
        {/* stole the css from the generate page */}
            <h3>You have successfully logged out!</h3>
            <HomeButton />
        </div>
    );
};

const HomeButton = () => {
    return (
        <div className='page'>
            <a href='/home'>Return Home</a>
        </div>
    );
};

const Logout = () => {
    return (
    <div className='page'>
        <LogoutMessage />
    </div>
    );
};
export default Logout;
