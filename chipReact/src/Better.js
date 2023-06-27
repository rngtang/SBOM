import React, { useState } from 'react';

export default function Better() {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    fetch("https://www.anapioficeandfire.com/api/books", {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/octet-stream',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        return response.blob();
      })
      .then((blob) => {
        const scriptUrl = URL.createObjectURL(blob);
        setUrl(scriptUrl);

        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        document.body.appendChild(scriptElement);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
        <a href = {"http:localhost:3000"} download="file_name" target = '_blank'>
            <button onClick={handleDownload}>Download and Run Script</button>
        </a>
     
      {url && (
        <p>Script downloaded and running: {url}</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

