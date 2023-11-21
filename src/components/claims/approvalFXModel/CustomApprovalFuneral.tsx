import { Button, Modal } from "react-bootstrap";

function CustomApprovalFuneralFullModal({
  open,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isclicked,
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

          <Button
            variant="primary"
            onClick={() => handleFormSubmit()}
            disabled={!isclicked}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomApprovalFuneralFullModal;
