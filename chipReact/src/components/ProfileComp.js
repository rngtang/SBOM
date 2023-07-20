import React from 'react';
import './ProfileComp.css'; // styles

// username is the Display Name of the user, fetched from SHIB. this is the preferred name that the user has on file with Duke
// netid is the Net ID of the user, fetched from SHIB
export default function ProfileComp({ username, netid }) {
    return (
        <>
            <div id='profile'>
                <p>Welcome {username}!</p>
                <p>You are logged in as {netid}</p>
            </div>
        </>
    );
};