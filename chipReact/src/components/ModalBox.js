import { Modal, Spinner } from 'react-bootstrap';

function ModalBox() {
    return (
        <>
            <Modal
                show={true}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    SBOM is uploading, please stay on this page...
                    <Spinner animation="border" role="status" style={{float: "right"}}>
                        <span className="visually-hidden">SBOM is uploading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalBox;