import React from 'react';
import './ProfileComp.css';

export default function ProfileComp({ username, netid }) {
    return (
        <>
            <div id='profile'>
                <p>Welcome {username}!</p>
                <p>You are logged in as {netid}</p>
            </div>
        </>
    )
};
