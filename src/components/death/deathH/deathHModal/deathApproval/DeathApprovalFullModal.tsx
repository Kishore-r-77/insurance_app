import { Button, Modal } from "react-bootstrap";

function DeathApprovalFullModal({
  open,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
}: any) {
  return (
    <div>
      <Modal show={open} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          {!!handleFormSubmit && (
            <Button variant="success" onClick={() => handleFormSubmit()}>
              Approve
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathApprovalFullModal;
