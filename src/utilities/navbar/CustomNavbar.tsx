import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getApi } from "../../components/admin/companies/companiesApis/companiesApis";
import { useAppSelector } from "../../redux/app/hooks";
import styles from "./customNavbar.module.css";

function CustomNavbar() {
  const companyId = useAppSelector(
    (state) => state.users.user.message.CompanyId
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
    getCompanyData(companyId);

    return () => {};
  }, []);

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
