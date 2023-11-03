import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getApi } from "../../components/admin/companies/companiesApis/companiesApis";
import { useAppSelector } from "../../redux/app/hooks";
import styles from "./customNavbar.module.css";
import axios from "axios";
import moment from "moment";
import { useBusinessDate } from "../../components/contexts/BusinessDateContext";

function CustomNavbar() {
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

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

  console.log(businessDate, "");

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
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default CustomNavbar;
