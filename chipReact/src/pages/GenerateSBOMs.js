import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from './GenerateSBOMs.css'; // import CSS file

const Section = ({code}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // reset after 2 seconds
    };

    return (
        <div className={styles.section}>
            <div>
                <button onClick={handleCopy}>
                    {isCopied ? 'Copied!' : 'Copy code'}
                </button>
                <pre>
                    <code>{code}</code>
                </pre>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    );
};

const codeSnippets = [
    "Code snippet 1",
    "Code snippet 2",
    "Code snippet 3",
    "Code snippet 4"
];

const AnotherPage = () => {
    return (
        <Layout>
            {codeSnippets.map((snippet, index) => (
                <Section 
                    key={index}
                    code={snippet}
                />
            ))}
        </Layout>
    );
};

export default AnotherPage;
