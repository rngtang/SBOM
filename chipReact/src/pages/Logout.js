import React from 'react';
import styles from './GenerateSBOMs.module.css';
import { useNavigate } from 'react-router-dom';

const LogoutMessage = () => {
    return (
        <div className={styles.section}> 
        {/* stole the css from the generate page */}
            <h3>If you pressed Log Out, You have successfully logged out!</h3>
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


const Logout = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        // TODO: @calbe Replace with actual logout logic
        setLoggedIn(false);
        navigate("/home");
    }

    return (
        <div>
            <button onClick={handleLogoutClick}>Log out</button>
            <LogoutMessage/>
        </div>
    );
};

export default Logout;


