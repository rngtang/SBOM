import {useState, useEffect} from 'react'
import * as React from 'react'
import MyAccordion from './ViewSBOMsAccordian'

export default function GetSBOMs ({sbomName, trigger, setTrigger}) {
    const [sboms, setSboms] = useState([])
    const sbomsUrl = "http://localhost:8080/users/1/sboms"

    // console.log("the CHILD trigger is currently: ", trigger)

    const fetchSboms = () => {
        fetch(sbomsUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setSboms(data)
            })
    }
    useEffect(() => {
        fetchSboms()
        console.log("was triggered")
    }, [trigger])

    return(
        <div>
            {sboms.map((sbom => {
                // console.log(sbomName)
                // console.log(sbom.id.toString() == sbomName.sbomName)
                if (sbom.name) {
                    if ((sbom.name.includes(sbomName) || sbomName == null) && (sbom.archive == false)){
                        return (<MyAccordion meta={sbom.metadata[0]} sbom={sbom} trigger={trigger} setTrigger={setTrigger}/>)
                    }
                }
                
            }))}
        </div>
    )
}