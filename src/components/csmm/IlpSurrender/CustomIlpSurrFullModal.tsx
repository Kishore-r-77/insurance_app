import { Button, Modal } from "react-bootstrap";

function CustomIlpSurrFullModal({
  open,
  handleClose,
  title,
  children,
  handleFormSubmit,
  commit,
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
            <>
              {commit ? (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Surrender
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Calculate
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomIlpSurrFullModal;
