import React from 'react';
import './ViewAccordion.css';
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
const MyAccordion = ({ userId, meta, trigger, setTrigger, sbom, setLoading }) => {

    // create a state for showing or hiding the form
    const [showForm, setShowForm] = useState(false);

    // check if there is metadata in the SBOM, hence indicating that it has piped/imported correctly
    if (meta != null) {
        return (
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">

                    <Accordion.Header><p id='name'>{sbom.name}</p>
                        <div id='accordianRight'>
                            <div id='type'>
                                <p id='cyc'>{sbom.bomFormat}</p>
                                <p>v.{sbom.specVersion}</p>
                            </div>
                            {/* all buttons for sbom tree, deletion, update */}
                            <TreeButton sbomId={sbom.id} sbomName={sbom.name} sbomDesc={sbom.description}/>
                            <DeleteButton sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading} />
                            <UpdateButton userId={userId} sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} name={sbom.name} description={sbom.description} setLoading={setLoading}/>
                        </div>
                    </Accordion.Header>
                    {/* toggle accordion open body */}
                    <Accordion.Body>
                        {/* gives metadata of sbom */}
                        <div id='meta'> <p id='metaHead'>Metadata: </p> <p id='tab'>
                            Timestamp: {meta.timestamp}
                            <br></br> Tools: {meta.tools[0].vendor} - {meta.tools[0].name} - v.{meta.tools[0].version}
                            <br></br> Description: {sbom.description}
                        </p>
                        </div>

                        {/* need to pass in # of vulnerabilities from endpoint (formerly sbom.vulnerabilities.length) */}
                        <div id='bodyRight'><p>{sbom.vuln_number} Vulnerabilities Found</p>
                            {/* buttons for vulnerability page and edit sbom */}
                            <ViewVulnsButton sbomId={sbom.id} sbomName={sbom.name} sbomDesc={sbom.description} trigger={trigger} setTrigger={setTrigger} />
                            <EditButton showForm={showForm} setShowForm={setShowForm} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading}/>
                        </div>
                    </Accordion.Body>

                </Accordion.Item>
            </Accordion>
        );
    };
};

export default MyAccordion;