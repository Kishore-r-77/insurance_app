import moment from "moment";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getApi } from "../../components/admin/companies/companiesApis/companiesApis";
import { useBusinessDate } from "../../components/contexts/BusinessDateContext";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import styles from "./customNavbar.module.css";
import axios from "axios";
import { onChangeLogOut } from "../../redux/features/siginin/signinSlice";
import { Button, Modal } from "react-bootstrap";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function CustomNavbar() {
  const { businessDate, getBusinessDate } = useBusinessDate();

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id)
      .then((resp) => {
        setCompanyData(resp.data["Company"]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getBusinessDate();
    getCompanyData(companyId);

    return () => {};
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      .catch((err) => {});
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header className={styles["nav-header"]}>
        <nav className={styles["nav-list"]}>
          <h1 id={styles.logo}>
            <img
              style={{
                height: "6rem",
                width: "6rem",
                marginLeft: "1rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={companyData?.CompanyLogo}
            ></img>
            <h4 style={{ padding: ".5rem" }}>
              <b>Business Date: </b>
              <span style={{ padding: ".5rem" }}>
                {moment(businessDate).format("DD-MM-YYYY")}
              </span>
            </h4>
          </h1>

          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>About</li>
            <span>
              <Tooltip title="Log Out">
                <IconButton style={{ color: "white" }} onClick={handleShow}>
                  <LogoutIcon style={{ width: "30px", height: "30px" }} />
                </IconButton>
              </Tooltip>
            </span>
          </ul>
        </nav>
      </header>
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
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
    </>
  );
}

export default CustomNavbar;
