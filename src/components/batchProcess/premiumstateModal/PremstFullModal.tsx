import { Button, Modal } from "react-bootstrap";

function CustomPremstFullModal({
  open,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isSave,
  commit,
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
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomPremstFullModal;
