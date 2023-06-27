import React, { useState } from 'react';

export default function Better() {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    fetch("http://localhost:8080/scripts/download", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        console.log("this is the response: ", response)
        return response.blob();
      })
      .then((blob) => {
        const scriptElement = document.createElement('script');
        // scriptElement.src = URL.createObjectURL(blob);
        // document.body.appendChild(scriptElement);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
        <a href = {"http://localhost:8080/scripts/download"} download="linux_install">
            <button onClick={handleDownload}>Download Script</button>
        </a>
     
      {url && <p>Script downloaded: {url}</p>}
      {error && <p>Error: {error}</p>}
      
    </div>
  );
};

