import React from 'react';
import './ViewAccordian.css';
import Accordion from 'react-bootstrap/Accordion';

const MyAccordion = ({ name, meta, type, stat, vulnNum }) => {
    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0" flush>
                <Accordion.Header><p id='name'>{name}</p>              <div id='accordianRight'><p>{type}</p><p>{stat}</p><p>View</p><p>Update SBOM</p></div></Accordion.Header>
                <Accordion.Body>
                    <p id='meta'>{meta}</p>   <div id='bodyRight'><p>{vulnNum} Vulnerabilities Found</p></div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default MyAccordion;