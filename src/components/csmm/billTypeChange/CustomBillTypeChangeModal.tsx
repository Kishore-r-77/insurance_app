import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomBillTypeChangeModal({
  open,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
  completed,
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
          {!!handleFormSubmit && (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              {completed ? "Save" : "Validate"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomBillTypeChangeModal;
