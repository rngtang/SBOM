import React, { useState } from 'react';

const CodeBox = ({ text }) => {
    // create a state for clicking on the clipboard
    const [isCopied, setIsCopied] = useState(false);

    // handling clicking on the clipboard
    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // reset the isCopied state after two seconds
        setTimeout(() => setIsCopied(false), 2000);
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

// codebox styles
const styles = {
    box: {
        borderRadius: '8px',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: 'none',
        outline: 'none',
        backgroundColor: '#E5E5E5',
        fontSize: '18px',
        fontFamily: 'Consolas',
        padding: '16px',
        position: 'relative',
        boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.1) inset, 0 3px 5px 0 rgba(0, 0, 0, 0.1) inset'
    },
    code: {
        whiteSpace: 'pre-wrap',
        margin: '0',
        textAlign: 'left',
        marginRight: '15px',
        color: '#012169'
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        top: '50%',
        marginRight: '10px',
    },
    icon: {
        fontSize: '16px',
    },
};

export default CodeBox;
