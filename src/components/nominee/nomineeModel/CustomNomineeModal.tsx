import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomNomineeModal({
  open,
  handleClose,
  title,
  children,
  handleFormSubmit,
}: any) {
  return (
    <div>
      <Modal show={open} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomNomineeModal;
