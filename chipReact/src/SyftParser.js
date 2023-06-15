import React, { useEffect, useState } from 'react';

const SyftParser = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Function to fetch and parse the Syft JSON file
    const fetchSyftData = async () => {
      try {
        const response = await fetch('/syft.json');
        const data = await response.json();
        setComponents(data.components);
      } catch (error) {
        console.error('Error fetching Syft data:', error);
      }
    };

    fetchSyftData();
  }, []);

  return (
    <div>
      <h1>Syft Components</h1>
      {components.map((component, index) => (
        <div key={index}>
          <h2>{component.name}</h2>
          <p>Version: {component.version}</p>
          <p>Type: {component.type}</p>
          {/* Add more details to display as needed */}
        </div>
      ))}
    </div>
  );
};

export default SyftParser;
