import React from 'react';
import './ViewAccordian.css';
import Accordion from 'react-bootstrap/Accordion';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

const MyAccordion = ({ meta, trigger, sbom, setTrigger }) => {

      if (meta != null){
        return (
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0" flush>
                    <Accordion.Header><p id='name'>{sbom.name}    </p>              
                    <div id='accordianRight'>
                        <div id='type'>
                            <p id='cyc'>{sbom.bomFormat}</p>
                            <p>v.{sbom.specVersion}</p>
                        </div>
                        <DeleteButton sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} />
                        <p className='rightTxt'>View</p>
                        <UpdateButton sbomId={sbom.id} trigger={trigger} setTrigger={setTrigger} name={sbom.name} description={sbom.description} />
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div id='meta'> <p id='metaHead'>Metadata: </p> <p id='tab'>
                             Timestamp: {meta.timestamp}
                            <br></br>   Tools: {meta.tools[0].vendor} - {meta.tools[0].name} - v.{meta.tools[0].version}
                            <br></br> Description: {sbom.description}
                            </p>   </div>
                       
                            <div id='bodyRight'><p>{sbom.vulnerabilities.length} Vulnerabilities Found</p></div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
      }
      
}

export default MyAccordion;