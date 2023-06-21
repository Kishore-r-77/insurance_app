import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CalculateModal({ open, handleClose, handleFormSubmit }: any) {
  return (
    <div>
      {" "}
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calculate</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure want calculate this Quotation?</Modal.Body>
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

export default CalculateModal;
