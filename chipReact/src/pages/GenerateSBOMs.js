import React, { useState } from 'react';
import styles from './GenerateSBOMs.module.css'; // import CSS file
import CodeBox from '../components/CodeBox';
import prereq1 from '../data/prereq.json';
import data1 from '../data/linux.json';
import data2 from '../data/windows.json';
import data3 from '../data/apple.json';
import DownloadLinuxScript from '../components/DownloadLinuxScript';
import DownloadWindowsScript from '../components/DownloadWindowsScript';

const Prereq = ({title, text}) => {
    return (
        <div className={styles.section}>
            <div>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
};

const Section = ({title, text, code, downloadComponent}) => {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <div className={styles.section}>
            <div>
                <h2>{title}</h2>
                <p>{text}</p>
                <CodeBox text={code} />
                {downloadComponent && downloadComponent}
            </div>
        </div>
    );
};

//display 4 sections with 3 input
//get the title, text and code from 3 separate json files

const AnotherPage = () => {
    return (
        <>
            <Prereq title={prereq1.title} text={prereq1.text} />
            <Section title={data1.title} text={data1.text} code={data1.code} downloadComponent={<DownloadLinuxScript />} />
            <Section title={data2.title} text={data2.text} code={data2.code} downloadComponent={<DownloadWindowsScript />} />
            <Section title={data3.title} text={data3.text} code={data3.code}/>
        </>
    );
};


export default AnotherPage;
