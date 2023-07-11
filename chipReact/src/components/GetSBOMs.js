import {useState, useEffect} from 'react'
import * as React from 'react'
import MyAccordion from './ViewSBOMsAccordian'

export default function GetSBOMs (sbomName) {
    const [sboms, setSboms] = useState([])
    const sbomsUrl = "http://localhost:8080/users/1/sboms"

    const fetchSboms = () => {
        fetch(sbomsUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setSboms(data)
            })
    }
    useEffect(() => {
        fetchSboms()
    }, [])
    return(
        <div>
            {sboms.map((sbom => {
                console.log(sbomName)
                console.log(sbom.id.toString() == sbomName.sbomName)
                if (sbom.name.includes(sbomName.sbomName) || sbomName.sbomName == null){
                    return (<MyAccordion meta={sbom.metadata[0]} sbom={sbom}/>)
                }
            }))}
        </div>
    )
}