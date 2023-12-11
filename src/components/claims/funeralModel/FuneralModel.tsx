import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import InfoIcon from "@mui/icons-material/Info";

import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import CustomFuneralFullModal from "./CustomFuneralfullModal";
import styles from "./funeralModel.module.css";
import axios from "axios";
import { p0050 } from "../../clientDetails/bank/bankApis/bankApis";
import { useAppSelector } from "../../../redux/app/hooks";
import { WidthFull } from "@mui/icons-material";
import SaveFuneral from "./SaveFuneral";
// import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationModal from "../../../utilities/modal/NotificationModal";
import FuneralApprovalModel from "../approvalFXModel/FuneralApprovalModel";

function FuneralModal({
  open,
  modifiedPremium,
  handleClose,
  funeralObj,
  funeralBenefits,
  isSave,
  setfuneralcheck,
  isnext,
  setisnext,
  savefuneralobj,
  funeralcheck,
  postfuneral,
  savefuneral,
  funeralentry,
  handlefuneralchange,
  handleReceivedDate,
  handleIncidentDate,
  savefuneralOpen,
  savefuneralClose,
  saveisfuneralOpen,
  criticalIllness,
  setNotify,
}: any) {
  const title: string = "Funeral";
  const isChecked = useRef(false);
  // const [isnotificationOpen, setisnotificationOpen] = useState(false);
  // const [criticalbenefit, setcriticalbenefit] = useState<any>({});
  // const [isfuneralapprovalOpen, issetfuneralapprovalOpen] = useState(false);
  // const funeralapprovalOpen = (val: any) => {
  //   issetfuneralapprovalOpen(true);
  // };
  // const funeralapprovalClose = () => {
  //   issetfuneralapprovalOpen(false);
  // };

  // const notificationOpen = (val: any) => {
  //   setisnotificationOpen(true);
  //   setcriticalbenefit(val);
  // };
  // const notificationClose = () => {
  //   setisnotificationOpen(false);
  // };
  // const aprrovefexr = () => {
  //   axios
  //     .post(
  //       `http://localhost:3000/api/v1/customerservice/fxapprove/${criticalbenefit.PolicyID}/${criticalbenefit.BenefitID}`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .then((resp) => {
  //       funeralapprovalClose();
  //       handleClose();
  //       setNotify({
  //         isOpen: true,
  //         message: "Approved Successfully",
  //         type: "success",
  //       });
  //     })
  //     .catch((err) => {
  //       setNotify({
  //         isOpen: true,
  //         message: err?.error,
  //         type: "error",
  //       });
  //     });
  // };
  // const rejectfexr = () => {
  //   axios
  //     .post(
  //       `http://localhost:3000/api/v1/customerservice/fxreject/${criticalbenefit.PolicyID}/${criticalbenefit.BenefitID}`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .then((resp) => {
  //       funeralapprovalClose();
  //       handleClose();
  //       setNotify({
  //         isOpen: true,
  //         message: "Rejected Successfully",
  //         type: "success",
  //       });
  //     })
  //     .catch((err) => {
  //       setNotify({
  //         isOpen: true,
  //         message: err?.error,
  //         type: "error",
  //       });
  //     });
  // };
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    funeralval: any
  ) => {
    const { name, value } = e.target;
    setfuneralcheck(funeralval);
    isChecked.current = e.target.checked;
  };

  const [criticaltypeData, setcriticaltypeData] = useState([]);
  const companyId = useAppSelector(
    (state: any) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state: any) => state.users.user.message.languageId
  );
  const getcriticalTypeData = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setcriticaltypeData(resp.data?.param?.data?.dataPairs);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getcriticalTypeData(companyId, "P0050", languageId, "CRITICAL");
    return () => {};
  }, []);
  return (
    <div>
      <CustomFuneralFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={savefuneralOpen}
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
                    <th>Status</th>
                    <th>SumAssured</th>
                    <th>Term</th>
                    <th>Premium Term</th>
                    <th>Premium</th>
                  </tr>
                </thead>
                {funeralBenefits?.map((val: any, index: number) => (
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
                        value={val?.ID}
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
                        value={val?.BStatus}
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
                        value={val?.BTerm}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BPTerm}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.BPrem}
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomFuneralFullModal>
      <SaveFuneral
        open={saveisfuneralOpen}
        handleClose={savefuneralClose}
        savefuneralobj={isnext ? funeralcheck : savefuneralobj}
        isnext={isnext}
        handleFormSubmit={isnext ? postfuneral : savefuneral}
        funeralentry={funeralentry}
        criticaltypeData={criticaltypeData}
        handlefuneralchange={handlefuneralchange}
        funeralObj={funeralObj}
        handleIncidentDate={handleIncidentDate}
        handleReceivedDate={handleReceivedDate}
        funeralcheck={funeralcheck}
      />
    </div>
  );
}

export default FuneralModal;
