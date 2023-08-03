import React, { useState, useRef, useEffect } from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import GetSBOMs from '../components/GetSBOMs';
import ModalBox from '../components/ModalBox';

// someone made great comments for this file already. please come back and finish, thanks! -james :)

// userId is the ID of the user, not the netid
function ViewSBOMs({ userId }) {
  // debugger line
  // console.log("CURRENT USER, from view: ", userId);

  // create states for a lot of things [someone please update this]
  // const [selectedSbomId, setSelectedSbomId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [sbomName, setSbomName] = useState("");
  const [nameMatch, setNameMatch] = useState(false);
  const [trigger, setTrigger] = useState(false);

  // create a state for file input
  const fileInput = useRef();

  // create a handle for button click
  const handleButtonClick = () => {
    // logic to ensure that there is a name and description for the SBOM
    if (userName && userDesc) {
      fileInput.current.click();
      setFormSubmitted(true);
    } else {
      setFormSubmitted(true);
      alert("Please enter both the SBOM name and description.");
    }
  }

  // fetches the names of all sboms with a certain user
  const fetchNames = () => {
    fetch(`http://localhost:8080/users/${userId}/sbom_names`)
      .then((response) => response.json())
      .then((data) => {
        const match = data.some((n) => n === userName);
        if (match) {
          // console.log("matched a name");
          // alert("You need a unique name for your SBOM.");
          setNameMatch(true);
        } else {
          setNameMatch(false);
        }
        // console.log(data);
      })
  }

  const handleFileUpload = (event) => {
    event.preventDefault();
    fetchNames();
    setLoading(true); // Set loading state to true before fetch request
    const formData = new FormData();
    // console.log("preparing to get names");

      const file = event.target.files[0];
      formData.append('file', file);

      if (nameMatch) {
        alert("Your SBOM name must be unique.");
        setLoading(false);
        return;
      } else {
        formData.append('name', userName); // Continue with the file upload or further processing
      }
      formData.append('description', userDesc);
      // console.log(formData);
      fetch((`http://localhost:8080/users/${userId}/sboms`), { 
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("blah" + {response})
          throw new Error('Failed to upload the SBOM.');
        }
        // console.log("it POSTED ????");
        setLoading(false);
        setTrigger(prevTrigger => !prevTrigger); // will toggle getSBOMs useEffect
        return response.json();
      })
      .then((data) => {
      });
      setFormSubmitted(false); //reset
  }

  return (
    <>
      {/* <div className='page'> */}
      <section id='header'>

        <form id="uploadForm" onSubmit={(event) => event.preventDefault()} noValidate >
          <div>
            {fetchNames()}
            <input
              type="text" required
              value={userName}
              className="formInput"
              onChange={(event) => setUserName(event.target.value)}
              placeholder="*Enter SBOM Name"
              style={{
                borderColor: formSubmitted && !userName ? 'red' : '',
              }}
            />
            {/* {nameMatch && (
                <p> <span className="error">*Your name must be unique.</span></p>
              )} */}
            {!userName && formSubmitted && (
              <p> <span className="error">*Please enter name.</span></p>
            )}
          </div>

          <div>
            <input
              type="text" required
              value={userDesc}
              className="formInput"
              onChange={(event) => setUserDesc(event.target.value)}
              placeholder="*Enter SBOM Description"
              style={{
                borderColor: formSubmitted && !userDesc ? 'red' : '',
              }}
            />
            {!userDesc && formSubmitted && (
              <p> <span className="error">*Please enter description.</span></p>
            )}
          </div>

          <Button variant="primary" id='uploadButton' type='submit' onClick={handleButtonClick}>Upload New SBOM +</Button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={handleFileUpload}
          />
        </form>

        {loading && <ModalBox />}

        <div id='searchBar'>
          <input
            className='searchInput'
            type="text"
            placeholder='Search SBOM by name'
            onChange={(event) => setSbomName(event.target.value)}
          />
        </div>

      </section>

      <div className='mainBody'>
        <div id='sbomHeader'>
          <h5>Your SBOMs</h5>
        </div>
        <div id='sbomList' className="list">
          <div id='sbomHeadRow'>
            <p>SBOM LIST</p>
            <div id='rowFunct'>
              <p>SBOM TYPE</p>
              <p id='vizhead'>VISUALIZATION</p>
              <p id='delete'>DELETE</p>
              <p id='update'>UPDATE</p>
            </div>
          </div>

          <GetSBOMs sbomName={sbomName} trigger={trigger} setTrigger={setTrigger} userId={userId} setLoading={setLoading} />

        </div>
      </div>
    </>
  );
}

export default ViewSBOMs;