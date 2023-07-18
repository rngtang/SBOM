import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';


export default function UpdateButton({userId, sbomId, trigger, setTrigger, name, description}) {
    console.log({sbomId})
    const fileInput = useRef();
    const archiveUrl=`http://localhost:8080/sboms/${sbomId}/archive`

    // const currentSbom = `http://localhost:8080/sboms/${sbomId}`
    const handleFileUpload = (e) => {
        // setLoading(true); // Set loading state to true before fetch request
        e.preventDefault();
        console.log({sbomId})
        const formData = new FormData();
        setTimeout(() => {
          const file = e.target.files[0];
          formData.append('file', file);
          formData.append('name', name); // Continue with the file upload or further processing
          formData.append('description', description);
    
          fetch(`http://localhost:8080/users/${userId}sboms`, { //dummy user 1 for now
            method: 'POST',
            body: formData
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to upload the SBOM.');
            }
            console.log("it POSTED ????");
            // setLoading(false);
            setTrigger(prevTrigger => !prevTrigger); // will toggle getSBOMs useEffect
            response.json();
            
          })
          .then((data) => {
            console.log(archiveUrl)
            return fetch(archiveUrl)
          })
        //   fetch(archiveUrl)          
        // setFormSubmitted(false); //reset
        }, 500); // Adjust the delay if needed
      }
    const handleButtonClick = (e) => {
        e.stopPropagation()
        fileInput.current?.click();

        // e.preventDefault()
        // console.log(trigger)
        // if(window.confirm("Are you sure you want to delete this SBOM forever?")){
        //     fetch(archiveUrl)
        //     .then(console.log({sbomId}))
        //     .then(setTrigger(prevTrigger => !prevTrigger))
        //     .then(console.log({trigger}))
        
    }

    return (
        <div>
            <Button variant="outline-primary" id='updateButton' type='submit' size="sm" onClick={handleButtonClick}>
            Update SBOM
            </Button>
            <input 
              ref={fileInput}
              type="file" 
              style={{ display: 'none' }} 
            //   ref={fileInput} 
              onChange={handleFileUpload} 
            />
        </div>
        
      )
}