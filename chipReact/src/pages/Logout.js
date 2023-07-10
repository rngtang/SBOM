import React from 'react';

const LogoutMessage = () => {
    return (
        <div style={styles.background}>
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
        backgroundColor: '#404041'
    }, 
    text: {
        margin: 'auto',
        backgroundColor: '#E5E5E5',
        textAlign: 'center',
        padding: '40px 24px',
        borderRadius: '8px',
        position: 'absolute',
        top: '50%',
        transform: 'translate(31%, -50%)'
    }
};

export default Logout;
