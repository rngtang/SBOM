import React, { useEffect } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

function SbomTree() {
  useEffect(() => {
    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: '@testing-library/jest-dom' },
      { id: 2, label: '@testing-library/react' },
      { id: 3, label: '@testing-library/user-event' },
      { id: 4, label: 'react' },
      { id: 5, label: 'react-dom' },
      { id: 6, label: 'react-scripts' },
      { id: 7, label: 'web-vitals' }
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 1, to: 6 },
      { from: 1, to: 7 },
      { from: 2, to: 7 }
    ]);

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {};
    new Network(container, data, options);
  }, []);

  return (
    <div id="mynetwork" style={{ width: '800px', height: '400px' }}></div>
  );
}

export default SbomTree;
