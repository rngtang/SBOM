import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';

const containerStyles = {
  width: '100%',
  height: '800px',
};

function SbomTree({ sbomId }) {
  const [data, setData] = useState(null);

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
