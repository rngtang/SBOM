import React, { useState } from 'react';
import styles from '../pages/GenerateSBOMs.module.css'; // import CSS filed

export default function DownloadLinuxScript() {
  // create a state for catching an error (for display purposes)
  const [error, setError] = useState(null);
  // create a state for routing the file URL, as if it is a pseudo end point
  const [fileurl, setFileurl] = useState(null);

  const handleDownload = () => {
    // hit endpoint to fetch script 
    fetch("http://localhost:8080/scripts/mac", {
      method: 'GET',
      headers: {
        // headers for authorization? 
        'Content-Type': 'application/x-sh',
      },
    })
      .then((response) => {
        // catch errors
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        // console.log("this is the response: ", response)
        return response.blob();
      })
      .then((blob) => {
        // create file URL, as if it is a pseudo end point
        const url = URL.createObjectURL(blob);
        // console.log(url)
        setFileurl(url);

        /// download it
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `mac_install.sh`,
        );
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);

      })
      // throw errors
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <a 
        // href = {fileurl}
        // download = "mac_install.sh"
        // // target="_blank" // if target set to blank, opens download in new tab
        // rel="noreferrer" // security 
      >
        <button onClick={handleDownload} className={styles.button}>DOWNLOAD MAC SCRIPT</button>
      </a>
      {error && <p style={{color: 'red'}}>ERROR: {error}</p>}
    </div>
  );
};

