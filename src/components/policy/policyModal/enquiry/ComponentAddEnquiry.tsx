import { Global } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomModal from "../../../../utilities/modal/CustomModal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./ComponentAddEnquiry.module.css";
import moment from "moment";
const ComponentAddEnquiry = ({
  open: compOpen,
  handleClose,
  policyNo,
  TransactionNo,
  state,
}: any) => {
  // const columns = [
  //   {
  //     field: "CompanyID",
  //     header: "Company ID",
  //     dbField: "company_id",
  //   },
  //   {
  //     field: "PolicyID",
  //     header: "Policy ID",
  //     dbField: "policy_id",
  //   },
  //   {
  //     field: "ClientID",
  //     header: "Client ID",
  //     dbField: "client_id",
  //   },
  //   {
  //     field: "BCoverage",
  //     header: "BCoverage",
  //     dbField: "b_coverage",
  //   },
  //   {
  //     field: "BStartDate",
  //     header: "BStartDate",
  //     dbField: "b_start_date",
  //     type: "date",
  //   },
  //   {
  //     field: "BSumAssured",
  //     header: "BSumAssured",
  //     dbField: "b_sum_assured",
  //   },
  //   {
  //     field: "BTerm",
  //     header: "BTerm",
  //     dbField: "b_term",
  //   },
  //   {
  //     field: "BPTerm",
  //     header: "BPTerm",
  //     dbField: "bp_term",
  //   },
  //   {
  //     field: "BAnnualPrem",
  //     header: "BAnnualPrem",
  //     dbField: "b_annual_prem",
  //   },
  //   {
  //     field: "BGender",
  //     header: "BGender",
  //     dbField: "b_gender",
  //   },
  //   {
  //     field: "BDOB",
  //     header: "BDOB",
  //     dbField: "bdob",
  //     type: "date",
  //   },
  //   {
  //     field: "Method",
  //     header: "Method",
  //     dbField: "method",
  //   },
  //   {
  //     field: "Frequency",
  //     header: "Frequency",
  //     dbField: "frequency",
  //   },
  //   {
  //     field: "BAge",
  //     header: "BAge",
  //     dbField: "b_age",
  //   },
  // ];

  const [componentAddData, setComponentData] = useState([]);
  const getComponentAddData = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/customerservice/compaddenq/${policyNo}/${TransactionNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setComponentData(resp.data.ComponentAdd);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getComponentAddData();

    return () => {};
  }, [open]);

  return (
    <CustomModal
      size="xl"
      open={compOpen}
      handleClose={handleClose}
      title="Component Add Details"
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={styles["table-head"]}>
            <TableRow>
              <TableCell className={styles.thstyle}>Policy Id</TableCell>
              <TableCell className={styles.thstyle}>Client ID</TableCell>
              <TableCell className={styles.thstyle}>BCoverage</TableCell>
              <TableCell className={styles.thstyle}>BStart Date</TableCell>
              <TableCell className={styles.thstyle}>BSumAssured</TableCell>
              <TableCell className={styles.thstyle}>BTerm</TableCell>
              <TableCell className={styles.thstyle}>BPTerm</TableCell>
              <TableCell className={styles.thstyle}>BAnnual Prem</TableCell>
              <TableCell className={styles.thstyle}>BGender</TableCell>
              <TableCell className={styles.thstyle}>BDateOfBirth</TableCell>
              <TableCell className={styles.thstyle}>Frequency</TableCell>
              <TableCell className={styles.thstyle}>BPremCessDate</TableCell>
              <TableCell className={styles.thstyle}>BRiskCessDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {componentAddData.map((funds: any, index: number) => (
              <TableRow
                key={funds.PolicyID}
                style={{
                  background: index % 2 === 0 ? "#f0f8ff" : "#d3e0ea", // Light blue for even rows, slightly darker blue for odd rows
                  transition: "background 0.3s ease-in-out", // Add a smooth transition effect
                }}
              >
                <TableCell
                  className={styles.tdstyle}
                  component="th"
                  scope="row"
                >
                  {funds.PolicyID}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {funds.ClientID}
                </TableCell>
                <TableCell>{funds.BCoverage}</TableCell>
                <TableCell className={styles.tdstyle}>
                  {moment(funds.BStartDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {funds.BSumAssured}
                </TableCell>
                <TableCell className={styles.tdstyle}>{funds.BTerm}</TableCell>
                <TableCell className={styles.tdstyle}>{funds.BPTerm}</TableCell>
                <TableCell className={styles.tdstyle}>
                  {funds.BAnnualPrem}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {funds.BGender}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {moment(funds.BDOB).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {funds.Frequency}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {moment(funds.BPremCessDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className={styles.tdstyle}>
                  {moment(funds.BRiskCessDate).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomModal>
  );
};

export default ComponentAddEnquiry;
