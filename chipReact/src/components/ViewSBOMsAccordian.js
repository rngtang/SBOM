import React from 'react';
import './ViewAccordian.css';
import Accordion from 'react-bootstrap/Accordion';

const MyAccordion = ({ name, meta, type, stat, vulnNum, sbom }) => {
    // const metaObj = meta[0]
    const myHonda = {
        color: "red",
        wheels: 4,
        engine: { cylinders: 4, size: 2.2 },
      };
 
        
        //   else {
        //     console.log('null')
        //     return ('null')
        //   };
    
      
      if (meta != null){
        return (
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0" flush>
                    <Accordion.Header><p id='name'>{name}</p>              <div id='accordianRight'><p>{type}</p><p>{stat}</p><p>View</p><p>Update SBOM</p></div></Accordion.Header>
                    <Accordion.Body>
                        <div id='meta'> <p id='metaHead'>Metadata: </p> <p id='tab'>
                             Timestamp: {meta.timestamp}
                            <br></br>   Tools: {meta.tools[0].vendor} - {meta.tools[0].name} - v.{meta.tools[0].version}
                            <br></br> Description: {sbom.description}
                            </p>   </div>
                       
                            <div id='bodyRight'><p>{vulnNum} Vulnerabilities Found</p></div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
      }
      
}

export default MyAccordion;