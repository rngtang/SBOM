import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';

// comments are spotty on this one because i don't know everything -james

// userId is the ID of the user, not the netid
// sbomId is the [] ID of the SBOM
// trigger [rerenders components when boolean is changed]
// name is name of the SBOM
// description is the description of the SBOM


export default function UpdateButton({ userId, sbomId, trigger, setTrigger, name, description, setLoading }) {
  // debugger line
  // console.log({ sbomId })
  // create states for user file upload and archive route
  const fileInput = useRef();
  const archiveUrl = `http://localhost:8080/sboms/${sbomId}/archive`

  // debugger line, was a previously used route
  // const currentSbom = `http://localhost:8080/sboms/${sbomId}`

  // create a handle to upload SBOMs
  const handleFileUpload = (e) => {
    // Set loading state to true before fetch request
    // setLoading(true);

    console.log("file upload triggered")

    // prevent empty inputs

    e.preventDefault();
    setLoading(true);
    //debugger line
    // console.log({ sbomId })

    // create a state for form data
    const formData = new FormData();
    // 

    setTimeout(() => {
      const file = e.target.files[0];
      formData.append('file', file);
      formData.append('name', name); // Continue with the file upload or further processing
      formData.append('description', description);

      fetch(`http://localhost:8080/users/${userId}/sboms`, { //dummy user 1 for now
        method: 'POST',
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to upload the SBOM.');
          }
          console.log("it POSTED ????");
          // setLoading(false);

          // toggle getSBOMs useEffect
          setTrigger(prevTrigger => !prevTrigger);

          // turn response into json file
          response.json();
        })

        // return data
        .then((data) => {
          // debugger line
          // console.log(archiveUrl)

          // return archive route
          return (fetch(archiveUrl)
          .then(setLoading(false)))
        })
      // fetch(archiveUrl)          
      // setFormSubmitted(false); //reset
    }, 500); // Adjust the delay if needed
  }
  
  // create a handle for clicking on button
  const handleButtonClick = (e) => {
    // prevents toggle of accordion on button click
    e.stopPropagation()
    e.preventDefault()
    console.log("button clicked")
    //opens fileinput box
    fileInput.current?.click();
  }

  return (
    <div>
      {/* update SBOM button */}
      <Button variant="outline-primary" id='updateButton' type='submit' size="sm" onClick={handleButtonClick}>
        Update SBOM
      </Button>

      {/* handle upload input */}
      <input
        ref={fileInput}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        // prevents toggle of accordion on button click
        onClick={(e)=>{
          e.stopPropagation();
        }}
      />
    </div>
  );
};