import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import { getLAByPolicy } from "../surrenderModal/surrenderApi";
import CustomIlpSurrFullModal from "./CustomIlpSurrFullModal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, Paper, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  ACTIONS,
  columns,
  ilpSurrenderInitialValue,
} from "../../../reducerUtilities/actions/IlpSurrender/IlpSurrenderActions";
import {
  paramItem,
  postIlpSurrender,
  saveIlpSurrender,
} from "./ilpsurrenderApi";
import moment from "moment";
import { Table } from "react-bootstrap";
import styles from "./IlpSurrenderModal.module.css";
import CustomModal from "../../../utilities/modal/CustomModal";
function IlpSurrenderModal({
  open,

  policyRecord,
  getData,
  ilpsurrenderState,
  ilpsurrenderDispatch,
}: any) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const isSave = useRef(false);

  const title: string = "ILP Surrender";
  const size = "xl";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [clientsByPolicy, setclientsByPolicy] = useState();

  const getLAByPolicy1 = (policyId: number) => {
    return getLAByPolicy(policyId).then((resp) => {
      setclientsByPolicy(resp.data?.Clients);
    });
  };

  useEffect(() => {
    getLAByPolicy1(parseInt(ilpsurrenderState.PolicyID));
    return () => {};
  }, [ilpsurrenderState.PolicyID]);
  const [surrDdata, setsurrDdata] = useState<any>([{}, {}, {}, {}, {}]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setsurrDdata(
      surrDdata.map((surrDetails: any, index: number) => {
        if (index === i) {
          return { ...surrDetails, [name]: value };
        } else return surrDetails;
      })
    );
  };

  const [surrHData, setsurrHData] = useState<any>({});
  const [ilpFundData, setilpFundData] = useState([]);
  const surrenderCreate = () => {
    return postIlpSurrender(
      ilpsurrenderState,
      companyId,
      policyRecord.ID,
      policyRecord.ClientID
    )
      .then((resp: any) => {
        isSave.current = true;
        setsurrHData(resp.data?.SurrH);
        setsurrDdata(resp.data?.SurrDs);
        setilpFundData(resp.data?.IlpFunds);
        if (ilpsurrenderState.Function === "Fill") {
          ilpsurrenderDispatch({ type: ACTIONS.COMMITOPEN });

          ilpsurrenderState.Function = "Commit";
        } else {
          ilpsurrenderDispatch({ type: ACTIONS.COMMITCLOSE });
          ilpsurrenderDispatch({ type: ACTIONS.ADDCLOSE });
          setNotify({
            isOpen: true,
            message: `Surrender record  id: ${resp.data?.Created}`,
            type: "success",
          });
        }
      })
      .catch((err: any) => err.message);
  };
  const surrenderPolicy = () => {
    return saveIlpSurrender(
      policyRecord.ID,
      companyId,
      surrHData,
      surrDdata,
      ilpsurrenderState
    )
      .then((resp: any) => {
        isSave.current = false;
        ilpsurrenderDispatch({ type: ACTIONS.ILPSURRENDERCLOSE });
        getData();
        setNotify({
          isOpen: false,
          message: `Surrender record  id: ${resp.data?.Created}`,
          type: "success",
        });
      })
      .catch((err: any) => err.message);
  };
  const [causeOfSurrenderData, setcauseOfSurrenderData] = useState([]);
  const causeOfSurrenderMenu = () => {
    return paramItem(companyId, "P0047", languageId)
      .then((resp) => {
        setcauseOfSurrenderData(resp.data?.data);
      })
      .catch((err) => err.message);
  };
  useEffect(() => {
    getCompanyData(companyId);
    causeOfSurrenderMenu();
    return () => {};
  }, []);

  return (
    <div>
      <CustomIlpSurrFullModal
        open={ilpsurrenderState.ilpsurrenderOpen}
        commit={ilpsurrenderState.commitOpen}
        handleFormSubmit={isSave.current ? surrenderPolicy : surrenderCreate}
        handleClose={() =>
          ilpsurrenderDispatch({ type: ACTIONS.ILPSURRENDERCLOSE })
        }
        title={title}
        isSave={isSave.current}
      >
        <form>
          <TreeView
            style={{ width: "90%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1"]}
          >
            <TreeItem nodeId="1" label={``}>
              <Grid2
                container
                spacing={2}
                style={{ width: "95%", margin: "0px auto" }}
              >
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={policyRecord?.CompanyID}
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
                    value={policyRecord?.ID}
                    placeholder="policyId"
                    label="policyId"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid2>

                {/* <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    name="ClientID"
                    value={surrender?.ClientID}
                    placeholder="clientId"
                    label="clientId"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid2> */}

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={ilpsurrenderState.infoOpen}
                        label="EffectiveDate"
                        inputFormat="DD/MM/YYYY"
                        value={ilpsurrenderState.EffectiveDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          ilpsurrenderDispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date?.$d,
                            fieldName: "EffectiveDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={ilpsurrenderState.infoOpen}
                        label="Surrender Date"
                        inputFormat="DD/MM/YYYY"
                        value={ilpsurrenderState.SurrDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          ilpsurrenderDispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date?.$d,
                            fieldName: "SurrDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Cause"
                    name="Cause"
                    value={ilpsurrenderState.Cause}
                    placeholder="Cause"
                    label="Cause"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      ilpsurrenderDispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Cause",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {causeOfSurrenderData.map((value: any) => (
                      <MenuItem key={value.item} value={value.item}>
                        {value.item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="SurrPercentage"
                    name="SurrPercentage"
                    value={ilpsurrenderState.SurrPercentage}
                    placeholder="Surrender Percentage"
                    label="Surrender Percentage"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      ilpsurrenderDispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "SurrPercentage",
                      })
                    }
                    fullWidth
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={12}>
                  <TextField
                    multiline
                    id="ReasonDescription"
                    name="ReasonDescription"
                    value={ilpsurrenderState.ReasonDescription}
                    placeholder="Reason Description"
                    label="Reseon Description"
                    fullWidth
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      ilpsurrenderDispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ReasonDescription",
                      })
                    }
                  />
                </Grid2>
              </Grid2>
              {ilpsurrenderState.commitOpen ? (
                <Grid2
                  container
                  spacing={2}
                  style={{ width: "95%", margin: "0px auto" }}
                >
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="paidToDate"
                      name="paidToDate"
                      value={moment(surrHData?.paidToDate).format("YYYY-MM-DD")}
                      placeholder="paidToDate"
                      label="paidToDate"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="BillDate"
                      name="BillDate"
                      value={moment(surrHData?.BillDate).format("YYYY-MM-DD")}
                      placeholder="BillDate"
                      label="BillDate"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="Product"
                      name="Product"
                      value={surrHData?.Product}
                      placeholder="Product"
                      label="Product"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="AplAmount"
                      name="AplAmount"
                      value={surrHData?.AplAmount}
                      placeholder="AplAmount"
                      label="AplAmount"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="LoanAmount"
                      name="LoanAmount"
                      value={surrHData?.LoanAmount}
                      placeholder="LoanAmount"
                      label="LoanAmount"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="PolicyDepost"
                      name="PolicyDepost"
                      value={surrHData?.PolicyDepost}
                      placeholder="PolicyDepost"
                      label="PolicyDepost"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>

                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="CashDeposit"
                      name="CashDeposit"
                      value={surrHData?.CashDeposit}
                      placeholder="CashDeposit"
                      label="CashDeposit"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="RefundPrem"
                      name="RefundPrem"
                      value={surrHData?.RefundPrem}
                      placeholder="RefundPrem"
                      label="RefundPrem"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="PremTolerance"
                      name="PremTolerance"
                      value={surrHData?.PremTolerance}
                      placeholder="PremTolerance"
                      label="PremTolerance"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>

                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="AdjustedAmount"
                      name="AdjustedAmount"
                      value={surrHData?.AdjustedAmount}
                      placeholder="AdjustedAmount"
                      label="AdjustedAmount"
                      // InputLabelProps={{ shrink: true }}
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      //   handleChange(e, index)
                      // }
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="TotalSurrPayable"
                      name="TotalSurrPayable"
                      value={surrHData?.TotalSurrPayable}
                      placeholder="TotalSurrPayable"
                      label="TotalSurrPayable"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                </Grid2>
              ) : null}
            </TreeItem>

            {ilpsurrenderState.commitOpen ? (
              <>
                {surrDdata.map((SurrDdata: any, index: number) => (
                  <>
                    {SurrDdata.BCoverage === "" ? null : (
                      <div style={{ display: "flex" }}>
                        <TreeItem
                          nodeId={(index + 2).toString()}
                          label={`Benefits`}
                          style={{ minWidth: "95%", margin: "0px 1rem" }}
                        >
                          <Grid2 container spacing={2}>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                id="BCoverage"
                                name="BCoverage"
                                value={SurrDdata.BCoverage}
                                placeholder="BCoverage"
                                label="BCoverage"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {/* {bCoverageData.map((val: any) => (
                              <MenuItem
                                key={val.Coverage}
                                value={val.Coverage}
                              >
                                {val.Coverage}
                              </MenuItem>
                            ))} */}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="BSumAssured"
                                name="BSumAssured"
                                value={SurrDdata.BSumAssured}
                                placeholder="b_sum_assured"
                                label="b_sum_assured"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="RevBonus"
                                name="RevBonus"
                                value={SurrDdata.RevBonus}
                                placeholder="RevBonus"
                                label="RevBonus"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="AddlBonus"
                                name="AddlBonus"
                                value={SurrDdata.AddlBonus}
                                placeholder="AddlBonus"
                                label="AddlBonus"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="TerminalBonus"
                                name="TerminalBonus"
                                value={SurrDdata.TerminalBonus}
                                placeholder="TerminalBonus"
                                label="TerminalBonus"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="InterimBonus"
                                name="InterimBonus"
                                value={SurrDdata.InterimBonus}
                                placeholder="InterimBonus"
                                label="InterimBonus"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="LoyaltyBonus"
                                name="LoyaltyBonus"
                                value={SurrDdata.LoyaltyBonus}
                                placeholder="LoyaltyBonus"
                                label="LoyaltyBonus"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="OtherAmount"
                                name="OtherAmount"
                                value={SurrDdata.OtherAmount}
                                placeholder="OtherAmount"
                                label="OtherAmount"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="AccumDividend"
                                name="AccumDividend"
                                value={SurrDdata.AccumDividend}
                                placeholder="AccumDividend"
                                label="AccumDividend"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="AccumDivInt"
                                name="AccumDivInt"
                                value={SurrDdata.AccumDivInt}
                                placeholder="AccumDivInt"
                                label="AccumDivInt"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="TotalFundValue"
                                name="TotalFundValue"
                                value={SurrDdata.TotalFundValue}
                                placeholder="TotalFundValue"
                                label="TotalFundValue"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="SurrPenalty"
                                name="SurrPenalty"
                                value={SurrDdata.SurrPenalty}
                                placeholder="Surrender Penalty"
                                label="Surrender Penalty"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="SurrTax"
                                name="SurrTax"
                                value={SurrDdata.SurrTax}
                                placeholder="Surrender Tax"
                                label="Surrender Tax"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="SurrAmount"
                                name="SurrAmount"
                                value={SurrDdata.SurrAmount}
                                placeholder="SurrAmount"
                                label="SurrAmount"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="TotalSurrAmount"
                                name="TotalSurrAmount"
                                value={SurrDdata.TotalSurrAmount}
                                placeholder="TotalSurrAmount"
                                label="TotalSurrAmount"
                                inputProps={{ readOnly: true }}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                          </Grid2>
                        </TreeItem>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "5px",
                          }}
                        >
                          {/* {deathDdata.length - 1 === index &&
                        deathDdata.length < 4 && (
                          <Button
                            variant="contained"
                            onClick={() => handleDeathDAdd()}
                            style={{
                              maxWidth: "40px",
                              maxHeight: "40px",
                              minWidth: "40px",
                              minHeight: "40px",
                              backgroundColor: "#0a3161",
                            }}
                          >
                            <AddBoxRoundedIcon />
                          </Button>
                        )}

                      {deathDdata.length !== 1 && (
                        <Button
                          onClick={() => handleDeathDRemove(index)}
                          variant="contained"
                          style={{
                            maxWidth: "40px",
                            maxHeight: "40px",
                            minWidth: "40px",
                            minHeight: "40px",
                            backgroundColor: "crimson",
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )} */}
                        </div>
                      </div>
                    )}
                  </>
                ))}
                <TreeItem nodeId="3" label={`Existing ILP Funds`}>
                  <Paper className={styles.paperStyle}>
                    <Table
                      striped
                      bordered
                      hover
                      style={{ position: "relative" }}
                    >
                      <thead className={styles.header}>
                        <tr>
                          <th>ID</th>
                          <th>Policy ID</th>
                          <th>Benefit ID</th>
                          <th>Fund Code</th>
                          <th>Fund Type</th>
                          <th>Fund Currency</th>
                          <th>Fund Units</th>
                          <th>Effective Date</th>
                        </tr>
                      </thead>
                      {ilpFundData?.map((val: any, index: number) => {
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
                                  value={val?.FundUnits}
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
              </>
            ) : null}
          </TreeView>
        </form>
      </CustomIlpSurrFullModal>
    </div>
  );
}

export default IlpSurrenderModal;
