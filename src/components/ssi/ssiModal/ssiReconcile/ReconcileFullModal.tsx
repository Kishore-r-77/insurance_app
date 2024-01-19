import { Button, Modal } from "react-bootstrap";

function ReconcileFullModal({
  open,
  handleClose,
  title,
  children,
  handleApproveSubmit,
  handleRejectSubmit,
  state,
}: any) {
  return (
    <div>
      <Modal show={open} onHide={handleClose} size="xl" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
            {}
          </Button>
          {!state.infoOpen && ( // Render the "Save" button only if state.infoOpen is false
            <Button variant="primary" onClick={handleApproveSubmit}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReconcileFullModal;
