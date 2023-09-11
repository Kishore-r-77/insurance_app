import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
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
import { useAppSelector } from "../../../redux/app/hooks";
import { p0050 } from "../../clientDetails/bank/bankApis/bankApis";
import CustomIBenefitModal from "./CustomIBenefitModal";
import styles from "./IBenefitModal.module.css";
import SaveIB from "./IBsaveModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationModal from "../../../utilities/modal/NotificationModal";
import axios from "axios";
import ApprovIB from "./ApproveIBModal";
import CustomAPIB from "./CustomAPIB";

function APModal({
  open,

  handleClose,
  IBenefitData,
  IBenefits,
  //setIBenefits,
  postIBenefit,
  isSave,
  saveIBenefit,
  setbenefitcheck,
  benefitentry,
  handleIBenefitchange,
  isIBnext,
  setisIBnext,
  handleIBIncidentDate,
  handleIBReceivedDate,
  savebenefitobj,
  benefitcheck,
  saveibenefitOpen,
  saveibenefitClose,
  saveisIBopen,
  apBenefits,
  setNotify,
  rejectFormSubmit,
}: any) {
  const title: string = "Income Benefit";
  const isChecked = useRef(false);
  // console.log(IBenefitData, "IBenefitData");
  // console.log(IBenefits, "IBenefits");
  const [isNotifiyopen, setisNotifiyopen] = useState(false);
  const [IBapprovebenefit, setIBapprovebenefit] = useState<any>({});
  const notifyopen = (valu: any) => {
    setisNotifiyopen(true);
    setIBapprovebenefit(valu);
  };
  const notifyclose = () => {
    setisNotifiyopen(false);
  };

  const aprroveib = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ibapprove/${apBenefits[0]?.PolicyID}/${apBenefits[0]?.BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        IBapprovalModalClose();
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
  //rejection
  const rejectib = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/ibreject/${apBenefits[0]?.PolicyID}/${apBenefits[0]?.BenefitID}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        //IBrejectModalClose();
        IBapprovalModalClose();
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

  /// new

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const { name, value } = e.target;

  //   setIBenefits(
  //     IBenefits.map((benefits: any, index: number) => {
  //       if (index === i) {
  //         return { ...benefits, [name]: parseInt(value) };
  //       } else return benefits;
  //     })
  //   );
  // };
  const [isclick, setisclick] = useState(false);
  const [IBvalcheck, setIBvalcheck] = useState({});
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    benefitval: any
  ) => {
    const { name, value } = e.target;

    console.log(e.target.checked, "checked");
    setIBvalcheck(benefitval);
    isChecked.current = e.target.checked;
    setisclick(e.target.checked);
  };
  /////////

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  /////////
  const [IBData, setIBData] = useState([]);
  const getIBData = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setIBData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };
  useEffect(() => {
    getIBData(companyId, "P0050", languageId, "FREQ");
    return () => {};
  }, []);
  console.log(isIBnext, "isIBnexttttttttttttt");
  const [isapprovalmodal, setisapprovalmodal] = useState(false);

  const IBapprovalModalOpen = (value: any) => {
    setisapprovalmodal(true);
  };
  const IBapprovalModalClose = () => {
    setisapprovalmodal(false);
  };

  return (
    <div>
      <CustomAPIB
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={IBapprovalModalOpen} /////
        //rejectFormSubmit={IBapprovalModalOpen} //rj
        isclick={isclick}
        //handleFormSubmit={isSave ? saveIBenefit : postIBenefit}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1", "2", "3"]}
        >
          <TreeItem nodeId="1" label={`Policies`}>
            <Grid2 container spacing={2}>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="CompanyID"
                  name="CompanyID"
                  value={IBenefitData?.CompanyID}
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
                  value={IBenefitData?.ID}
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
                  value={IBenefitData?.PProduct}
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
                  value={IBenefitData?.PFreq}
                  placeholder="Frequency"
                  label="Frequency"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              {/* <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="InstalmentPremium"
                  name="InstalmentPremium"
                  value={
                    isSave
                      ? modifiedPremium?.current
                      : IBenefitData?.InstalmentPrem
                  }
                  placeholder="Install Premium"
                  label="Install Premium"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2> */}
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="BillToDate"
                  name="BillToDate"
                  value={
                    IBenefitData?.BillToDate === ""
                      ? ""
                      : moment(IBenefitData?.BillToDate).format("DD-MM-YYYY")
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
                    IBenefitData?.PaidToDate === ""
                      ? ""
                      : moment(IBenefitData?.PaidToDate).format("DD-MM-YYYY")
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
                    <th>SumAssured</th>
                    <th>IncedentDate</th>
                    <th>Received Date</th>
                    <th>Pay Frequency</th>
                    {/* <th>Next</th> */}
                    {/* <th>Frequency</th>
                    <th>IncidentDate</th>
                    <th>ReceivedDate</th> */}
                  </tr>
                </thead>
                {apBenefits?.map((val: any, index: number) => (
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
                        //defaultChecked={val.Select === "X"}
                        //value={val.Select[index]}

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
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.PayFrequency}
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            </Paper>
          </TreeItem>
          {/* {apBenefits.length === 0 ? null : (
            <TreeItem nodeId="3" label={`Approval`}>
              <Paper className={styles.paperStyle}>
                <Table striped bordered hover style={{ position: "relative" }}>
                  <thead className={styles.header}>
                    <tr>
                      <th>Approve</th>
                      <th>Benefit ID</th>
                      <th>Coverage</th>
                      <th>PayFrequency</th>
                      <th>IncidentDate</th>
                      <th>ReceivedDate</th>
                      <th>ClaimAmount</th>
                    </tr>
                  </thead>
                  {apBenefits?.map((valu: any, index: number) => (
                    <tr>
                      <td>
                        <IconButton
                          color="success"
                          onClick={() => notifyopen(valu)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={valu?.BenefitID}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={valu?.BCoverage}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={valu?.PayFrequency}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={moment(valu?.IncidentDate).format(
                            "DD-MM-YYYY"
                          )}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={moment(valu?.ReceivedDate).format(
                            "DD-MM-YYYY"
                          )}
                        />
                      </td>
                      <td className={styles["td-class"]}>
                        <input
                          className={styles["input-form"]}
                          type="text"
                          disabled
                          value={valu?.ClaimAmount}
                        />
                      </td>
                    </tr>
                  ))}
                </Table>
                <NotificationModal
                  title="Approval Notification"
                  handleFormSubmit={IBapprovalModalOpen}
                  open={isNotifiyopen}
                  handleClose={notifyclose}
                >
                  <h2>Are you sure you want to Approve?</h2>
                </NotificationModal>
              </Paper>
            </TreeItem>
          )} */}
        </TreeView>
      </CustomAPIB>
      <SaveIB
        open={saveisIBopen}
        handleClose={saveibenefitClose}
        IBenefitData={IBenefitData}
        IBData={IBData}
        benefitentry={benefitentry}
        handleIBenefitchange={handleIBenefitchange}
        isIBnext={isIBnext}
        handleFormSubmit={isIBnext ? postIBenefit : saveIBenefit}
        handleIBIncidentDate={handleIBIncidentDate}
        handleIBReceivedDate={handleIBReceivedDate}
        savebenefitobj={isIBnext ? benefitcheck : savebenefitobj}
        benefitcheck={benefitcheck}
      />
      <ApprovIB
        open={isapprovalmodal}
        handleClose={IBapprovalModalClose} //IBapprovalModalClos
        handleFormSubmit={aprroveib}
        IBapprovebenefit={IBapprovebenefit}
        apBenefits={apBenefits}
        IBvalcheck={IBvalcheck}
        handleFormReject={rejectib}
        //rejectFormSubmit={rejectib} //rj
        //rejectmodalclose={IBrejectModalClose} //rj
      />
    </div>
  );
}

export default APModal;
