import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomSavefuneral({
  open,
  isnext,
  infoOpen,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
}: any) {
  console.log(isnext, "isnexttttttttt");
  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size={size}>
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
              {isnext ? (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Check
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Save
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomSavefuneral;
