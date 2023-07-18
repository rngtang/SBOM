import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { useParams } from 'react-router-dom';
import testTree from './testingtree.json' // make sure the path to your JSON file is correct

const containerStyles = {
  width: '100%',
  height: '800px',
};

function SbomTree() {
  const [data, setData] = useState(null);
  const { sbomId } = useParams();

  useEffect(() => {
    // Set data to testTree instead of fetching from server
    setData(testTree);
  }, []);

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} translate={{ x: 400, y: 200 }} />}
    </div>
  );
}

export default SbomTree;
