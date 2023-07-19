import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';

// bro can't we import this from css or smth
const containerStyles = {
  width: '100%',
  height: '800px',
};

// sbomId is the ID of the SBOM
function SbomTree({ sbomId }) {
  // set a state for capturing the SBOM
  const [data, setData] = useState(null);

  // no idea how to explain this []
  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      setData(result.data);
    };
    fetchTreeData();
  }, [sbomId]);

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} />}
    </div>
  );
}

export default SbomTree;