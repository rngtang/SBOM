import { useState, useEffect } from 'react';
import * as React from 'react';
import MyAccordion from './ViewSBOMsAccordian';

export default function GetSBOMs ({sbomName, vulnID, trigger, setTrigger, userId, setLoading}) {
  
  const [sboms, setSboms] = useState([]);
  const baseSbomsUrl = `http://localhost:8080/users/${userId}/sboms`;
  const sbomsUrl = vulnID ? `${baseSbomsUrl}?vulnID=${vulnID}` : baseSbomsUrl;

  const fetchSboms = () => {
    fetch(sbomsUrl)
        .then((response) => response.json())
        .then((data) => {
            setSboms(data)
        });
  }

  useEffect(() => {
    fetchSboms();
  }, [trigger, vulnID]);

  return (
    <div>
      {sboms.map((sbom) => {
        if (sbom.name && ((sbom.name.includes(sbomName) || sbomName === '') && sbom.archive === false)) {
          return <MyAccordion key={sbom.id} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading} />
        }
        return null;
      })}
    </div>
  );
};
