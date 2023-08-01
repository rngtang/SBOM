import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalTree.css'

function ModalTree(props) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Dependency Tree generator alert. 
                </Modal.Title>
                <Modal.Body>
                    <p>The following Dependency Tree might not have all the transitive dependencies of your software. CDXgen (the tool used to generate the SBOM) only supports the following package manifests to generate the dependency tree:
                        <ul>
                            <li>package-lock.json</li>
                            <li>yarn.lock</li>
                            <li>pnpm-lock.yaml</li>
                            <li>Maven (pom.xml)</li>
                            <li>Gradle</li>
                            <li>Python (requirements.txt, setup.py, pyproject.toml, poetry.lock)</li>
                        </ul>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>I understand</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalTree;