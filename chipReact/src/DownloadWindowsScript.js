import React, { useState } from 'react';

export default function DownloadWindowsScript() {
  const [error, setError] = useState(null);
  const [fileurl, setFileurl] = useState(null);

  const handleDownload = () => {
    fetch("http://localhost:8080/scripts/windows", {
      method: 'GET',
      headers: {
        // headers for authorization? 
        'Content-Type': 'application/octet-stream',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        // console.log("this is the response: ", response)
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        console.log(url)
        setFileurl(url);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <a 
        href = {fileurl}
        download = "windows_install.sh"
        // target="_blank" // if target set to blank, opens download in new tab
        rel="noreferrer" // security 
      >
        <button onClick={handleDownload}>Download Windows Script</button>
      </a>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

