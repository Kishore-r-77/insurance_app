import { Button, Modal } from "react-bootstrap";

function Confirmation({ state, dispatch, record, ACTIONS, hardDelete }: any) {
  return (
    <div>
      <Modal
        show={state.deleteOpen}
        onHide={() => dispatch({ type: ACTIONS.DELETECLOSE })}
        centered
        size="xl"
      >
        <Modal.Body>
          <h1>
            {state.deleteOpen
              ? "Are you sure you want to Delete this record"
              : "Are you Sure you want to Perform this Operation?"}
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch({ type: ACTIONS.DELETECLOSE })}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => hardDelete(record.ID)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Confirmation;
