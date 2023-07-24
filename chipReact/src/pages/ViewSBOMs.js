import React, { useState, useRef, useEffect } from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/ViewSBOMsAccordian.js';
import styles from './ViewSBOMs.module.css';
import { Button } from 'react-bootstrap';
import TreeTest from './tree-rendering/TreeTest';
import GetSBOMs from '../components/GetSBOMs';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function ViewSBOMs({ userId }) {
  const [selectedSbomId, setSelectedSbomId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userDesc, setUserDesc] = useState(null);
  const [sbomName, setSbomName] = useState(null);
  const [vulnID, setVulnID] = useState(null);
  const [nameMatch, setNameMatch] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fileInput = useRef();
  const navigate = useNavigate();

  // Handle upload button click
  const handleButtonClick = () => {
    if (userName && userDesc) {
      fileInput.current.click();
      setFormSubmitted(true);
    } else {
      setFormSubmitted(true);
      alert("Please enter both the SBOM name and description.");
    }
  }

  const handleViewClick = (id) => {
    navigate(`/treetest/${id}`);
  }

  // Fetch names
  const fetchNames = () => {
    fetch(`http://localhost:8080/users/${userId}/sbom_names`)
      .then((response) => response.json())
      .then((data) => {
        const match = data.some((n) => n === userName);
        if (match) {
          setNameMatch(true);
        } else {
          setNameMatch(false);
        }
      })
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    event.preventDefault();
    fetchNames();
    setLoading(true);
    const formData = new FormData();

    setTimeout(() => {
      const file = event.target.files[0];
      formData.append('file', file);

      if (nameMatch) {
        alert("Your SBOM name must be unique.");
        setLoading(false);
        return;
      } else {
        formData.append('name', userName);
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
          setLoading(false);
          setTrigger(prevTrigger => !prevTrigger);
          return response.json();
        })

      setFormSubmitted(false);
    }, 500);
  }

  return (
    <>
      <section id='header'>
        <form id="buttonContainer" onSubmit={(event) => event.preventDefault()} noValidate >
          <div>
            <input
              type="text" required
              value={userName}
              className="buttonInput"
              onChange={(event) => setUserName(event.target.value)}
              placeholder="*Enter SBOM Name"
              style={{ borderColor: formSubmitted && !userName ? 'red' : '' }}
            />
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
              style={{ borderColor: formSubmitted && !userDesc ? 'red' : '' }}
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
            placeholder='Search SBOM by vulnerability ID'
            onChange={(event) => setVulnID(event.target.value)}
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
              <p id='vizhead'>VISUALIZATION</p>
              <p id='delete'>DELETE</p>
              <p id='update'>UPDATE</p>
            </div>
          </div>
          <GetSBOMs sbomName={sbomName} vulnID={vulnID} trigger={trigger} setTrigger={setTrigger} userId={userId} setLoading={setLoading} />
        </div>
      </div>
    </>
  );
}

export default ViewSBOMs;
