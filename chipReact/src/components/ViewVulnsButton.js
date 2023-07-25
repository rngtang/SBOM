import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAccordion.css';

// sbomId is the ID of the SBOM
export default function ViewVulnsButton({ sbomId, sbomName, sbomDesc }) {

    // create a state for navigation route
    const navigate = useNavigate();

    // create a handle for button click
    const handleButtonClick = () => {
        // set navigate target route
        // console.log(sbomName);
        navigate('/vulnerability', { state: { sbomId, sbomName, sbomDesc } });
    }

    return (
        <div id="viewVulns">
            <Button variant="outline-danger" id='viewVulnsButton' type='submit' size="sm" onClick={handleButtonClick}>
                View Vulnerabilities Information
            </Button>
        </div>
    );
};