import React from 'react';
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
      <Button variant="primary" className={styles.top} onClick={handleButtonClick}>Upload File</Button>
      <input 
        type="file" 
        style={{ display: 'none' }} 
        ref={fileInput} 
        onChange={handleFileUpload} 
      />
    </div>
    <div className={styles.section}>
      
      <MyAccordian name={'SBOM #1'} meta={'this was imported from idk'}/>
      <MyAccordian name={'SBOM #2'} meta={'bruh i dont even know'}/>
    </div>
    </>
  );
}

export default ViewSBOMs;
