import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const containerStyles = {
  width: '100%',
  height: '800px',
};

function SbomTree() {
  const [data, setData] = useState(null);
  const { sbomId } = useParams();

  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      setData(result.data);
      console.log(data)
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
