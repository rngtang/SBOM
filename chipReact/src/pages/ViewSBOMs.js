import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccordian from '../components/MyAccordian.js';
import styles from './GenerateSBOMs.module.css';

function ViewSBOMs() {
  return (
  <div className={styles.section}>
    <MyAccordian name={'SBOM #1'} meta={'this was imported from idk'}/>
    <MyAccordian name={'SBOM #2'} meta={'bruh i dont even know'}/>
  </div>
  );
}

export default ViewSBOMs;