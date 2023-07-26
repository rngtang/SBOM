import { Button } from 'react-bootstrap';
import { useState } from 'react';
import './ViewAccordion.css';

// showForm determines if the form is shown
// sbom is the actual SBOM stored in the database
// trigger [idk guys help me out what does this do]
export default function EditButton({ showForm, setShowForm, sbom, trigger, setTrigger, setLoading }) {
    // create states for user inputted SBOM name and user inputted SBOM description
    // initialize with empty string so that user can input new changes
    const [userName, setUserName] = useState("");
    const [userDesc, setUserDesc] = useState("");

    // create a handle for clicking on button, toggles showform
    const handleButtonClick = (e) => {
        setShowForm(!showForm)
    }

    // create a handle for clicking on submit
    const handleSubmitClick = (e) => {
        // prevent empty inputs
        e.preventDefault()
        setLoading(true)
        // if user only updates name and not description
        if (userName && !userDesc) {
            // fetch route for specific SBOM, uses PUT method
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
                .then((response) => {
                    // update name and description
                    setTrigger(!trigger)
                    // turn form off after submitting
                    setShowForm(!showForm)
                    setLoading(false);
                })
        }

        // if user only updates description and not name
        if (userDesc && !userName) {
            // fetch route for specific SBOM, uses PUT method
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
                .then((response) => {
                    // update name and description
                    setTrigger(!trigger)
                    // turn form off after submitting
                    setShowForm(!showForm)
                    setLoading(false);
                })
        }

        // if user updates both name and description
        if (userName && userDesc) {
            // fetch route for specific SBOM, uses PUT method
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
                .then((response) => {
                    // update name and description
                    setTrigger(!trigger)
                    // turn form off after submitting
                    setShowForm(!showForm)
                    setLoading(false);
                })
        }
        setUserName("");
        setUserDesc("");
    }

    return (
        <div id="edits">
            <Button variant="outline-secondary" id='editButton' type='submit' size="sm" onClick={handleButtonClick}>
                Edit SBOM Name/Description
            </Button>

            {/* show form logic */}
            {showForm && (
                <form id="editForm">
                    {/* input field for name */}
                    <input
                        type="text" required
                        value={userName}
                        className="buttonInput"
                        onChange={(event) => setUserName(event.target.value)}
                        placeholder={sbom.name}
                    />

                    {/* input field for description */}
                    <input
                        type="text" required
                        value={userDesc}
                        className="buttonInput"
                        onChange={(event) => setUserDesc(event.target.value)}
                        placeholder={sbom.description}
                    />

                    {/* submit button */}
                    <Button variant="outline-primary" id='editSubmit' type='submit' size="sm" onClick={handleSubmitClick}>Submit Edits</Button>
                </form>
            )}
        </div>
    );
};