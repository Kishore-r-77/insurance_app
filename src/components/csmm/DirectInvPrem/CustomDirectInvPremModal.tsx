import { Button, Modal } from "react-bootstrap";
import React from "react";

function CustomDirectInvPremModal({
  open,
  infoOpen,
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
            Close
          </Button>
          {!!handleFormSubmit && (
            <>
              {isSave ? (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Check
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomDirectInvPremModal;
