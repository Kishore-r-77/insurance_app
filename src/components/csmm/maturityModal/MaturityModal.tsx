import styles from "./SurrenderModal.module.css";
import CustomMaturityFullModal from "./CustomMaturityFullModal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import styled from "./SurrenderModal.module.css";
import Client from "../../clientDetails/client/Client";
import moment from "moment";
import Notification from "../../../utilities/Notification/Notification";
import Policy from "../../policy/Policy";
import {
  getLAByPolicy,
  paramItem,
  postMaturity,
  saveMaturity,
} from "./MaturityApis";
import {
  ACTIONS,
  columns,
} from "../../../reducerUtilities/actions/maturity/maturityAction";
function MaturityModal({
  open,
  policyRecord,
  getData,
  maturityState,
  maturityDispatch,
}: any) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const isSave = useRef(false);

  const title: string = "Maturity";
  const isChecked = useRef(false);
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
    getLAByPolicy1(parseInt(maturityState.PolicyID));
    return () => {};
  }, [maturityState.PolicyID]);

  const [maturityDdata, setmaturityDdata] = useState<any>([{}, {}, {}, {}, {}]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setmaturityDdata(
      maturityDdata.map((maturityDetails: any, index: number) => {
        if (index === i) {
          return { ...maturityDetails, [name]: value };
        } else return maturityDetails;
      })
    );
  };
  const [maturityHData, setmaturityHData] = useState<any>({});
  const maturityCreate = () => {
    return postMaturity(
      maturityState,
      companyId,
      policyRecord.ID,
      policyRecord.ClientID
    )
      .then((resp: any) => {
        isSave.current = true;
        setmaturityHData(resp.data?.MaturityH);
        setmaturityDdata(resp.data?.MaturityDs);
        if (maturityState.Function === "Fill") {
          maturityDispatch({ type: ACTIONS.COMMITOPEN });

          maturityState.Function = "Commit";
        } else {
          maturityDispatch({ type: ACTIONS.COMMITCLOSE });
          maturityDispatch({ type: ACTIONS.ADDCLOSE });

          setNotify({
            isOpen: true,
            message: `Surrender record  id: ${resp.data?.Created}`,
            type: "success",
          });
        }
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };
  const maturityPolicy = () => {
    return saveMaturity(
      policyRecord.ID,
      companyId,
      maturityHData,
      maturityDdata
    )
      .then((resp: any) => {
        isSave.current = false;
        maturityDispatch({ type: ACTIONS.MATURITYCLOSE });
        getData();
        setNotify({
          isOpen: false,
          message: `Surrender record  id: ${resp.data?.Created}`,
          type: "success",
        });
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };
  useEffect(() => {
    getCompanyData(companyId);
    return () => {};
  }, []);
  useEffect(() => {
    if (maturityState.Function === "Fill") {
      setCompanyData({});
      setmaturityHData({});
      setmaturityDdata({});
      isSave.current = false;
    }
    return () => {
      // Cleanup function (if needed)
    };
  }, [maturityState.maturityOpen === false]);
  return (
    <div>
      <CustomMaturityFullModal
        open={maturityState.maturityOpen}
        commit={maturityState.commitOpen}
        handleFormSubmit={isSave.current ? maturityPolicy : maturityCreate}
        handleClose={() => maturityDispatch({ type: ACTIONS.MATURITYCLOSE })}
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
                    value={maturity?.ClientID}
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
                        readOnly={maturityState.infoOpen}
                        label="EffectiveDate"
                        inputFormat="DD/MM/YYYY"
                        value={maturityState.EffectiveDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          maturityDispatch({
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

                {/* <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Cause"
                    name="Cause"
                    value={maturityState.Cause}
                    placeholder="Cause"
                    label="Cause"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      maturityDispatch({
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
                </Grid2> */}
                {/* <Grid2 xs={8} md={6} lg={12}>
                  <TextField
                    multiline
                    id="ReasonDescription"
                    name="ReasonDescription"
                    value={maturityState.ReasonDescription}
                    placeholder="Reason Description"
                    label="Reseon Description"
                    fullWidth
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      maturityDispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ReasonDescription",
                      })
                    }
                  />
                </Grid2> */}
              </Grid2>
              {maturityState.commitOpen ? (
                <Grid2
                  container
                  spacing={2}
                  style={{ width: "95%", margin: "0px auto" }}
                >
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="paidToDate"
                      name="paidToDate"
                      value={moment(maturityHData?.paidToDate).format(
                        "YYYY-MM-DD"
                      )}
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
                      value={moment(maturityHData?.BillDate).format(
                        "YYYY-MM-DD"
                      )}
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
                      value={maturityHData?.Product}
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
                      value={maturityHData?.AplAmount}
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
                      value={maturityHData?.LoanAmount}
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
                      value={maturityHData?.PolicyDepost}
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
                      value={maturityHData?.CashDeposit}
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
                      value={maturityHData?.RefundPrem}
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
                      value={maturityHData?.PremTolerance}
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
                      value={maturityHData?.AdjustedAmount}
                      placeholder="AdjustedAmount"
                      label="AdjustedAmount"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="TotalMaturityPayable"
                      name="TotalMaturityPayable"
                      value={maturityHData?.TotalMaturityPayable}
                      placeholder="TotalMaturityPayable"
                      label="Total Maturity Payable"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                </Grid2>
              ) : null}
            </TreeItem>

            {maturityState.commitOpen ? (
              <>
                {maturityDdata.map((MaturityDdata: any, index: number) => (
                  <>
                    {MaturityDdata.BCoverage === "" ? null : (
                      <div style={{ display: "flex" }}>
                        <TreeItem
                          nodeId={(index + 2).toString()}
                          label={`Benefits Add`}
                          style={{ minWidth: "95%", margin: "0px 1rem" }}
                        >
                          <Grid2 container spacing={2}>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                id="BCoverage"
                                name="BCoverage"
                                value={MaturityDdata.BCoverage}
                                placeholder="BCoverage"
                                label="BCoverage"
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
                                value={MaturityDdata.BSumAssured}
                                placeholder="b_sum_assured"
                                label="b_sum_assured"
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
                                value={MaturityDdata.RevBonus}
                                placeholder="RevBonus"
                                label="RevBonus"
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
                                value={MaturityDdata.AddlBonus}
                                placeholder="AddlBonus"
                                label="AddlBonus"
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
                                value={MaturityDdata.TerminalBonus}
                                placeholder="TerminalBonus"
                                label="TerminalBonus"
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
                                value={MaturityDdata.InterimBonus}
                                placeholder="InterimBonus"
                                label="InterimBonus"
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
                                value={MaturityDdata.LoyaltyBonus}
                                placeholder="LoyaltyBonus"
                                label="LoyaltyBonus"
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
                                value={MaturityDdata.OtherAmount}
                                placeholder="OtherAmount"
                                label="OtherAmount"
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
                                value={MaturityDdata.AccumDividend}
                                placeholder="AccumDividend"
                                label="AccumDividend"
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
                                value={MaturityDdata.AccumDivInt}
                                placeholder="AccumDivInt"
                                label="AccumDivInt"
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
                                value={MaturityDdata.TotalFundValue}
                                placeholder="TotalFundValue"
                                label="TotalFundValue"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            {/* <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="TotalFundValue"
                                name="TotalFundValue"
                                value={MaturityDdata.TotalFundValue}
                                placeholder="TotalFundValue"
                                label="TotalFundValue"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2> */}
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="TotalMaturityAmount"
                                name="TotalMaturityAmount"
                                value={MaturityDdata.TotalMaturityAmount}
                                placeholder="TotalMaturityAmount"
                                label="TotalMaturityAmount"
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
              </>
            ) : null}
          </TreeView>
        </form>
      </CustomMaturityFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default MaturityModal;
