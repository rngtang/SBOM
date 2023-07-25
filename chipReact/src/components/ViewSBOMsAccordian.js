import React from 'react';
import './ViewAccordian.css';
import Accordion from 'react-bootstrap/Accordion';
import DeleteButton from './DeleteButton';
import ViewVulnsButton from './ViewVulnsButton';
import UpdateButton from './UpdateButton';
import EditButton from './EditButton';
import { useState } from 'react';
import TreeButton from './TreeButton';

// comments in the actual accordion is spotty, please add stuff -james

// userId is the ID of the user, not the netid
// meta is the metadata of the SBOM
// trigger [no clue bro]
// setTrigger [pls help]
// sbom is the actual SBOM json file
const MyAccordion = ({ userId, meta, trigger, setTrigger, sbom }) => {
    console.log("inside accordion")

    // create a state for showing or hiding the form
    const [showForm, setShowForm] = useState(false);

    // check if there is metadata in the SBOM, hence indicating that it has piped/imported correctly
    if (meta != null) {
        return (
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0" flush>

                    <Accordion.Header><p id='name'>{sbom.name}</p>
                        <div id='accordianRight'>
                            <div id='type'>
                                <p id='cyc'>{sbom.bomFormat}</p>
                                <p>v.{sbom.specVersion}</p>
                            </div>
                            <TreeButton sbomId={sbom.id}/>
                            <DeleteButton sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} />
                            <UpdateButton userId={userId} sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} name={sbom.name} description={sbom.description} />
                        </div>
                    </Accordion.Header>

                    <Accordion.Body>
                        <div id='meta'> <p id='metaHead'>Metadata: </p> <p id='tab'>
                            Timestamp: {meta.timestamp}
                            <br></br> Tools: {meta.tools[0].vendor} - {meta.tools[0].name} - v.{meta.tools[0].version}
                            <br></br> Description: {sbom.description}
                        </p>
                        </div>

                        <div id='bodyRight'><p>{sbom.vulnerabilities.length} Vulnerabilities Found</p>
                            <ViewVulnsButton sbomId={sbom.id} sbomName={sbom.name} sbomDesc={sbom.description} trigger={trigger} setTrigger={setTrigger} />
                            <EditButton showForm={showForm} setShowForm={setShowForm} sbom={sbom} trigger={trigger} setTrigger={setTrigger} />
                        </div>
                    </Accordion.Body>

                </Accordion.Item>
            </Accordion>
        );
    };
};

export default MyAccordion;