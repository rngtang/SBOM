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
  const [sbomName, setSbomName] = useState(null)

  const fileInput = useRef();

  const handleButtonClick = () => {
    if (userName && userDesc) {
      fileInput.current.click();
    } else {
      alert("Please enter both the SBOM name and description.");
    }
  }

  const handleViewClick = (sbomId) => { //used for later, for when we actually know the sbomId
    setSelectedSbomId(sbomId);
  }

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(" ready to fetch ")

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', userName);
    formData.append('description', userDesc);

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

  return (
    <>
    <div className='page'>
      <section id='header'>

          <form id="buttonContainer" onSubmit={(event) => event.preventDefault()}>
            <div>
              <input
                type="text" required
                value={userName}
                className="buttonInput"
                onChange={(event) => setUserName(event.target.value)}
                placeholder="Enter SBOM Name"
                style={{
                  borderColor: userName ? '' : 'red',
                }}
              />
              {!userName && <p><span className={styles.error}>Please enter the SBOM name.</span></p>}
            </div>

            <div>
              <input
                type="text" required
                value={userDesc}
                className="buttonInput"
                onChange={(event) => setUserDesc(event.target.value)}
                placeholder="Enter SBOM Description"
                style={{
                  borderColor: userName ? '' : 'red',
                }}
              />
              {!userDesc && <p><span className={styles.error}>Please enter the SBOM description.</span></p>}
            </div>
            
            <Button variant="primary" id='uploadButton' type='submit' onClick={handleButtonClick}>Upload New SBOM +</Button>
            <input 
              type="file" 
              style={{ display: 'none' }} 
              ref={fileInput} 
              onChange={handleFileUpload} 
            />
          </form>

        <div id='searchBar'>
            <input 
              className='searchInput'
              type="text"
              placeholder='Search SBOM by name'
              onChange={(event) => setSbomName(event.target.value)}
            />
        </div>
        
      </section>
      
    </div>

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
