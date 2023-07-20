import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';

// comments are spotty on this one because i don't know everything -james

// userId is the ID of the user, not the netid
// sbomId is the [] ID of the SBOM
// trigger [i dont knowwww]
// name is name of the SBOM
// description is the description of the SBOM
export default function UpdateButton({ userId, sbomId, trigger, setTrigger, name, description }) {
  // debugger line
  console.log({ sbomId })
  // create states for user file upload and archive route
  const fileInput = useRef();
  const archiveUrl = `http://localhost:8080/sboms/${sbomId}/archive`

  // debugger line, was a previously used route
  // const currentSbom = `http://localhost:8080/sboms/${sbomId}`

  // create a handle to upload SBOMs
  const handleFileUpload = (e) => {
    // Set loading state to true before fetch request
    // setLoading(true);

    // prevent empty inputs

    e.preventDefault();

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
          return fetch(archiveUrl)
        })
      // fetch(archiveUrl)          
      // setFormSubmitted(false); //reset
    }, 500); // Adjust the delay if needed
  }

  // create a handle for clicking on button
  const handleButtonClick = (e) => {
    e.stopPropagation()
    e.preventDefault()

    
    fileInput.current?.click();

    // safety net dialogue
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
      />
    </div>
  );
};