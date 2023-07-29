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

  const generateNodeProps = (nodeData) => {
    return {
      circleProps: { 
        r: 10, 
        fill: nodeData.node.collapsed ? 'red' : 'blue'
      },
      onClick: (_, nodeData) => {
        nodeData.node.collapsed = !nodeData.node.collapsed;
        setData({...data});
      },
    };
  };

  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      const dataWithCollapsedFlag = addCollapsedFlag(result.data);
      setData(dataWithCollapsedFlag);
    };
    fetchTreeData();
  }, [sbomId]);

  const addCollapsedFlag = (node, level = 0) => {
    return {
      ...node,
      collapsed: level > 0, // set collapsed to true for all nodes except the root
      children: node.children.map(child => addCollapsedFlag(child, level + 1))
    };
  };

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} translate={{ x: 400, y: 200 }} generateNodeProps={generateNodeProps} />}
    </div>
  );
}

export default SbomTree;
