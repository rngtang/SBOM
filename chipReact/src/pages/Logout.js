import React from 'react';

const LogoutMessage = () => {
    return (
        <div>
            <section className='text' style={styles.text}>
                <h1>You have successfully logged out!</h1>
                <a href='/home'>Back to home page.</a>
            </section>
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

const styles = {
    background: {
    }, 
    text: {
        margin: 'auto',
        textAlign: 'center',
        border: '4px black solid',
        padding: '16px',
        position: 'absolute',
        top: '50%',
        transform: 'translate(35%, -50%)'
    }
};

export default Logout;
