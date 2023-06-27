import React, { useState } from 'react';

const CodeBox = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // Reset the isCopied state after one second
        setTimeout(() => setIsCopied(false), 1000);
    };


    return (
        <div style={styles.box}>
            <code style={styles.code}>{text}</code>
            <button onClick={handleCopyClick} style={styles.button}>
                {isCopied ? <i class="fa-solid fa-check"></i> : <i className="fa-regular fa-copy"></i>}
            </button>
        </div>
    );
};

const styles = {
    box: {
        backgroundColor: 'rgb(238, 238, 238)',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Consolas, monospace',
        padding: '16px',
        border: '1px solid gray',
        position: 'relative',
    },
    code: {
        whiteSpace: 'pre-wrap',
        margin: '0',
        textAlign: 'left',
        marginRight: '15px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: '10px',
    },
    icon: {
        fontSize: '16px',
    },
};

export default CodeBox;
