import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './ViewAccordian.css';

const MyAccordion = ({ name, meta, type, stat }) => {
    return (
        <Accordion alwaysOpen flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{name} <div id='accordian right'>{type}{stat}<p>View</p><p>Update SBOM</p></div></Accordion.Header>
                <Accordion.Body>
                    {meta}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default MyAccordion;