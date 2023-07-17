import React, { useEffect, useState } from 'react';
import './ProfileComp.css';
import { data } from 'jquery';

export default function ProfileComp() {
    const [email, setEmail] = useState('');
    const [netid, setNetid] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/current_user')
            .then(response => response.json())
            .then(data => {
                setEmail(data.email);
                setNetid(data.netid);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div id='profile'>
                <p>Welcome {email}!</p>
                <p>You are logged in as {netid}</p>
            </div>
        </>
    )
};
