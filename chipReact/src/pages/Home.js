import React from 'react';
import Layout from '../components/Layout';

const Intro = () => {
    return (
        <div className="intro-section">
            <h1>Centralized Hub for Inventories Platform</h1>
            <p>A simple way to create and consume SBOMs</p>
        </div>
    );
};

const WhatAreSBOMs = () => {
    return (
        <div className="what-sboms-section">
            <h3>What are SBOMs?</h3>
            <p>
                A Software Bill of Materials (SBOM) is a formal record of all software packages and components used by a software project or machine.
                These components can be commercial or open-source, and in turn rely on other components themselves. This creates a series of reliances, or a chain of dependencies, that is not easily visible to the creator or user of the main project.
            </p>
        </div>
    );
};

const Home = () => {
    return (
        <div className='page'>
        <Layout >
            
            <Intro />
            <WhatAreSBOMs />
            {/* Continue adding other sections as needed */}
            
        </Layout>
        </div>
    );
};

export default Home;
