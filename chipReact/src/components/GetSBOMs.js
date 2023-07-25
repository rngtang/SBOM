import { useState, useEffect } from 'react';
import * as React from 'react';
import MyAccordion from './ViewSBOMsAccordion';

export default function GetSBOMs ({sbomName, vulnID, trigger, setTrigger, userId, setLoading}) {
  // sbomName is the name of the SBOM
  // trigger is a parameter for the useEffect, when it changes accordian will "refresh"
  // userId is the ID of the user, not the netid
  const [sboms, setSboms] = useState([]);
  const baseSbomsUrl = `http://localhost:8080/users/${userId}/sboms`;
  const sbomsUrl = vulnID ? `${baseSbomsUrl}?vulnID=${vulnID}` : baseSbomsUrl;

  const fetchSboms = () => {
    console.log("this is the url", sbomsUrl);
    fetch(sbomsUrl)
        .then((response) => response.json())
        .then((data) => {
            // console.log("this is the data", data);
            setSboms(data)
        });
  }

  useEffect(() => {
    fetchSboms();
  }, [trigger, vulnID]);

    return (
        <div>
            {sboms.map((sbom => {
              // console.log("This is all of sbom", sbom)
              // const displayed = new Set();

                if (sbomName) { // if searching for name
                  if (sbom.name) { // the sbom needs to have a name
                    if ((sbom.name.includes(sbomName) || sbomName == null) && (sbom.archive == false)){
                        return (<MyAccordion userId={userId} meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading}/>)
                    }
                  }
                }

                else if (vulnID) { // if searching for vulnerability
                  if (sbom.vulnerabilities) {
                    // console.log("this is sbom.vulnerabilities", sbom.vulnerabilities)

                    // const filteredVulns = sbom.vulnerabilities.filter(v => (v.vulnID.includes(vulnID) && sbom.archive == false));
                    // console.log("this is filtered vulnerabilities:", filteredVulns);

                    // if (filteredVulns.length > 0 && !displayed.has(sbom.id)) {
                    //   displayed.add(sbom.id);
                    if (sbom.archive == false) {
                      return (
                        <MyAccordion key={sbom.id} userId={userId} meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading} />
                      );
                    }
                  }
                }

                else if (sbom.archive == false) {
                  return (<MyAccordion userId={userId} meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading}/>)
                }
                
            }))}
        </div>
    );
};
