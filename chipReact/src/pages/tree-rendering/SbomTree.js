import React from 'react';
// import Tree from 'react-d3-tree';
import { Tree as D3Tree } from 'react-d3-tree';
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

const treeConfig = {
  enableLegacyTransitions: true,
  separation: { siblings: 0.75, nonSiblings: 0.75 },
  // center on click
  // width is left to right inc
  // height is up to down inc
  dimensions: { height: 800, width: 100 },
  // center on load
  translate: { x: 50, y: 400 }
};

function SbomTree() {
  const { id } = useParams();

  calculateDepth(testTree);
  return (
    <div style={containerStyles}>
      {/* <Tree
        data={testTree}
        translate={{ x: 50, y: 400 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch-2"
        leafNodeClassName="node__leaf"
      /> */}
      <D3Tree data={testTree} {...treeConfig} />
      <VulnSidebar />
    </div>
  );
}

export default SbomTree;

////code from branch 6
/*

import React, { useEffect, useState } from 'react';
import { Tree as D3Tree } from 'react-d3-tree';
import importData from './data.json';

const Tree = () => {
  const treeConfig = {
    enableLegacyTransitions: true,
    separation: { siblings: 0.75, nonSiblings: 0.75 },
    dimensions: { height: 500, width: 500 }
    // the dimensions are kinda hard coded lol
  };
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const convertedData = {
      name: 'root',
      children: importData.components.map((component) => ({
        name: component.name,
        attributes: component.licenses.map((license) => ({
          name: license.name,
        })),
      })),
    };

    setTreeData(convertedData);
  }, []);

  return (<div style={{ width: '100%', height: '650px' }}>
    <D3Tree data={treeData} {...treeConfig} />
  </div>);
};

export default Tree;

*/
////


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