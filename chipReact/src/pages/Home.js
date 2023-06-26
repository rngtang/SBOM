import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
    return (
        <Layout>
            <h1>Centralized Hub for Inventories Platform</h1>
            <p>A simple way to create and consume SBOMs</p>
            <h3>What are SBOMs?</h3>
            <p>
                A Software Bill of Materials (SBOM) is a formal record of all software packages and components used by a software project or machine. These components can be commercial or open-source, and in turn rely on other components themselves. This creates a series of reliances, or a chain of dependencies, that is not easily visible to the creator or user of the main project.
                An SBOM helps to solve this issue by finding all the dependencies of a project and listing them out (in our case) as a JSON file. They’re an important part of maintaining cybersecurity, and as of an executive order issued on May 2021, are required for all software projects.
            </p>
        </Layout>
    );
};

export default Home;
