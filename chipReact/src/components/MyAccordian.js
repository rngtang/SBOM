import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const MyAccordion = ({ name, meta }) => {
    return (
        <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                    {meta}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default MyAccordion;