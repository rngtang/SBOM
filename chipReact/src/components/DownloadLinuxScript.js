import React, { useState } from 'react';
import styles from '../pages/GenerateSBOMs.module.css';

export default function DownloadLinuxScript() {
  // create a state for catching an error (for display purposes)
  const [error, setError] = useState(null);
  // create a state for routing the file URL, as if it is a pseudo end point
  const [fileurl, setFileurl] = useState(null);

  const handleDownload = () => {
    // hit endpoint to fetch script 
    fetch("http://localhost:8080/scripts/linux", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-sh',
      },
    })
      .then((response) => {
        // catch errors
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        return response.blob();
      })
      .then((blob) => {
        // create file URL, as if it is a pseudo end point
        const url = URL.createObjectURL(blob);
        // debugger line
        // console.log(url);
        setFileurl(url);

        /// download it
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `linux_install.sh`,
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
        // href={fileurl}
        // download="linux_install.sh"
        // // if target set to blank, opens download in new tab
        // // target="_blank"
        // rel="noreferrer" // security line
      >
        <button onClick={handleDownload} className={styles.button}>DOWNLOAD LINUX SCRIPT</button>
      </a>
      {error && <p style={{ color: 'red' }}>ERROR: {error}</p>}
    </div>
  );
};