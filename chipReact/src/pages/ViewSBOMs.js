import React from 'react';
import './ViewSBOMs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/MyAccordian.js';
import styles from './GenerateSBOMs.module.css';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';

function ViewSBOMs() {
  const fileInput = useRef();

  const handleButtonClick = () => {
    fileInput.current.click();
  }

  const handleFileUpload = event => {
    const file = event.target.files[0];
    console.log(file);  // You can process the uploaded file here
  }

  return (
    <>
    <div className='page'>
      <div className='header'>
        <p>Home</p>
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
        
        <MyAccordian name={'SBOM #1'} meta={'this was imported from idk'}/>
        <MyAccordian name={'SBOM #2'} meta={'bruh i dont even know'}/>
      </div>
    </div>
    
    </>
  );
}

export default ViewSBOMs;
