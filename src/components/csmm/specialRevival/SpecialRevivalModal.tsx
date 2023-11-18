import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";

import CustomSrFullModal from "./CustomSrFullModal";
import styles from "./specialRevivalModal.module.css";

function SpecialRevivalModal({
  open,
  modifiedPremium,
  handleClose,
  saChangeObj,
  saChangeBenefits,
  setsaChangeBenefits,
  postSaChange,
  isSave,
  savespecialrevival,
  SpRev,
  getData,
}: any) {
  const title: string = "Special Revival";
  const isChecked = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    setsaChangeBenefits(
      saChangeBenefits.map((benefits: any, index: number) => {
        if (index === i) {
          return { ...benefits, [name]: parseInt(value) };
        } else return benefits;
      })
    );
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;

    console.log(e.target.checked, "checked");

    isChecked.current = e.target.checked;
    setsaChangeBenefits(
      saChangeBenefits.map((benefits: any, index: number) => {
        if (index === i && isChecked.current) {
          return { ...benefits, Select: "X" };
        } else if (index === i && !isChecked.current) {
          return { ...benefits, Select: "" };
        } else return benefits;
      })
    );
  };
  
  

  return (
    <div>
      <CustomSrFullModal
        open={open}
        handleClose={handleClose}
        title={title}
        //isSave={isSave}
        handleFormSubmit={savespecialrevival }
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
                  value={SpRev?.CompanyID}
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
                  value={SpRev?.PolicyID}
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
                  id="EffectiveDate"
                  name="EffectiveDate"
                  value={
                    SpRev?.EffectiveDate === ""
                      ? ""
                      : moment(SpRev?.EffectiveDate).format("DD-MM-YYYY")
                  }
                  placeholder="EffectiveDate "
                  label="EffectiveDate"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="DifferenceinPrem"
                  name="DifferenceinPrem"
                  value={SpRev?.DifferenceinPrem}
                  placeholder="DifferenceinPrem"
                  label="DifferenceinPrem"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="NewPolicyStatus"
                  name="NewPolicyStatus"
                  value={SpRev?.NewPolicyStatus}
                  placeholder="NewPolicyStatus"
                  label="NewPolicyStatus"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="NewPaidToDate"
                  name="NewPaidToDate"
                  value={
                    SpRev?.NewPaidToDate === ""
                      ? ""
                      : moment(SpRev?.NewPaidToDate).format("DD-MM-YYYY")
                  }
                  placeholder="NewPaidToDate"
                  label="NewPaidToDate"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="NewBillToDate"
                  name="NewBillToDate"
                  value={
                    SpRev?.NewBillToDate === ""
                      ? ""
                      : moment(SpRev?.NewBillToDate).format("DD-MM-YYYY")
                  }
                  placeholder="NewBillToDate"
                  label="NewBillToDate"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="NewPremium"
                  name="NewPremium"
                  value={SpRev?.NewPremium}
                  placeholder="NewPremium"
                  label="NewPremium"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="NewStartDate"
                  name="NewStartDate"
                  value={
                    SpRev?.NewStartDate === ""
                      ? ""
                      : moment(SpRev?.NewStartDate).format("DD-MM-YYYY")
                  }
                  placeholder="NewStartDate"
                  label="NewStartDate"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
              <Grid2 container justifyContent="center" alignItems="center" xs={8} md={6} lg={4}>
                 <TextField
                   InputProps={{ readOnly: true }}
                   id="AmountInDeposit"
                   name="AmountInDeposit"
                   value={SpRev?.AmountInDeposit}
                   placeholder="AmountInDeposit"
                   label="AmountInDeposit"
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
                    {/* <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 2,
                        overflow: "hidden",
                      }}
                    >
                      Selected
                    </th> */}
                    <th
                      style={{
                        zIndex: -1,
                      }}
                    >
                      BenefitID
                    </th>
                    <th>BCoverage</th>
                    <th>NewAge</th>
                    <th>NewAnnPremium</th>
                    <th>NewModalPrem</th>
                    <th>NPremCessAge</th>
                    <th>NPremCessDate</th>
                    <th>NPremCessTerm</th>
                    <th>NewRCD</th>
                    <th>NRiskCessAge</th>
                    <th>NRiskCessDate</th>
                    <th>NRiskCessTerm</th>
                    <th>NewStatus</th>
                    <th>PolicyID</th>
                    <th>SumAssured</th>
                    <th></th>
                  </tr>
                </thead>
                {SpRev?.SpecialRevivalDetails?.map((val: any, index: number) => (
                  <tr>
                    {/* <td>
                      <input
                        className={styles["input-form"]}
                        style={{
                          position: "sticky",
                          left: 0,
                        }}
                        type="checkbox"
                        name="Select"
                       //defaultChecked={val?.Select === "X"}
                        //value={val?.Select[index]}
                        //checked={val?.Select === "X"}
                        //onChange={(e) => handleCheck(e, index)}
                      />
                    </td> */}
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
                        value={val?.Coverage}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewAge}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewBaseAnnualPrem}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewModalPrem}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewPremCessAge}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                         type="text"
                         disabled
                        value={moment(val?.NewPremCessDate).format("DD-MM-YYYY")}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewPremCessTerm}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={moment(val?.NewRCD).format("DD-MM-YYYY")}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewRiskCessAge}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={moment(val?.NewRiskCessDate).format("DD-MM-YYYY")}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewRiskCessTerm}
                      />
                    </td>
                    <td className={styles["td-class"]}>
                      <input
                        className={styles["input-form"]}
                        type="text"
                        disabled
                        value={val?.NewStatus}
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
                        value={val?.SumAssured}
                      />
                    </td>
                   
                  </tr>
                ))}
              </Table>
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomSrFullModal>
    </div>
  );
}

export default SpecialRevivalModal;
