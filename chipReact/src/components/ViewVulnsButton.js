import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAccordian.css';

export default function ViewVulnsButton({sbomId}) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // console.log("hello world");
        navigate('/vulnerability');
    }

    return (
        <div id="viewVulns">
            <Button variant="outline-danger" id='viewVulnsButton' type='submit' size="sm" onClick={handleButtonClick}>
            View Vulnerabilities Information
            </Button>
        </div>
    )
}