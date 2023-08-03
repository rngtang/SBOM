import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import samplejson from './sample.json'
import './custom-tree.css';
import styles from '../Vulnerability.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ModalTree from '../../components/ModalTree';


const containerStyles = {
  width: '100%',
  height: '800px'
};


function SbomTree() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { sbomId } = useParams();
  const [affected, setAffected] = useState(null);
  const [sbomName, setSbomName] = useState("");
  const [sbomDesc, setSbomDesc] = useState("");
  const [showModal, setShowModal] = useState(true);


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
    fetchAffected()
  }, []
  );

  const fetchSbom = () => {
    fetch(`http://localhost:8080/sboms/${sbomId}/namedesc`)
      .then((response) => response.json())
      .then((data) => {
        setSbomName(data[0])
        setSbomDesc(data[1])
      })
  }
  useEffect(() => {
    fetchSbom()
  }, [sbomId]);


  const assignDepth = (node, depth = 0) => {
    node.depth = depth;
    if (node.children) {
      node.children.forEach(child => assignDepth(child, depth + 1));
    }
  };

  // const getColorByDepth = (depth) => {
  //   switch (depth) {
  //     case 0:
  //       return '#565676';
  //     case 1:
  //       return '#A76571';
  //     case 2:
  //       return '#C38D94';
  //     default:
  //       return '#ee6c4d';
  //   }
  // };

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
              <text class="rd3t-label__title" text-anchor="start" x="40">{nodeDatum.name}</text>
              {/* <foreignObject x="-60" y="-35" width="120" height="80">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '2px', border: '1px solid black' }}>
                  <span style={{ fontSize: '20px', fontFamily: 'Times New Roman' }}>{nodeDatum.name}</span>
                </div>
              </foreignObject> */}
            </g>
          )
        }
      }
    }
    return (
    <g>
      <circle r={85} style={{  }} onClick={toggleNode} />
      <text class="rd3t-label__title" text-anchor="start" x="40">{nodeDatum.name}</text>
      {/* <foreignObject x="-60" y="-35" width="120" height="80">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '2px', border: '1px solid black' }}>
          <span style={{ fontSize: '20px', fontFamily: 'Times New Roman' }}>{nodeDatum.name}</span>
        </div>
      </foreignObject> */}
    </g>
  )};  


  useEffect(() => {
    const fetchTreeData = async () => {
      const result = await axios(`http://localhost:8080/sboms/${sbomId}/dependencies_tree`);
      //const result = samplejson;
      const treeData = result.data;
      assignDepth(treeData);
      setData(treeData);
      // const dataWithCollapsedFlag = addCollapsedFlag(result.data);
      // setData(dataWithCollapsedFlag);
    };
    fetchTreeData();
  }, [sbomId]);

  const handleButtonClick = () => {
    navigate('/viewsboms');
  }
  //   const addCollapsedFlag = (node, level = 0) => {
  //   return {
  //     ...node,
  //     collapsed: level > 0, // set collapsed to true for all nodes except the root
  //     children: node.children.map(child => addCollapsedFlag(child, level + 1))
  //   };
  // };

  const treeConfig = {
    enableLegacyTransitions: true,
    separation: { siblings: 0.35, nonSiblings: 0.35 },
    shouldCollapseNeighborNodes: true,
    scaleExtent: { min: 0.25, max: 0.75 },
    nodeSize: { x: 340, y: 140 },
    initialDepth: 1,
    translate: { x: 100, y: 400 },
    zoom: 0.75,
    dimensions: { height: 800, width: 400 },
    renderCustomNodeElement: renderCustomNodeElement
  };


  return (
    <>
      <div className={styles.header}>
        <Button type='submit' className={styles.button} onClick={handleButtonClick}>
          &#8592; Go back to all SBOMs
        </Button>
        <div className={styles.namedesc}>
          <p><strong>SBOM Name: </strong> {sbomName}</p>
          <p><strong>SBOM Description: </strong> {sbomDesc}</p>
        </div>
      </div>
      <div style={containerStyles}>
        {/* {data && <Tree data={data} translate={{ x: 400, y: 200 }} separation={{ siblings: 1.25, nonSiblings: 2 }} depthFactor={900} renderCustomNodeElement={renderCustomNodeElement} pathFunc='diagonal' dimensions={{height:0,width:0}} />} Increase the depthFactor here */}
        {data && <Tree data={data} {...treeConfig} />}
      </div>
      <ModalTree
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>


    // return (
    //   <div style={containerStyles}>
    //     {data && <Tree data={data} translate={{ x: 400, y: 200 }} generateNodeProps={generateNodeProps} />}
    //   </div>
  );
}

export default SbomTree;
