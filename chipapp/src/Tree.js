import React from 'react';
import { Tree as D3Tree } from 'react-d3-tree';

const data = {
  name: 'Root',
  children: [
    {
      name: 'Node 1',
      children: [
        { name: 'Node 1.1' },
        { name: 'Node 1.2' },
        { name: 'Node 1.3' },
      ],
    },
    {
      name: 'Node 2',
      children: [
        { name: 'Node 2.1' },
        { name: 'Node 2.2' },
      ],
    },
  ],
};

const Tree = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <D3Tree data={data} />
    </div>
  );
};

export default Tree;
