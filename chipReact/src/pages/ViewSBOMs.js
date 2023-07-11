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
  const fileInput = useRef();

  const handleButtonClick = () => {
    fileInput.current.click();
  }

  const handleViewClick = (sbomId) => {
    setSelectedSbomId(sbomId);
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);  // You can process the uploaded file here
    console.log(" ready to fetch ")

    const formData = new FormData();
    formData.append('file', file);

    fetch("http://localhost:8080/users/1/sboms", { //dummy user 1 for now
      method: 'POST',
      body: formData,
      headers: {
        // ContentType: 'application/json'
        // ContentType: 'application/vnd.api+json'
      }
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

  return (
    <>
    <div className='page'>
      <div className='header'>
        <div className='headerRight'>
          <Button variant="primary" id='uploadButton' className={styles.top} onClick={handleButtonClick}>Upload New SBOM +</Button>
          <input 
            type="file" 
            style={{ display: 'none' }} 
            ref={fileInput} 
            onChange={handleFileUpload} 
          />
          <div className='searchBar'>
            <input id='searchInput'
              type="text"
              placeholder=' Search here'
              />
          </div>
        </div>
        
      </div>
      
    </div>
    <div className='mainBody'>
      <div id='sbomHeader'>
        <h5>Your SBOMs</h5>
      </div>
      <div id='sbomList' className={styles.section}>
        <div id='sbomHeadRow'>
          <p>SBOM LIST</p>
          <div id='rowFunct'>
            <p>SBOM TYPE</p>
            <p>STATUS</p>
            <p>VISUALIZATION</p>
            <p>ACTION</p>
          </div>
        </div>
        <GetSBOMs />
        {/* <MyAccordian name={'SBOM #1'} type={'CycloneDX'} stat={'HIGH RISK'} meta={'insert data here'} vulnNum={5}/>
        <MyAccordian name={'SBOM #2'} type={'CycloneDX'} stat={'HIGH RISK'} meta={'insert data here'} vulnNum={2}/> */}
      </div>
    </div>
    
    <>
      <div id='sbomList' className={styles.section}>
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
