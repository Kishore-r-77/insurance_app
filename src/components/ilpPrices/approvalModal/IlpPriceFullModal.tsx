import { Button, Modal } from "react-bootstrap";

function IlpPriceFullModal({
  open,
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
          <Button variant="secondary" onClick={handleClose}>
            Close
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

export default IlpPriceFullModal;
