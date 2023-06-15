import React, { useState } from 'react';

    const SendJSON = () => {
      const [jsonFile, setJsonFile] = useState();

      const fileChangeHandler = event => {
        setJsonFile(event.target.files[0]);
      };

      const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append('file', jsonFile);

        fetch('http://localhost:3000/upload_json', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            console.log('File uploaded successfully');
          } else {
            console.error(`Error: ${data.message}`);
          }
        });
      };

      return (
        <div>
        <input type="file" onChange={fileChangeHandler} />
        <button onClick={fileUploadHandler}>Upload</button>
        </div>
      );
    };

    export default SendJSON;
