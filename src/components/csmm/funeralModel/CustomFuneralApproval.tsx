import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomFuneralApproval({
  open,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
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
            Reject
          </Button>
          {!!handleFormSubmit && (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              Approve
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomFuneralApproval;
