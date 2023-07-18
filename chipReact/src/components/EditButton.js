import { Button } from 'react-bootstrap';
import { useState } from 'react';
import './ViewAccordian.css';

export default function EditButton ({showForm, setShowForm, sbom, trigger, setTrigger}) {
    const [userName, setUserName] = useState("");
    const [userDesc, setUserDesc] = useState("");
    const handleButtonClick = (e) => {
        setShowForm(!showForm)
    }

    const handleSubmitClick =(e) => {
            e.preventDefault()
            console.log('awegawe')
            if (userName && !userDesc) {
                fetch(`http://localhost:8080/sboms/${sbom.id}`, {
                    method: 'PUT',
                    redirect: "follow",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: userName,
                    })
                })
                .then((response)=>{
                    setTrigger(!trigger)
                })
            }
            if (userDesc && !userName) {
                fetch(`http://localhost:8080/sboms/${sbom.id}`, {
                    method: 'PUT',
                    redirect: "follow",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        description: userDesc
                    })
                })
                .then((response)=>{
                    setTrigger(!trigger)
                })
            }
            if (userName && userDesc) {
                fetch(`http://localhost:8080/sboms/${sbom.id}`, {
                    method: 'PUT',
                    redirect: "follow",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: userName,
                        description: userDesc
                    })
                })
                .then((response)=>{
                    setTrigger(!trigger)
                    setShowForm(!showForm);
                })
            }            
            
    
        
    }
    return (
        <div id="edits">
            <Button variant="outline-secondary" id='editButton' type='submit' size="sm" onClick={handleButtonClick}>
                Edit SBOM Name/Description
            </Button>
            {showForm && (
                <form id="editForm">
                    <input
                    type="text" required
                    value={userName}
                    className="buttonInput"
                    onChange={(event) => setUserName(event.target.value)}
                    placeholder={sbom.name}
                    // style={{
                    // borderColor: formSubmitted && !userName ? 'red' : '',
                    // }}
                    />
                    <input
                    type="text" required
                    value={userDesc}
                    className="buttonInput"
                    onChange={(event) => setUserDesc(event.target.value)}
                    placeholder={sbom.description}
                    // style={{
                    // borderColor: formSubmitted && !userName ? 'red' : '',
                    // }}
                    />
                    <Button variant="outline-primary" id='editSubmit' type='submit' size="sm" onClick={handleSubmitClick}>Submit Edits</Button>
                </form>
            )

            }
        </div>
        
    )
}