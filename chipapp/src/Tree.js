import React from 'react';
import { Tree as D3Tree } from 'react-d3-tree';
import importData from './data.json';

const Tree = () => {

  const treeConfig = {
    enableLegacyTransitions: true,
    separation: { siblings: 0.75, nonSiblings: 0.75 },
    dimensions: { height: 500, width: 500 }
    // the dimensions are kinda hard coded lol
  };

  return (
    <div style={{ width: '100%', height: '650px' }}>
      <D3Tree data={importData} {...treeConfig} />
    </div>
  );
};

export default Tree;
