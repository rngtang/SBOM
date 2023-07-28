import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import samplejson from './sample.json'
import './custom-tree.css';

const containerStyles = {
  width: '100%',
  height: '800px',
};


function SbomTree() {
  const [data, setData] = useState(null);
  const { sbomId } = useParams(); 
  const [affected, setAffected] = useState(null);

  // get all refs of affected things;
      const fetchAffected = () => {
        fetch(`http://localhost:8080/sboms/${sbomId}/vuln_affected`)
            .then((response) => response.json())
            .then((data) => {
                // console.log("sbom data", data)
                setAffected(data)
            })
    }
  useEffect(() => {
    fetchAffected()}
    );

  const assignDepth = (node, depth = 0) => {
    node.depth = depth;
    if (node.children) {
      node.children.forEach(child => assignDepth(child, depth + 1));
    }
  };

  const getColorByDepth = (depth) => {
    switch (depth) {
      case 0:
        return '#565676';
      case 1:
        return '#A76571';
      case 2:
        return '#C38D94';
      default:
        return '#ee6c4d';
    }
  };
  
  // const vulnRed = ({ source, target }, orientation) => {
  //   // console.log(target.data.name)
  //   if (affected){
  //     for (let i = 0; i < affected.length; i++) {
  //       if (affected[i].includes(target.data.name)){
  //         console.log(affected[i].includes(target.data.name))
  //         return 'vuln';
  //       }
  //     }
  //   }
    
  // }

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
    if (affected){
      for (let i = 0; i < affected.length; i++) {
        if (affected[i].includes(nodeDatum.name)){
          // console.log(affected[i].includes(nodeDatum.name))
          // console.log(affected[i] + " " + nodeDatum.name)
          return (
            <g>
              {/* , stroke: '#ff0000', 'stroke-width': 5  */}
              <circle r={85} style={{ fill: '#ff0000'}} onClick={toggleNode} />
              <foreignObject x="-60" y="-35" width="120" height="80">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '2px', border: '1px solid black' }}>
                  <span style={{ fontSize: '20px', fontFamily: 'Times New Roman' }}>{nodeDatum.name}</span>
                </div>
              </foreignObject>
            </g>
          )
        }
      }
    }
    return (
    <g>
      <circle r={85} style={{ fill: getColorByDepth(nodeDatum.depth) }} onClick={toggleNode} />
      <foreignObject x="-60" y="-35" width="120" height="80">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '2px', border: '1px solid black' }}>
          <span style={{ fontSize: '20px', fontFamily: 'Times New Roman' }}>{nodeDatum.name}</span>
        </div>
      </foreignObject>
    </g>
  )};  


  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      //const result = samplejson;
      const treeData = result.data;
      assignDepth(treeData);
      setData(treeData);
    };
    fetchTreeData();
  }, [sbomId]);

  return (
    <div style={containerStyles}>
      {data && <Tree data={data} translate={{ x: 400, y: 200 }} separation={{ siblings: 1.5, nonSiblings: 3 }} depthFactor={800} renderCustomNodeElement={renderCustomNodeElement} pathFunc='disjointelbow' />} {/* Increase the depthFactor here */}

    </div>
  );
}

export default SbomTree;
