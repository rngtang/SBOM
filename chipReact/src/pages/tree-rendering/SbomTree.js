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

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={45} style={{ fill: '#B0E0E6' }} onClick={toggleNode} />
      <foreignObject x="-60" y="-15" width="300" height="30"> {/* Adjust the dimensions here */}
        <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '2px', border: '1px solid black' }}> {/* Add a border here */}
          <span>{nodeDatum.name}</span>
        </div>
      </foreignObject>
    </g>
  );

  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      setData(result.data);
    };
    fetchTreeData();
  }, [sbomId]);

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} translate={{ x: 400, y: 200 }} separation={{ siblings: 1.3, nonSiblings: 2 }} depthFactor={800} renderCustomNodeElement={renderCustomNodeElement} pathFunc='elbow' />} {/* Increase the depthFactor here */}

    </div>
  );
}

export default SbomTree;
