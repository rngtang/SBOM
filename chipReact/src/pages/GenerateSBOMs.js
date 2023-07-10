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
                <h2 className={styles.h2}>{title}</h2>
                <p>{para1}</p>
                <p> SBOMs will be created using the open-source tool <a href="https://github.com/CycloneDX/cdxgen" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)'}}>cdxgen</a>, which generates SBOMs in the CycloneDX format. After the SBOM is created, it will be scanned using the open-source vulnerability scanner <a href="https://github.com/anchore/grype" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)'}}>Grype</a>. More details about how to use these tools can be found in their respective repositories.</p>
                <p>Because the tool we use for scanning SBOMs (Grype) is only developed for macOS/linux devices, {<> <span style={{ backgroundColor: 'var(--piedmont)'}}>scanning dependencies on a Windows OS requires the use of <strong>Docker</strong>.</span> </>} For more information about how to install Docker for Windows, click <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" style={{ fontWeight: 'bolder', color: 'var(--dukeblue)'}}>here</a>.</p> 
            </div>
        </div>
    );
};

const Section = ({ title, text, code, downloadComponent }) => {
    const [isCopied, setIsCopied] = useState(false);
    const steps = Array.isArray(text) ? text : [text];

    const renderSteps = (steps) => {
        return steps.map((step, index) => {
            if (Array.isArray(step)) {
                // Render sublist
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
    };

    return (
        <div className={styles.section}>
            <div>
                <h2 className={styles.h2}>{title}</h2>
                <ol className={styles.mainList}>
                    {renderSteps(steps)}
                </ol>
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

      // "Another option is to keep the shell script in your downloads, and instead replace '/absolute/path/use/command/pwd' with the absolute path of your project.", 
      // [
      //   "Run this command in your terminal from any directory. In this case, keep in mind the name of your generated SBOM will be '/your/absolute/path'.json.", 
      //   "To find the absolute path of your project, you can use pwd from inside the directory your project is in, and make sure your absolute path ends with the project you want to create an SBOM for."
      // ], 