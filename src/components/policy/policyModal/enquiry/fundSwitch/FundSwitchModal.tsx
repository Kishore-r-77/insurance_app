import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FundSwitchModal({
  open,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
}: any) {
  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={() => handleFormSubmit()}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FundSwitchModal;
