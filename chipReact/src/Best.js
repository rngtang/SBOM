import React from 'react';

export default function Best() {
  const handleDownloadAndExecute = () => {
    fetch('http://localhost:8080/scripts/download') // Replace with your Rails endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to download the script.');
        }
        return response.text();
      })
      .then((scriptContent) => {
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/x-sh';
        scriptElement.onload = () => {
          // Script has been successfully loaded and executed
          console.log('Shell script has been executed.');
        } 
        document.body.appendChild(scriptElement);
        console.log(scriptContent);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
        <a href="http://localhost:8080/scripts/download" download="linux_install.sh">

        </a>
      <button onClick={handleDownloadAndExecute}>Download and Execute Script</button>
    </div>
  );
};
