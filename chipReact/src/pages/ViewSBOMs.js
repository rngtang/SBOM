import React, { useState } from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/ViewSBOMsAccordian.js';
import styles from './ViewSBOMs.module.css';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';

function ViewSBOMs() {
  const [error, setError] = useState(null);
  const fileInput = useRef();

  const handleButtonClick = () => {
    fileInput.current.click();
  }

  const handleFileUpload = event => {
    const file = event.target.files[0];
    console.log(file);  // You can process the uploaded file here

    fetch("http://localhost:8080/user/1/sboms", { //dummy user 1 for now
      method: 'POST',
      headers: {
        // 'Content-Type' : 'file'
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to upload the SBOM.');
      }
      // return response.blob();
      console.log(response);
    })
    .then((blob) => {
      console.log(blob);
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  return (
    <>
    <div className='page'>
      <div className='header'>
        <div className='headerRight'>
          <Button variant="primary" id='uploadButton' className={styles.top} onClick={handleButtonClick}>Upload New SBOM +</Button>
          {error && <p>Error: {error}</p>}
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
        <MyAccordian name={'SBOM #1'} type={'CycloneDX'} stat={'HIGH RISK'} meta={'insert data here'} vulnNum={5}/>
        <MyAccordian name={'SBOM #2'} type={'CycloneDX'} stat={'HIGH RISK'} meta={'insert data here'} vulnNum={2}/>
      </div>
    </div>
    
    </>
  );
}

export default ViewSBOMs;
