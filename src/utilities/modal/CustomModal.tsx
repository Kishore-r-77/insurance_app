import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal({
  open,
  infoOpen,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
  saveButton = "Save",
  closeButton = "Close",
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
            {closeButton}
          </Button>
          {!!handleFormSubmit && (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              {saveButton}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomModal;
