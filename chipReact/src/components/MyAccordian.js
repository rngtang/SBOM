import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

// name is the name of the SBOM
// meta is the metadata of the SBOM
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
};

export default MyAccordion;