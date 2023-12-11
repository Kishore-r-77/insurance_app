import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EnquiryTable from "./EnquiryTable";
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
import moment from "moment";
import styles from "./SAChangeEnquiry.module.css";

const SAChangeEnquiry = ({
  open: saOpen,
  handleClose,
  policyNo,
  TransactionNo,
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
  //     field: "BenefitID",
  //     header: "Benefit ID",
  //     dbField: "benefit_id",
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
  //     field: "BPrem",
  //     header: "BPrem",
  //     dbField: "b_prem",
  //   },
  //   {
  //     field: "NSumAssured",
  //     header: "NSumAssured",
  //     dbField: "n_sum_assured",
  //   },
  //   {
  //     field: "NTerm",
  //     header: "NTerm",
  //     dbField: "n_term",
  //   },
  //   {
  //     field: "NPTerm",
  //     header: "NPTerm",
  //     dbField: "np_term",
  //   },
  //   {
  //     field: "NPrem",
  //     header: "NPrem",
  //     dbField: "n_prem",
  //   },
  //   {
  //     field: "NAnnualPrem",
  //     header: "NAnnualPrem",
  //     dbField: "n_annual_prem",
  //   },
  // ];

  const [saChangeData, setsaChangeData] = useState([]);
  const getSAChangeData = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/GetSAChangeEnq/${policyNo}/${TransactionNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setsaChangeData(resp.data.SAChange);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getSAChangeData();

    return () => {};
  }, [saOpen]);

  return (
    <div>
      <CustomModal
        size="xl"
        open={saOpen}
        handleClose={handleClose}
        title="Sum Assured change Details"
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead className={styles["table-head"]}>
              <TableRow>
                <TableCell className={styles.thstyle}>Policy Id</TableCell>
                <TableCell className={styles.thstyle}>Client ID</TableCell>
                <TableCell className={styles.thstyle}>Benefit ID</TableCell>
                <TableCell className={styles.thstyle}>BCoverage</TableCell>
                <TableCell className={styles.thstyle}>BStart Date</TableCell>
                <TableCell className={styles.thstyle}>BSumAssured</TableCell>
                <TableCell className={styles.thstyle}>BTerm</TableCell>
                <TableCell className={styles.thstyle}>BPTerm</TableCell>
                <TableCell className={styles.thstyle}>BPrem</TableCell>
                <TableCell className={styles.thstyle}>NSumAssured</TableCell>
                <TableCell className={styles.thstyle}>NTerm</TableCell>
                <TableCell className={styles.thstyle}>NPTerm</TableCell>
                <TableCell className={styles.thstyle}>NPrem</TableCell>
                <TableCell className={styles.thstyle}>NAnnualPrem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saChangeData.map((data: any, index: number) => (
                <TableRow
                  key={data.PolicyID}
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
                    {data.PolicyID}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.ClientID}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.BenefitID}
                  </TableCell>
                  <TableCell>{data.BCoverage}</TableCell>
                  <TableCell className={styles.tdstyle}>
                    {moment(data.BStartDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.BSumAssured}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>{data.BTerm}</TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.BPTerm}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>{data.BPrem}</TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.NSumAssured}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>{data.NTerm}</TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.NPTerm}
                  </TableCell>
                  <TableCell className={styles.tdstyle}>{data.NPrem}</TableCell>
                  <TableCell className={styles.tdstyle}>
                    {data.NAnnualPrem}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomModal>
    </div>
  );
};

export default SAChangeEnquiry;
