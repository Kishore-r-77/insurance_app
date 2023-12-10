import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";
import styles from "./ApprovalFxModel.module.css";
import CustomApprovalFuneralFullModal from "./CustomApprovalFuneral";
import FuneralApprovalModel from "./FuneralApprovalModel";

function ApprovalFuneralModal({
  open,
  modifiedPremium,
  handleClose,
  funeralObj,
  isSave,
  savefuneralobj,
  criticalIllness,
  setNotify,
}: any) {
  const title: string = "Funeral";
  const isChecked = useRef(false);
  const [isclicked, setisclicked] = useState(false);

  const [isfuneralapprovalOpen, issetfuneralapprovalOpen] = useState(false);
  const funeralapprovalOpen = (val: any) => {
    issetfuneralapprovalOpen(true);
  };
  const funeralapprovalClose = () => {
    issetfuneralapprovalOpen(false);
  };

  const aprrovefexr = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/fxapprove/${criticalIllness[0].PolicyID}/${criticalIllness[0].BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        funeralapprovalClose();
        handleClose();
        setNotify({
          isOpen: true,
          message: "Approved Successfully",
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
  const rejectfexr = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/fxreject/${criticalIllness[0]?.PolicyID}/${criticalIllness[0]?.BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        funeralapprovalClose();
        handleClose();
        setNotify({
          isOpen: true,
          message: "Rejected Successfully",
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
  const [criticalcheckval, setcriticalcheckval] = useState([]);
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    criticalval: any
  ) => {
    const { name, value } = e.target;

    setcriticalcheckval(criticalval);

    isChecked.current = e.target.checked;
    setisclicked(e.target.checked);
  };

  return (
    <div>
      <CustomApprovalFuneralFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={funeralapprovalOpen}
        isclicked={isclicked}
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
                  value={funeralObj?.CompanyID}
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
                  value={funeralObj?.ID}
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
                  value={funeralObj?.PProduct}
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
                  value={funeralObj?.PFreq}
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
                    isSave
                      ? modifiedPremium?.current
                      : funeralObj?.InstalmentPrem
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
                    funeralObj?.BillToDate === ""
                      ? ""
                      : moment(funeralObj?.BillToDate).format("DD-MM-YYYY")
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
                    funeralObj?.PaidToDate === ""
                      ? ""
                      : moment(funeralObj?.PaidToDate).format("DD-MM-YYYY")
                  }
                  placeholder="Paid To Date"
                  label="Paid To Date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="ClientID"
                  name="ClientID"
                  value={funeralObj?.ClientID}
                  placeholder="ClientID"
                  label="ClientID"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
            </Grid2>
          </TreeItem>

          <TreeItem nodeId="1" label={`Benefits`}>
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
                    <th>Status</th>
                    <th>SumAssured</th>
                    <th>CriticalType</th>
                    <th>IncidentDate</th>
                    <th>ReceivedDate </th>
                  </tr>
                </thead>
                {criticalIllness?.map((val: any, index: number) => (
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
      </CustomApprovalFuneralFullModal>
      <FuneralApprovalModel
        open={isfuneralapprovalOpen}
        rejectfexr={rejectfexr}
        funeralapprovalClose={funeralapprovalClose}
        aprrovefexr={aprrovefexr}
        handleClose={handleClose}
        criticalcheckval={criticalcheckval}
        savefuneralobj={savefuneralobj}
        criticalIllness={criticalIllness}
      />
    </div>
  );
}

export default ApprovalFuneralModal;
