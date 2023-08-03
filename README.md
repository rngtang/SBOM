
Version 0.999 8/1/2023 ------------------------------------------------------------------

-- BACKGROUND --
Welcome to the Centralized Hub for Inventories Platform (CHIP), a web-based application for the creation, visualization, and use of Software Bills of Materials (SBOMs).

For reference, an SBOM is a formal record of all software packages and components used by a software project or machine. These COMPONENTS (referenced in our project and database as sbom_components) can be commercial or open-source, with examples such as software libraries, packages, APIs, etc. Effectively, components are everything your project relies on that you did not code yourself. Top-level components rely on other components, which in turn creates a series of reliances, or a chain of DEPENDENCIES, that is not easily visible to the creators of the main project. Furthermore, if a dependency ever becomes or is compromised (such as containing malware, being outdated, etc.), it is known as VULNERABILITY and affects every component further on that relies on it. 

An SBOM brings transparency and security to a software project by finding all the components, dependencies, and vulnerabilities of a project and listing them out as a long JSON file. However, due to the heirarchical nature of SBOMs, most of these JSON files are at or over tens of thousands of lines of text, which make them impossible to parse manually. While there is already plenty technology that exists to create SBOMs, there are still not any standarized or widely used resources for easily making sense of and using them. 

Therefore, our web application, the Centralized Hub for Inventories Platform (CHIP) was created with the goals of creating, visualizing, and using an SBOM in an easily understandable manner. 


-- APPLICATION OVERVIEW --
This project was created using React.js (front-end), Ruby on Rails (back-end), and a MySQL database. It is currently built through Docker (docker-compose) for development, with front-end being hosted on Port 3000. 


-- HOW TO USE --
Our application logs users in through SSO (SAML) and stores cookies. Upon logging in, users can access more pages using a navigation bar on the left. 

The first page is 'View SBOMs'. This is where users can see all the SBOMs they've uploaded in the past. To upload an SBOM, a user must first enter name, description, and then the file of the SBOM to be added. The SBOM will then display in the accordion, which holds many different ways someone can interact with the SBOM. These options include visualizing the SBOM's dependency tree, deleting the SBOM, updating the SBOM with a new file, viewing all the vulnerabilities and vulnerability information, and editing the user-given name and description for that SBOM. The accordion also displays name, description, metadata, and number of vulnerabilities found. A user can also search for SBOM by name using the top right search bar.

The second page is 'Generate SBOMs'. This is where users can choose between four different scripts (Linux, MacOS, Windows, and Docker) for generating an SBOM. This way, any user can create a SBOM just by following the instructions and running the script that they need. Our SBOMs are generated in the CycloneDX format using the open-source tools Cdxgen (for metadata and dependencies) and Grype (for components and vulnerabilities). One limitation of this is that as Grype does not work on Windows, the Windows script will generate an SBOM without vulnerabilities. If a Windows user wants to create an SBOM for their application, they will either need WSL (with the Linux script) or Docker (with the Dockerfile). 

The final page on the navigation bar is actually just a log out button. 




