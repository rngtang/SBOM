import React from 'react';
import Tree from 'react-d3-tree';
import { useParams } from 'react-router-dom';
import testTree from './testing.json'; // make sure the path to your JSON file is correct
import './custom-tree.css';

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

function TreeTest() {
  const { id } = useParams();
  
  calculateDepth(testTree);
  return (
    <div style={containerStyles}>
      <Tree
        data={testTree}
        translate={{ x: 400, y: 200 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch-2"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
}

export default TreeTest;

