import {useState, useEffect} from 'react'
import * as React from 'react'
import MyAccordion from './ViewSBOMsAccordion'

// sbomName is the name of the SBOM
// trigger [again idk what this does pls help]
// userId is the ID of the user, not the netid
export default function GetSBOMs ({sbomName, trigger, setTrigger, userId, setLoading}) {
    // create states for the SBOM and the route to access the SBOM
    const [sboms, setSboms] = useState([])
    const sbomsUrl = `http://localhost:8080/users/${userId}/sbom_top`;

    // create a handle to fetch SBOM details (just the top), turning it into a json file
    const fetchSboms = () => {
        fetch(sbomsUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log("sbom data", data)
                setSboms(data)
            })
    }

    // set trigger for fetching SBOMs
    useEffect(() => {
        fetchSboms()
        // debugger lines
        // console.log("was triggered");
        // console.log("CURRENT USER, from get: ", userId);
    }, [trigger])

    return (
        <div>
            {sboms.map((sbom => {
                // debugger lines
                // console.log(sbomName)
                // console.log(sbom.id.toString() == sbomName.sbomName)

                // if SBOM data was fetched, show accoridon of SBOM
                if (sbom.name) {
                    if ((sbom.name.toLowerCase().includes(sbomName.toLowerCase()) || sbomName == null) && (sbom.archive == false)){
                        return (<MyAccordion key={sbom.id} userId={userId} meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger} setLoading={setLoading}/>)
                    }
                }
                
            }))}
        </div>
    );
};