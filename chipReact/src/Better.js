import React, { useState } from 'react';

export default function Better() {
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
        // console.log("this is the response: ", response)
        return response.blob();
      })
      .then((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'linux_install.sh'; 
        link.click();
        URL.revokeObjectURL(fileUrl);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Script</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

