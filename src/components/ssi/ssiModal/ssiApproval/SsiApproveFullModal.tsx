import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

function SsiApproveFullModal({
  open,
  handleClose,
  title,
  children,
  handleApproveSubmit,
  handleRejectSubmit,
}: any) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleApproveWithConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmApprove = () => {
    handleApproveSubmit();
    setShowConfirmation(false);
    handleClose();
  };

  const handleCancelApprove = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <Modal show={open} onHide={handleClose} size="xl" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApproveWithConfirmation}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={handleCancelApprove}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          Are you sure you want to approve?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelApprove}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmApprove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SsiApproveFullModal;
