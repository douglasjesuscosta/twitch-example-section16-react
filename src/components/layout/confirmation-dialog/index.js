import React from 'react';

//React-Bootstrap
import { Modal, Button } from 'react-bootstrap';


const ConfirmationDialog = ({
    title,
    message,
    functionYes,
    functionNo,
    showDeleteModal = false
}) => {

    return (
        <div>
            <Modal show={showDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger"
                            onClick={ () => functionYes()}>Sim</Button>
                    <Button variant="primary"
                            onClick={ () => functionNo()}>Não</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default ConfirmationDialog;