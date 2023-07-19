import React from 'react';
import Tree from 'react-d3-tree';
import { useParams } from 'react-router-dom';
import testTree from './testing.json'; // make sure the path to your JSON file is correct
import './custom-tree.css';
import VulnSidebar from './VulnSidebar';

const containerStyles = {
  width: '80%',
  height: '800px',
};

function calculateDepth(node, depth = 0) {
  node.depth = depth;
  if (node.children) {
    node.children.forEach((child) => calculateDepth(child, depth + 1));
  }
}

function SbomTree() {
  const { id } = useParams();
  
  calculateDepth(testTree);
  return (
    <div style={containerStyles}>
      <Tree
        data={testTree}
        translate={{ x: 50, y: 400 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch-2"
        leafNodeClassName="node__leaf"
      />
      <VulnSidebar />
    </div>
  );
}

export default SbomTree;

/*Axios functional code below:

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

  const generateNodeProps = () => {
    return {
      circleProps: { 
        r: 10, 
        fill: 'blue'
      }
    };
  };
  

  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      setData(result.data);
    };
    fetchTreeData();
  }, [sbomId]);

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} translate={{ x: 400, y: 200 }} generateNodeProps={generateNodeProps} /> }
      
    </div>
  );
}

export default SbomTree;
*/