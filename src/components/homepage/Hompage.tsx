import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { onChangeLogOut } from "../../redux/features/siginin/signinSlice";
import styles from "./homepage.module.css";

function Hompage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logout = () => {
    axios
      .post(`http://localhost:3000/api/v1/auth/logout`, {
        withCredentials: true,
      })
      .then((resp) => {
        dispatch(onChangeLogOut());
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.main}>
      <h1>Dashboard</h1>
      <Button variant="danger" onClick={handleShow}>
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={logout}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hompage;
