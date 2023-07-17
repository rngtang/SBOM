import React, { useState, useRef, useEffect } from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/ViewSBOMsAccordian.js';
import styles from './ViewSBOMs.module.css';
import { Button } from 'react-bootstrap';
import SbomTree from './SbomTree';
import GetSBOMs from '../components/GetSBOMs';
import Spinner from 'react-bootstrap/Spinner';

function ViewSBOMs({userId}) {
  console.log("CURRENT USER, from view: ", userId);
  const [selectedSbomId, setSelectedSbomId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userDesc, setUserDesc] = useState(null);
  const [sbomName, setSbomName] = useState(null);
  const [nameMatch, setNameMatch] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fileInput = useRef();

  const handleButtonClick = () => {
    if (userName && userDesc) {
      fileInput.current.click();
      setFormSubmitted(true);
    } else {
      setFormSubmitted(true);
      alert("Please enter both the SBOM name and description.");
    }
  }

  const handleViewClick = (sbomId) => { 
    setSelectedSbomId(sbomId);
  }

  const fetchNames = () => {
    fetch(`http://localhost:8080/users/${userId}/sbom_names`)
        .then((response) => response.json())
        .then((data) => {
          const match = data.some((n) => n === userName);
          if (match) {
            console.log("matched a name");
            // alert("You need a unique name for your SBOM.");
            setNameMatch(true);
          } else {
            setNameMatch(false);
          }
          console.log(data);
        })
  }

  const handleFileUpload = (event) => {
    event.preventDefault();
    fetchNames();
    setLoading(true); // Set loading state to true before fetch request
    const formData = new FormData();
    console.log("preparing to get names");

    setTimeout(() => {
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

      fetch((`http://localhost:8080/users/${userId}/sboms`), { 
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload the SBOM.');
        }
        console.log("it POSTED ????");
        setLoading(false);
        setTrigger(prevTrigger => !prevTrigger); // will toggle getSBOMs useEffect
        return response.json();
      })
      .then((data) => {
      });
      
    setFormSubmitted(false); //reset
    }, 500); // Adjust the delay if needed
  }


  return (
    <>
    {/* <div className='page'> */}
      <section id='header'>

          <form id="buttonContainer" onSubmit = {(event) => event.preventDefault()} noValidate >
            <div>
              {fetchNames()}
              <input
                type="text" required
                value={userName}
                className="buttonInput"
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
                className="buttonInput"
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

        {loading && <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}

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
      <div id='sbomList' className={styles.list}>
        <div id='sbomHeadRow'>
          <p>SBOM LIST</p>
          <div id='rowFunct'>
            <p>SBOM TYPE</p>
            <p>STATUS</p>
            <p>VISUALIZATION</p>
            <p>ACTION</p>
          </div>
        </div>

        <GetSBOMs sbomName={sbomName} trigger={trigger} setTrigger={setTrigger} userId={userId}/>

      </div>
    </div>
    
    <>
      <div id='sbomView' className={styles.section}>
        {/* ...other code... */}
        <button onClick={() => handleViewClick(1)}>View SBOM #1</button>
        <button onClick={() => handleViewClick(2)}>View SBOM #2</button>
      </div>
      {selectedSbomId && <SbomTree sbomId={selectedSbomId} />}
    </>
    </>
  );
}

export default ViewSBOMs;
