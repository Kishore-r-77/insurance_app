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
  isBackground = false,
}: any) {
  return (
    <div>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        size={size}
        style={{
          background: isBackground
            ? "linear-gradient(to bottom, #4a5568, #2d3748)" // Replace with your desired gradient colors
            : "",
        }}
      >
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
