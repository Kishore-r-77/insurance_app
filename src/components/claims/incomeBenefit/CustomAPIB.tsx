import { Button, Modal } from "react-bootstrap";

function CustomAPIB({
  open,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isSave,
  isclick,
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

          <>
            <Button
              variant="primary"
              onClick={() => handleFormSubmit()}
              disabled={!isclick}
            >
              Next
            </Button>
          </>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomAPIB;
