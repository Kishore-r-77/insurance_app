import React, { useRef, useState } from "react";
import CustomDirectInvPremModal from "./CustomDirectInvPremModal";
import { TreeItem, TreeView } from "@mui/lab";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, TextField } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Table } from "react-bootstrap";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from "./directInvPrem.module.css";
import moment from "moment";
import CustomModal from "../../../utilities/modal/CustomModal";
import Client from "../../clientDetails/client/Client";
import ClientEnquiry from "../../claims/newBusinessModal/enquiry/ClientEnquiry";
import axios from "axios";
function DirectInvPrem({
  open,
  handleClose,
  inverstPremData,
  iplBenefits,
  setilpBenefits,
  iplFundData,
  setilpFundData,
  setilpAllowed,
  ilpAllowed,
  isDirectInvPrem,
  ilpSelectedFund,
  setilpSelectedFund,
  checkIlpFunds,
  saveIlpFunds,
  percentageData,
  setpercentageData,
  isSave,
}: any) {
  const title: string = "Direct Investment premium";
  const isChecked = useRef(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setilpSelectedFund(
      ilpSelectedFund.map((fundDetails: any, index: number) => {
        if (index === i) {
          return { ...fundDetails, [name]: value };
        } else return fundDetails;
      })
    );
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    const updateValue = { ...value, FundPercentage: percentageData };
    if (e.target.checked) {
      const updateArr = [...ilpSelectedFund, updateValue];
      setilpSelectedFund(updateArr);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      const updateArr = [...ilpSelectedFund];
      const itemIndex = ilpSelectedFund.indexOf(updateValue);
      updateArr.splice(itemIndex, 1);
      setilpSelectedFund(updateArr);
    }
  };
  // console.log(ilpSelectedFund, "QQQQQQQ");
  // const dataIndex = useRef(0);
  return (
    <div>
      <CustomDirectInvPremModal
        open={open}
        handleClose={handleClose}
        title={title}
        isSave={isSave}
        handleFormSubmit={isSave ? saveIlpFunds : checkIlpFunds}
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
                  value={inverstPremData?.CompanyID}
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
                  value={inverstPremData?.ID}
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
                  value={inverstPremData?.PProduct}
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
                  value={inverstPremData?.PFreq}
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
                    // isSave ? premium?.current : inverstPremData?.InstalmentPremium
                    inverstPremData?.InstalmentPrem
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
                    inverstPremData?.BillToDate === ""
                      ? ""
                      : moment(inverstPremData?.BillToDate).format("DD-MM-YYYY")
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
                    inverstPremData?.PaidToDate === ""
                      ? ""
                      : moment(inverstPremData?.PaidToDate).format("DD-MM-YYYY")
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
                    <th>Policy ID</th>
                    <th>Client ID</th>
                    <th>BCoverage</th>
                    <th>BStart Date</th>
                    <th>BSumAssured</th>
                    <th>BTerm</th>
                    <th>BPTerm</th>
                    <th>BPrem</th>
                    <th>BGender</th>
                    <th>BDOB</th>
                  </tr>
                </thead>
                {iplBenefits?.map((val: any, index: number) => {
                  return (
                    <>
                      <CustomModal size="xl"></CustomModal>
                      <tr>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.PolicyID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.ClientID}
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
                            value={moment(val?.BStartDate).format("DD-MM-YYYY")}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            name="BSumAssured"
                            disabled={val?.Select === ""}
                            style={{
                              backgroundColor:
                                val.Select === "X" ? "#caccca" : "",
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.BSumAssured}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            name="BTerm"
                            disabled={val?.Select === ""}
                            style={{
                              backgroundColor:
                                val.Select === "X" ? "#caccca" : "",
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.BTerm}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            name="BPTerm"
                            disabled={val?.Select === ""}
                            style={{
                              backgroundColor:
                                val.Select === "X" ? "#caccca" : "",
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.BPTerm}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            name="BPrem"
                            disabled={val?.Select === ""}
                            style={{
                              backgroundColor:
                                val.Select === "X" ? "#caccca" : "",
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.BPrem}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.BGender}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={moment(val?.BDOB).format("DD-MM-YYYY")}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            </Paper>
          </TreeItem>
          <TreeItem nodeId="3" label={`Existing ILP Funds`}>
            <Paper className={styles.paperStyle}>
              <Table striped bordered hover style={{ position: "relative" }}>
                <thead className={styles.header}>
                  <tr>
                    <th>ID</th>
                    <th>Policy ID</th>
                    <th>Benefit ID</th>
                    <th>Fund Code</th>
                    <th>Fund Type</th>
                    <th>Fund Currency</th>
                    <th>Fund Percentage</th>
                    <th>Effective Date</th>
                  </tr>
                </thead>
                {iplFundData?.map((val: any, index: number) => {
                  return (
                    <>
                      <CustomModal size="xl"></CustomModal>
                      <tr>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.ID}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.PolicyID}
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
                            value={val?.FundCode}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundType}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundCurr}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundPercentage}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={moment(val?.EffectiveDate).format(
                              "DD-MM-YYYY"
                            )}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            </Paper>
          </TreeItem>
          <TreeItem nodeId="4" label={`New ILP Funds`}>
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

                    <th>Fund Category</th>
                    <th>Fund Code</th>
                    <th>Fund Currency</th>
                    <th>Fund Type</th>
                    <th>Fund Percentage</th>
                  </tr>
                </thead>
                {ilpAllowed?.map((val: any, index: number) => {
                  // {
                  //   fundDetailsdata?.map((val: any, index: number) => {});
                  // }

                  return (
                    <>
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
                            // defaultChecked={val.Select === "X"}
                            // // value={val.Select[index]}
                            // checked={val?.Select === "X"}
                            onChange={(e) => handleCheck(e, val, index)}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val.FundCategory}
                          />
                        </td>

                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundCode}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundCurr}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.FundType}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            name="FundPercentage"
                            // disabled={val?.Select === ""}
                            // style={{
                            //   backgroundColor:
                            //     val.Select === "X" ? "#caccca" : "",
                            // }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            value={val?.FundPercentage}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomDirectInvPremModal>
    </div>
  );
}

export default DirectInvPrem;
