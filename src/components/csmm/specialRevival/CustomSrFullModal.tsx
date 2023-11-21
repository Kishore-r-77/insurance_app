import { Button, Modal } from "react-bootstrap";

function CustomSrFullModal({
  open,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isSave,
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
            Exit
          </Button>
          
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              Save
            </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomSrFullModal;
