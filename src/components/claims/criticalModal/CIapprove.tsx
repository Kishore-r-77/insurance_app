import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { IconButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
// import Client from "../../clientDetails/client/Client";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from "./CriticalModal.module.css";
import CustomcriticalModal from "./CustomcriticalModal";
import axios from "axios";
import { p0050 } from "../../clientDetails/bank/bankApis/bankApis";
import { useAppSelector } from "../../../redux/app/hooks";
import SaveCI from "./CriticalSave";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationModal from "../../../utilities/modal/NotificationModal";
import AprroveCI from "./CriticalApprove";
import CustomApproveModal from "./CustomApproveModal";

function CIapprove({
  open,
  handleClose,
  criticalData,
  criticalBenefits,
  setcriticalBenefits,
  CriticalType,
  postcritical,
  isSave,
  savecritical,
  setcheckbody,
  handleadditional,
  criticalentry,
  premium,
  handleCIIncidentDate,
  handleCIReceivedDate,
  checkResponse,
  checkbody,
  isCInext,
  setisCInext,
  getData,
  policyWithBenefitData,
  saveCriticalopen,
  saveCriticalClose,
  saveisCIopen,
  apCIBenefits,
  setNotify,
}: any) {
  const title: string = "Critical illness";
  const isChecked = useRef(false);

  const [isNotifiyopen, setisNotifiyopen] = useState(false);
  const [CIapprove, setCIapprove] = useState<any>({});

  const [Criticalcheckval, setCriticalcheckval] = useState<any>({});

  const notifyopen = (valu: any) => {
    setisNotifiyopen(true);
    setCIapprove(valu);
  };
  const notifyclose = () => {
    setisNotifiyopen(false);
  };
  const aprroveCI = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ciapprove/${apCIBenefits[0].PolicyID}/${apCIBenefits[0].BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        CIapprovalClose();
        handleClose();
        setNotify({
          isOpen: true,
          message: "Approve Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const RejectCI = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/cireject/${apCIBenefits[0].PolicyID}/${apCIBenefits[0].BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        CIapprovalClose();
        handleClose();
        setNotify({
          isOpen: true,
          message: "Reject Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  const [isclick, setisclick] = useState(false);

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    criticalval: any
  ) => {
    const { name, value } = e.target;

    isChecked.current = e.target.checked;
    setCriticalcheckval(criticalval);
    setisclick(e.target.checked);
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const [CriticalTypeData, setCriticalTypeData] = useState([]);

  const getCriticalTypeData = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setCriticalTypeData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCriticalTypeData(companyId, "P0050", languageId, "CRITICAL");
    return () => {};
  }, []);

  const [isapprovalcheck, setisapprovalcheck] = useState(false);

  const CIapprovalOpen = (value: any) => {
    setisapprovalcheck(true);
  };
  const CIapprovalClose = () => {
    setisapprovalcheck(false);
  };

  return (
    <div>
      <CustomApproveModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={CIapprovalOpen}
        isclick={isclick}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2"]}
        >
          <TreeItem nodeId="1" label={`Policies`}>
            <Grid2 container spacing={2}>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="CompanyID"
                  name="CompanyID"
                  value={criticalData?.CompanyID}
                  placeholder="Company ID"
                  label="Company ID"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="PolicyID"
                  name="PolicyID"
                  value={criticalData?.ID}
                  placeholder="policyId"
                  label="policyId"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="Product"
                  name="Product"
                  value={criticalData?.PProduct}
                  placeholder="Product"
                  label="Product"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="Frequency"
                  name="Frequency"
                  value={criticalData?.PFreq}
                  placeholder="Frequency"
                  label="Frequency"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="InstalmentPremium"
                  name="InstalmentPremium"
                  value={
                    isSave ? premium?.current : criticalData?.InstalmentPrem
                  }
                  placeholder="Install Premium"
                  label="Install Premium"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="BillToDate"
                  name="BillToDate"
                  value={
                    criticalData?.BillToDate === ""
                      ? ""
                      : moment(criticalData?.BillToDate).format("DD-MM-YYYY")
                  }
                  placeholder="Bill To Date"
                  label="Bill To Date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="PaidToDate"
                  name="PaidToDate"
                  value={
                    criticalData?.PaidToDate === ""
                      ? ""
                      : moment(criticalData?.PaidToDate).format("DD-MM-YYYY")
                  }
                  placeholder="Paid To Date"
                  label="Paid To Date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
            </Grid2>
          </TreeItem>
          <TreeItem nodeId="2" label={`Benefits`}>
            <Paper className={styles.paperStyle}>
              <Table striped bordered hover style={{ position: "relative" }}>
                <thead className={styles.header}>
                  <tr>
                    <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        overflow: "hidden",
                      }}
                    >
                      Selected
                    </th>
                    <th
                      style={{
                        zIndex: -1,
                      }}
                    >
                      BenefitID
                    </th>
                    <th>Coverage</th>
                    <th>ApprovalFlag</th>
                    <th>Sum Assured</th>
                    <th>Critical Type</th>
                    <th>Incident Date</th>
                    <th>Received Date</th>
                  </tr>
                </thead>
                {apCIBenefits?.map((val: any, index: number) => (
                  <tr>
                    <td>
                      <input
                        className={styles["input-form"]}
                        style={{
                          position: "sticky",
                          left: 0,
                        }}
                        type="checkbox"
                        name="Select"
                        defaultChecked={val.Select === "X"}
                        // value={val.Select[index]}
                        //checked={val?.Select === "X"}

                        onChange={(e) => handleCheck(e, index, val)}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BenefitID}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BCoverage}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.ApprovalFlag}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BSumAssured}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.CriticalType}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.IncidentDate}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.ReceivedDate}
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomApproveModal>

      <AprroveCI
        open={isapprovalcheck}
        handleClose={CIapprovalClose}
        handleFormSubmit={aprroveCI}
        CIapprove={CIapprove}
        Criticalcheckval={Criticalcheckval}
        handleReject={RejectCI}
        isclick={isclick}
      />
    </div>
  );
}

export default CIapprove;
