import React from 'react';
import styles from './GenerateSBOMs.module.css';
import headerImage from '../images/header-1.png';

const Intro = () => {
    return (
        <div className={styles.section}>
            <h1>Centralized Hub for Inventories Platform</h1>
            <p>A simple way to create and consume SBOMs</p>
        </div>
    );
};

const WhatAreSBOMs = () => {
    return (
        <div className={styles.section}>
            <h3>What are SBOMs?</h3>
            <p>
                A Software Bill of Materials (SBOM) is a formal record of all software packages and components used by a software project or machine.
                These components can be commercial or open-source, and in turn rely on other components themselves. This creates a series of reliances, or a chain of dependencies, that is not easily visible to the creator or user of the main project.
            </p>
        </div>
    );
};

const OurProject = () => {
    return (
        <div className={styles.section}>
            <h3>Our Project</h3>
            <p>
                Our team, composed of students from Duke University, is working in collaboration with Duke's Information Technology Security Office (ITSO) to explore the most active open-source projects in the SBOM and supply chain security space. We aim to develop a user-friendly interface that makes it easy for development teams at Duke to gather and share this information.
            </p>
            
        </div>
    );
};

const CyberSecurityRealWorld = () => {
    return (
        <div className={styles.section}>
            <h3>Cybersecurity in the Real World</h3>
            <p>
                In today's interconnected world, cybersecurity is more important than ever. SBOMs play a crucial role in maintaining the security of software projects by providing a clear record of all software packages and components used. This allows security teams to quickly identify and address vulnerabilities, thereby enhancing the overall security of the software.
            </p>
            {/* <img src="https://stock.adobe.com/search?k=cat" alt="Cybersecurity Image" /> */}
        </div>
    );
};

const Home = () => {
    return (
        <div className='page'>
            <Intro />
            <CyberSecurityRealWorld />
            <WhatAreSBOMs />
            <OurProject />
            {/* <img src={headerImage} alt="Intro Image" /> */}
            {/* <Button> Route SAML2 Post </Button> */}
        </div>
    );
};



export default Home;
