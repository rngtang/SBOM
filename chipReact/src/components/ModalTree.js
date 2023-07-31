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
                    <p>The following Dependency Tree might not have all the transitive dependencies of your software.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>I understand</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalTree;