DEFFINITIONS

SBOM (Software Bill of Materials): a document that contains all parts used in a software program and documents where those parts came from and the parts those parts rely on and so on and so forth.

SBOM Format: The method in which the information in the SBOM is laid out. We use a CycloneDX format, which is more focused on tracking the dependencies within our project.

Dependencies (Component): A software often calls upon code from other libraries. These code sections/components are called dependencies, as they depend on code not written from within the app.

SBOM serial number: This is an identification string that is specific to your SBOM.

Metadata: In general, this provides information about the data it is included in. In SBOMs, this can be seen in the timestamp the SBOM was created and the tools used to create the SBOM

Vulnerabilities: A weakness in the code of a component that allows for exploitation by bad actors that can compromise the security and functionality of the software the component is a part of.

Vulnerability source: This is generally where the vulnerability information is decided and from, for example, a vulnerability source can be Github, Google, or Amazon. A description of the vulnerability, what to do about it, and its severity can be found here.

Tools: Included in the metadata, this includes a description of what program was used to create the SBOM.

BOM-ref: An identification string specific to a component. This is used to identify the component and also reference the component, for example, it can be used by a vulnerability description to show the component the vulnerability directly affects.

Component Group (Type): This describes what kind of function or nature a component has in an application and, for example, can be a library, a configuration file, or an executable.
