import React, { useEffect, useRef, useState } from 'react';
import { Tree } from 'react-d3-tree';

const CycloneDXVisualization = () => {
  const svgRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the CycloneDX JSON data
    fetch('./cyclonedex.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching CycloneDX data:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {data && (
        <Tree
          data={data}
          translate={{ x: 50, y: 50 }} // Adjust the translation as needed
          nodeSize={{ x: 150, y: 100 }} // Adjust the node size as needed
          separation={{ siblings: 1.5, nonSiblings: 2.5 }} // Adjust the node separation as needed
          orientation="vertical"
          transitionDuration={0}
          zoom={0.8} // Adjust the zoom level as needed
          styles={{
            links: { stroke: '#ccc' }, // Adjust the link color as needed
            nodes: { node: { circle: { fill: 'steelblue' } } }, // Adjust the node color as needed
          }}
        />
      )}
    </div>
  );
};

export default CycloneDXVisualization;
