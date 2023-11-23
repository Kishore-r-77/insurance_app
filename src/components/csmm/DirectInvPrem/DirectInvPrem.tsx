import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomDirectInvPremModal from "./CustomDirectInvPremModal";
import styles from "./directInvPrem.module.css";
import axios from "axios";
function DirectInvPrem({
  open,
  handleClose,
  inverstPremData,
  iplBenefits,
  iplFundData,
  ilpAllowed,
  ilpSelectedFund,
  setilpSelectedFund,
  checkIlpFunds,
  saveIlpFunds,
  percentageData,
  isSave,
  polid,
  benId,
  setbenId,
  setClientID,
  setilpAllowed,
  setbcoverage,
  bcoverage,
}: any) {
  const title: string = "Premium Direction";
  const isChecked = useRef(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setilpAllowed(
      ilpAllowed.map((fundDetails: any, index: number) => {
        if (index === i) {
          return { ...fundDetails, [name]: value };
        } else return fundDetails;
      })
    );
  };
  // const [benId, setbenId] = useState("");
  // const [Benefit, setBenefit] = useState<any>([]);

  const [exfunds, setexfunds] = useState([]);
  const getfundsbybenefitandpol = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilpfundbypolandben/${polid}/${benId}}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setexfunds(resp.data["Ilp Funds"]);
      });
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
    index: number
  ) => {
    let updateValue = { ...value, isChecked: true };
    if (e.target.checked) {
      const updateArr = [...ilpSelectedFund, updateValue];
      setilpSelectedFund(updateArr);
    }
    if (!e.target.checked) {
      console.log(index, "index");
      updateValue = { ...value, isChecked: false };
      const updateArr = [...ilpSelectedFund, updateValue];
      const itemIndex = ilpSelectedFund.indexOf(updateValue);
      updateArr.splice(itemIndex, 1);
      setilpSelectedFund(updateArr);
    }
  };
  const handleCheckfund = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    val: any
  ) => {
    const { name, value } = e.target;
    setbenId(iplBenefits[i].ID);
    setClientID(iplBenefits[i].ClientID);
    setbcoverage(iplBenefits[i].BCoverage);

    isChecked.current = e.target.checked;
  };
  useLayoutEffect(() => {
    getfundsbybenefitandpol();
    return () => {};
  }, [benId]);
  useEffect(() => {
    setbenId("");

    return () => {};
  }, [open]);
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
              <Table
                striped
                bordered
                hover
                style={{
                  width: "100%",
                  tableLayout: "fixed",
                  position: "relative",
                }}
              >
                <thead className={styles.header}>
                  <tr>
                    <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        width: "100%",
                      }}
                    >
                      Selected
                    </th>
                    <th style={{ width: "100%" }}>Policy ID</th>
                    <th style={{ width: "100%" }}>Benefit ID</th>
                    <th style={{ width: "100%" }}>Client ID</th>
                    <th style={{ width: "100%" }}>BCoverage</th>
                    <th style={{ width: "100%" }}>BStart Date</th>
                    <th style={{ width: "100%" }}>BSumAssured</th>
                    <th style={{ width: "100%" }}>BTerm</th>
                    <th style={{ width: "100%" }}>BPTerm</th>
                    <th style={{ width: "100%" }}>BPrem</th>
                    <th style={{ width: "100%" }}>BGender</th>
                    <th style={{ width: "100%" }}>BDOB</th>
                  </tr>
                </thead>
                {iplBenefits?.map((val: any, index: number) => {
                  return (
                    <>
                      <CustomModal size="xl"></CustomModal>
                      <tr>
                        <td>
                          <input
                            className={styles["input-form"]}
                            style={{
                              position: "sticky",
                              left: 0,
                            }}
                            type="radio"
                            name="Select"
                            onChange={(e) => handleCheckfund(e, index, val)}
                          />
                        </td>
                        <td className={styles["td-class"]}>
                          <input
                            className={styles["input-form"]}
                            type="text"
                            disabled
                            value={val?.PolicyID}
                          />
                        </td>
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
          <TreeItem nodeId="3" label={`Existing Fund Allocation`}>
            <Paper className={styles.paperStyle}>
              {benId.length !== 0 && (
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
                  {exfunds?.map((val: any, index: number) => {
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
              )}
            </Paper>
          </TreeItem>
          <TreeItem nodeId="4" label={`New Fund Allocation`}>
            <Paper className={styles.paperStyle}>
              {bcoverage.length !== 0 && (
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
                    const isChecked = ilpSelectedFund.some(
                      (selected: { id: any; isChecked: any }) =>
                        selected.id === val.id && selected.isChecked
                    );
                    return (
                      <>
                        <tr key={val.id}>
                          <td>
                            <input
                              className={styles["input-form"]}
                              style={{
                                position: "sticky",
                                left: 0,
                              }}
                              type="checkbox"
                              name="Select"
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
                              disabled={!isChecked}
                              name="FundPercentage"
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
              )}
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomDirectInvPremModal>
    </div>
  );
}

export default DirectInvPrem;
