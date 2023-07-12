import React, { useState } from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/ViewSBOMsAccordian.js';
import styles from './ViewSBOMs.module.css';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import SbomTree from './SbomTree';
import GetSBOMs from '../components/GetSBOMs';

function ViewSBOMs() {
  const [selectedSbomId, setSelectedSbomId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userDesc, setUserDesc] = useState(null);
  const [sbomName, setSbomName] =useState(null)

  const fileInput = useRef();

  const handleButtonClick = () => {
    fileInput.current.click();
  }

  const handleViewClick = (sbomId) => { //used for later, for when we actually know the sbomId
    setSelectedSbomId(sbomId);
  }

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(" ready to fetch ")

    const formData = new FormData(event.target);
    formData.append('file', file);
    formData.append('name', userName);
    formData.append('description', userDesc);

    let errors = {};

    // Perform validation
    if (!userName.trim()) {
      errors.name = 'Name is required';
    }
    if (!userDesc.trim()) {
      errors.description = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, display error messages or handle them accordingly
      console.log('Validation errors:', errors);
    } else { 
      fetch("http://localhost:8080/users/1/sboms", { //dummy user 1 for now
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload the SBOM.');
        }
        console.log("it POSTED ????");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <>
    {/* <div className='page'> */}
      <section id='header'>

          <div id="buttonContainer">
            <input
              type="text"
              value={userName}
              className="buttonInput"
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Enter SBOM Name"
              required
            />
            <input
              type="text"
              value={userDesc}
              className="buttonInput"
              onChange={(event) => setUserDesc(event.target.value)}
              placeholder="Enter SBOM Description"
              required
            />
            <Button variant="primary" id='uploadButton' onClick={handleButtonClick}>Upload New SBOM +</Button>
            <input 
              type="file" 
              style={{ display: 'none' }} 
              ref={fileInput} 
              onChange={handleFileUpload} 
            />
          </div>

        <div id='searchBar'>
            <input 
              className='searchInput'
              type="text"
              placeholder=' Search here'
              onChange={(event) => setSbomName(event.target.value)}
            />
        </div>
        
      </section>
      
    {/* </div> */}

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
        <GetSBOMs sbomName={sbomName}/>
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
