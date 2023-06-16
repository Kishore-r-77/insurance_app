import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ValidateModal({ open, handleClose, handleFormSubmit }: any) {
  return (
    <div>
      {" "}
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validate</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure want validate this Quotation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ValidateModal;
