import React, { useState } from 'react';

export default function Button() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
            console.log("data response: ", data)
          // Handle the response if needed
        })
        .catch((error) => {
          // Handle any errors
          console.log(error)
        });
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Create SBOM</button>
      </div>
    );
};
