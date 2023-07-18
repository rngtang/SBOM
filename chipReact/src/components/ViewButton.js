import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function ViewButton({sbomId}) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        console.log("hello world");
        navigate('/vulnerability');
    }

    return (
        <Button variant="outline-primary" id='viewButton' type='submit' size="sm" onClick={handleButtonClick}>
        View <br/> Vulnerabilities
        </Button>
    )
}