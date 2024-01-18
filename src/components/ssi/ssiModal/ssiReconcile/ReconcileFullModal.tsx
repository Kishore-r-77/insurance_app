import { Button, Modal } from "react-bootstrap";

function ReconcileFullModal({
  open,
  handleClose,
  title,
  children,
  handleApproveSubmit,
  handleRejectSubmit,
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
          </Button>
          {/* <Button
                        style={{
                            backgroundColor: "red",
                        }}
                        variant="error"
                        onClick={handleRejectSubmit}
                    >
                        Rejection
                    </Button> */}
          <Button variant="primary" onClick={handleApproveSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReconcileFullModal;
