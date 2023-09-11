import { Button, Modal } from "react-bootstrap";

function CustomSaveCritical({
  open,
  size,
  infoOpen,
  handleClose,
  title,
  children,
  handleFormSubmit,
  isSave,
  modalFunc,
  isCInext,
}: any) {
  return (
    <div>
      <Modal show={open} centered size={size} onHide={handleClose}>
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
              {isCInext ? (
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

export default CustomSaveCritical;
