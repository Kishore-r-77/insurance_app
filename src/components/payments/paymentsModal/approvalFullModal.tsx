import { Button, Modal } from "react-bootstrap";

function ApprovalFullModal({
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
      <Modal show={open} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Rejection
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Approval
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ApprovalFullModal;
