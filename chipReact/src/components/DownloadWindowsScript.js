import React, { useState } from 'react';
import styles from '../pages/GenerateSBOMs.module.css'; // import CSS file

export default function DownloadWindowsScript() {
  const [error, setError] = useState(null);
  const [fileurl, setFileurl] = useState(null);

  const handleDownload = () => {
    fetch("http://localhost:8080/scripts/windows", {
      method: 'GET',
      headers: {
        // headers for authorization? 
        'Content-Type': 'application/x-powershell',
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
        download = "windows_install.ps1"
        // target="_blank" // if target set to blank, opens download in new tab
        rel="noreferrer" // security 
      >
        <button onClick={handleDownload} className={styles.button}>DOWNLOAD WINDOWS SCRIPT</button>
      </a>
      {error && <p style={{color: 'red'}}>ERROR: {error}</p>}
    </div>
  );
};

