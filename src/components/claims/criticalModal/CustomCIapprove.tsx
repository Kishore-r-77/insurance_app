import { Button, Modal } from "react-bootstrap";

function CustomCIapprove({
  open,
  size,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isSave,
  modalFunc,
  handleReject,

  RejectCI,
}: any) {
  return (
    <div>
      <Modal show={open} centered size={size} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ marginRight: "auto" }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomCIapprove;
