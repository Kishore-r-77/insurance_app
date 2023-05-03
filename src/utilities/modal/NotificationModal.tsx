import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NotificationModal = ({
  open,
  handleClose,
  title,
  children,
  handleFormSubmit,
}: any) => {
  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
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
              Yes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationModal;
