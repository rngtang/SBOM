import React from 'react';
import './ViewAccordian.css';
import Accordion from 'react-bootstrap/Accordion';

const MyAccordion = ({ name, meta, type, stat }) => {
    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0" flush>
                <Accordion.Header><p>{name}</p>              <div id='accordianRight'><p>{type}</p><p>{stat}</p><p>View</p><p>Update SBOM</p></div></Accordion.Header>
                <Accordion.Body>
                    {meta}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default MyAccordion;