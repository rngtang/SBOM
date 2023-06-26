import React from 'react';
import Layout from '../components/Layout';

const Prereqs = () => {
    return (
        <div>
            <h3>Prerequisites</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur metus vitae volutpat mollis. Cras vestibulum, nisi vel placerat accumsan, nisl lectus pharetra ex, vitae auctor ligula velit ac purus. Ut sodales nulla lectus, ut dictum ante consequat nec. Phasellus viverra ex tempus velit venenatis, ac facilisis sapien facilisis. Aliquam et mauris lacinia quam rutrum pellentesque at consequat dolor. Maecenas at tempus sem. Aliquam in magna non urna facilisis tincidunt. Sed nec dolor ligula. Nunc lorem odio, pulvinar quis est eget, commodo varius lacus.
            </p>
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

const GenerateSBOMs = () => {
    return (
        <Layout>
            <Prereqs />
        </Layout>
    );
};

export default GenerateSBOMs;
