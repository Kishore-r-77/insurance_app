import { Button, Modal } from "react-bootstrap";

function CustomFuneralFullModal({
  open,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isnext,
}: any) {
  return (
    <div>
      <Modal show={open} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomFuneralFullModal;
