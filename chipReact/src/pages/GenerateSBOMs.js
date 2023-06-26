import React, { useState } from 'react';
import Layout from '../components/Layout';

const Section = ({bgColor, textColor, code}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // reset after 2 seconds
    };

    return (
        <div style={{ backgroundColor: bgColor, color: textColor, padding: "20px" }}>
            <div style={{ position: "relative" }}>
                <button onClick={handleCopy} style={{ position: "absolute", top: 0, right: 0 }}>
                    {isCopied ? 'Copied!' : 'Copy code'}
                </button>
                <pre>
                    <code>{code}</code>
                </pre>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                Praesent mauris. Fusce nec tellus sed augue semper porta.</p>
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

const GenerateSBOMs = () => {
    return (
        <Layout>
            {codeSnippets.map((snippet, index) => (
                <Section 
                    key={index}
                    bgColor={['#f0f0f0', '#d0d0d0', '#b0b0b0', '#909090'][index]}
                    textColor={['#000', '#000', '#fff', '#fff'][index]}
                    code={snippet}
                />
            ))}
        </Layout>
    );
};

export default GenerateSBOMs;
