import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import samplejson from './sample.json'
import './custom-tree.css';
import  styles from '../Vulnerability.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ModalTree from '../../components/ModalTree';


const containerStyles = {
  width: '100%',
  height: '800px',
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


  return (
    <>
      <div className={styles.header}>
            <Button type='submit'className={styles.button} onClick={handleButtonClick}>
                &#8592; Go back to all SBOMs 
            </Button>
            <div className={styles.namedesc}>
                <p><strong>SBOM Name: </strong> {sbomName}</p>
                <p><strong>SBOM Description: </strong> {sbomDesc}</p>
            </div>
        </div>
      <div style={containerStyles}>
        {data && <Tree data={data} translate={{ x: 400, y: 200 }} separation={{ siblings: 1.5, nonSiblings: 3 }} depthFactor={800} renderCustomNodeElement={renderCustomNodeElement} pathFunc='disjointelbow' />} {/* Increase the depthFactor here */}
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
