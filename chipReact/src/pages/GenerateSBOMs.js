import React, { useState } from 'react';
import styles from './GenerateSBOMs.module.css';
import CodeBox from '../components/CodeBox';
import prereq1 from '../data/prereq.json';
import data1 from '../data/linux.json';
import data2 from '../data/windows.json';
import data3 from '../data/mac.json';
import DownloadLinuxScript from '../components/DownloadLinuxScript';
import DownloadMacScript from '../components/DownloadMacScript';
import DownloadWindowsScript from '../components/DownloadWindowsScript';

// title is the title of the section
// para1 is the intro paragraph
const Prereq = ({ title, para1 }) => {
    return (
        <div className={styles.section}>
            <div>
                <h2 className={styles.h2}>{title}</h2>
                <p>{para1}</p>
                <p> SBOMs will be created using the open-source tool <a href="https://github.com/CycloneDX/cdxgen" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)' }}>cdxgen</a>, which generates SBOMs in the CycloneDX format. After the SBOM is created, it will be scanned using the open-source vulnerability scanner <a href="https://github.com/anchore/grype" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)' }}>Grype</a>. More details about how to use these tools can be found in their respective repositories.</p>
                <p>Because the tool we use for scanning SBOMs (Grype) is only developed for macOS/linux devices, {<> <span style={{ backgroundColor: 'var(--piedmont)' }}>scanning dependencies on a Windows OS requires the use of <strong>Docker</strong>.</span> </>} For more information about how to install Docker for Windows, click <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)' }}>here</a>.</p>
            </div>
        </div>
    );
};

// title is the title of the section
// text is the text of the section
// code is the command line for the section
// downloadComponent is the redirect for which script that should be downloaded
const Section = ({ title, notice, text, code, downloadComponent }) => {
    const [isCopied, setIsCopied] = useState(false);
    const steps = Array.isArray(text) ? text : [text];
    const warnings = Array.isArray(notice) ? notice : [notice];

    const renderSteps = (steps) => {
    if (Array.isArray(steps)) {
        return steps.map((step, index) => {
            if (Array.isArray(step)) {
                // render sublist
                return (
                    <ul key={index} className={styles.sublist}>
                        {renderSteps(step)}
                    </ul>
                );
            } else {
                return (
                    <li key={index} className={styles.step}>{step}</li>
                );
            } 
        });
    } else {
        // Render a single list item for the single string
        return (
            <li className={styles.step}>{steps}</li>
        );
        }
    };

    return (
        <div className={styles.section}>
            <div>
                <h2 className={styles.h2}>{title}</h2>
                <ul>
                    {renderSteps(warnings)}
                </ul>
                <ol>
                    {renderSteps(steps)}
                </ol>
                {downloadComponent && downloadComponent}
                <CodeBox text={code} />
            </div>
        </div>
    );
};

// create the page that actually gets returned
const AnotherPage = () => {
    return (
        <>
            <Prereq title={prereq1.title} para1={prereq1.para1} docker={prereq1.docker} />
            <Section title={data1.title} notice={data1.notice} text={data1.text} code={data1.code} downloadComponent={<DownloadLinuxScript />} />
            <Section title={data3.title} notice={data2.notice} text={data3.text} code={data3.code} downloadComponent={<DownloadMacScript />} />
            <Section title={data2.title} notice={data3.notice} text={data2.text} code={data2.code} downloadComponent={<DownloadWindowsScript />} />
        </>
    );
};

export default AnotherPage;