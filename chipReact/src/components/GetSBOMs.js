import { useState, useEffect } from 'react';
import * as React from 'react';
import MyAccordion from './ViewSBOMsAccordian';

export default function GetSBOMs ({sbomName, vulnID, trigger, setTrigger, userId, setLoading}) {
  // sbomName is the name of the SBOM
  // trigger is a parameter for the useEffect, when it changes accordian will "refresh"
  // userId is the ID of the user, not the netid
  const [sboms, setSboms] = useState([]);
  const sbomsUrl = `http://localhost:8080/users/${userId}/sboms`;
  // const sbomsUrl = vulnID ? `${baseSbomsUrl}?vulnID=${vulnID}` : baseSbomsUrl;

  const fetchSboms = () => {
    console.log("this is the url", sbomsUrl);
    fetch(sbomsUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("this is the data", data);
            setSboms(data)
        });
  }

  useEffect(() => {
    fetchSboms();
  }, [trigger, vulnID]);

    return (
        <div>
            {sboms.map((sbom => {
                // debugger lines
                // console.log(sbomName)
                // console.log(sbom.id.toString() == sbomName.sbomName)

                // if SBOM data was fetched, show accoridon of SBOM
                if (sbom.name) {
                    if ((sbom.name.includes(sbomName) || sbomName == null) && (sbom.archive == false)){
                        return (<MyAccordion userId={userId} meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading}/>)
                    }
                }
                
            }))}
        </div>
    );
};
