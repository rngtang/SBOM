import React, { useState } from 'react';
import styles from './GenerateSBOMs.module.css'; // import CSS file
import CodeBox from '../components/CodeBox';
import prereq1 from '../data/prereq.json';
import data1 from '../data/linux.json';
import data2 from '../data/windows.json';
import DownloadLinuxScript from '../components/DownloadLinuxScript';
import DownloadWindowsScript from '../components/DownloadWindowsScript';


const Prereq = ({title, para1}) => {
    return (
        <div className={styles.section}>
            <div>
                <h2>{title}</h2>
                <p>{para1}</p>
                <p>Because the tool we use for scanning SBOMs (Grype) is only developed for macOS/linux devices, {<> <span style={{ backgroundColor: "var(--piedmont)" }}>scanning dependencies on a Windows OS requires the use of <strong>Docker</strong>.</span> </>} </p>
                <p> SBOMs will be created using the open-source tool <a href="https://github.com/CycloneDX/cdxgen">cdxgen</a>, which generates SBOMs in the CycloneDX format. After the SBOM is created, it will be scanned using the open-source vulnerability scanner <a href="https://github.com/anchore/grype">Grype</a>. More details about how to use these tools can be found in their respective repositories.</p>
                
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
                {downloadComponent && downloadComponent}
                <CodeBox text={code} />
                
            </div>
        </div>
    );
};

const AnotherPage = () => {
    return (
        <>
            <Prereq title={prereq1.title} para1={prereq1.para1} docker={prereq1.docker}/>
            <Section title={data1.title} text={data1.text} code={data1.code} downloadComponent={<DownloadLinuxScript />} />
            <Section title={data2.title} text={data2.text} code={data2.code} downloadComponent={<DownloadWindowsScript />} />
        </>
    );
};


export default AnotherPage;
