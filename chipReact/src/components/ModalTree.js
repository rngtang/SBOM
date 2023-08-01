import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody'
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
                    Dependency Tree generator alert: 
                </Modal.Title>
                
                <Modal.Body>
                    <p>The following Dependency Tree might not have all the transitive dependencies of your software.</p>
                    <p>Currently, generating a Dependency Tree is limited to the following projects:</p>
                    <ul>
                        <li>package-lock.json</li>
                        <li>yarn.lock</li>
                        <li>pnpm-lock.yaml</li>
                        <li>Maven (pom.xml)</li>
                        <li>Gradle</li>
                        <li>Python (requirements.txt, setup.py, pyproject.toml, poetry.lock)</li>
                    </ul>
                    <p> To learn more, go here: <a href="https://github.com/CycloneDX/cdxgen">https://github.com/CycloneDX/cdxgen</a> </p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick={props.onHide}>I understand</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalTree;