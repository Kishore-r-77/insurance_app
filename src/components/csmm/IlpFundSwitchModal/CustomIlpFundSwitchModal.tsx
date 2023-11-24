import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomIlpFundSwitchModal({
  open,
  handleClose,
  size,
  title,
  children,
  handleFormSubmit,
  completed,
  isResult,
}: any) {
  return (
    <div>
      <Modal show={open} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* {!!handleFormSubmit && (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              {completed && isResult
                ? "Save"
                : completed
                ? "Calculate"
                : "Initialize"}
            </Button>
          )} */}
          {!!handleFormSubmit && (
            <>
              {completed ? (
                <Button variant="primary" onClick={() => handleFormSubmit()}>
                  Save
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

export default CustomIlpFundSwitchModal;
