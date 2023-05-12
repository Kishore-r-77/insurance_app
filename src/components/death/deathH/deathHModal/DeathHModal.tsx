import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/app/hooks";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";

import "./deathHModal.css";

import CustomModal from "../../../../utilities/modal/CustomModal";
import Client from "../../../clientDetails/client/Client";
import {
  createDeathWithBenefits,
  getLAByPolicy,
  paramItem,
} from "../deathHApis/deathHApis";

import moment from "moment";
import Notification from "../../../../utilities/Notification/Notification";
import Policy from "../../../policy/Policy";
import DeathHFullModal from "./DeathHFullModal";

function DeathHModal({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  record,
  getData,
  setNotify,
}: any) {
  const title = "Death Header Add";
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

  const [deathDdata, setdeathDdata] = useState<any>([{}, {}, {}, {}, {}]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setdeathDdata(
      deathDdata.map((deathDetails: any, index: number) => {
        if (index === i) {
          return { ...deathDetails, [name]: value };
        } else return deathDetails;
      })
    );
  };

  const [deathHData, setdeathHData] = useState<any>({});

  const addDeathWithBenefits = () => {
    return createDeathWithBenefits(state, companyId, deathDdata)
      .then((resp) => {
        setdeathHData(resp.data?.Death);
        setdeathDdata(resp.data?.DeathDs);
        if (state.Function === "Fill") {
          dispatch({ type: ACTIONS.COMMITOPEN });

          state.Function = "Commit";
        } else {
          dispatch({ type: ACTIONS.COMMITCLOSE });
          dispatch({ type: ACTIONS.ADDCLOSE });
          setNotify({
            isOpen: true,
            message: `Created a record of id: ${resp.data?.Created}`,
            type: "success",
          });
        }

        getData();
      })
      .catch((err) => err.message);
  };

  const clientOpenFunc = (item: any) => {
    console.log(item.ID, "clientId");
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;

    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };
  const policyOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PolicyID = item.ID;
    } else record.PolicyID = item.ID;

    dispatch({ type: ACTIONS.POLICYCLOSE });
  };

  const [clientsByPolicy, setclientsByPolicy] = useState();

  const getLAByPolicy1 = (policyId: number) => {
    return getLAByPolicy(policyId).then((resp) => {
      setclientsByPolicy(resp.data?.Clients);
    });
  };

  useEffect(() => {
    getLAByPolicy1(parseInt(state.PolicyID));
    return () => {};
  }, [state.PolicyID]);

  const [causeOfDeathData, setcauseOfDeathData] = useState([]);
  const causeOfDeathMenu = () => {
    return paramItem(companyId, "P0047", languageId)
      .then((resp) => {
        setcauseOfDeathData(resp.data?.data);
      })
      .catch((err) => err.message);
  };
  const [deathProofData, setdeathProofData] = useState([]);
  const deathProofMenu = () => {
    return paramItem(companyId, "P0048", languageId)
      .then((resp) => {
        setdeathProofData(resp.data?.data);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getCompanyData(companyId);
    causeOfDeathMenu();
    deathProofMenu();
    return () => {};
  }, []);

  return (
    <div>
      <DeathHFullModal
        open={state.addOpen}
        commit={state.commitOpen}
        handleFormSubmit={addDeathWithBenefits}
        handleClose={() => dispatch({ type: ACTIONS.ADDCLOSE })}
        title={title}
      >
        <form>
          <TreeView
            style={{ width: "90%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1"]}
          >
            {state.clientOpen ? (
              <CustomModal
                open={state.clientOpen}
                size={size}
                handleClose={() => dispatch({ type: ACTIONS.CLIENTCLOSE })}
              >
                <Client
                  modalFunc={clientOpenFunc}
                  getByTable={clientsByPolicy}
                  lookup={state.clientOpen}
                />
              </CustomModal>
            ) : state.policyOpen ? (
              <CustomModal
                size={size}
                open={state.policyOpen}
                handleClose={() => dispatch({ type: ACTIONS.POLICYCLOSE })}
              >
                <Policy modalFunc={policyOpenFunc} />
              </CustomModal>
            ) : null}
            <TreeItem nodeId="1" label={`DeathH Add`}>
              <Grid2
                container
                spacing={2}
                style={{ width: "95%", margin: "0px auto" }}
              >
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="company_id"
                    label="company_id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="PolicyID"
                    onClick={() => dispatch({ type: ACTIONS.POLICYOPEN })}
                    name="PolicyID"
                    value={state.PolicyID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PolicyID",
                      })
                    }
                    placeholder="PolicyID"
                    label="PolicyID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="ClientID"
                    value={state.ClientID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientID",
                      })
                    }
                    placeholder="client_id"
                    label="client_id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="EffectiveDate"
                        inputFormat="DD/MM/YYYY"
                        value={state.EffectiveDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date,
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
                        readOnly={state.infoOpen}
                        label="DeathDate"
                        inputFormat="DD/MM/YYYY"
                        value={state.DeathDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date,
                            fieldName: "DeathDate",
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
                    value={state.Cause}
                    placeholder="Cause"
                    label="Cause"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Cause",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {causeOfDeathData.map((value: any) => (
                      <MenuItem key={value.item} value={value.item}>
                        {value.item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="DeathProof"
                    name="DeathProof"
                    value={state.DeathProof}
                    placeholder="DeathProof"
                    label="DeathProof"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "DeathProof",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {deathProofData.map((value: any) => (
                      <MenuItem key={value.item} value={value.item}>
                        {value.item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
              </Grid2>
              {state.commitOpen ? (
                <Grid2
                  container
                  spacing={2}
                  style={{ width: "95%", margin: "0px auto" }}
                >
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="paidToDate"
                      name="paidToDate"
                      value={moment(deathHData?.paidToDate).format(
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
                      value={moment(deathHData?.BillDate).format("YYYY-MM-DD")}
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
                      value={deathHData?.Product}
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
                      value={deathHData?.AplAmount}
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
                      value={deathHData?.LoanAmount}
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
                      value={deathHData?.PolicyDepost}
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
                      id="RefundPrem"
                      name="RefundPrem"
                      value={deathHData?.RefundPrem}
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
                      value={deathHData?.PremTolerance}
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
                      id="TotalDeathPayable"
                      name="TotalDeathPayable"
                      value={deathHData?.TotalDeathPayable}
                      placeholder="TotalDeathPayable"
                      label="TotalDeathPayable"
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
                      value={deathHData?.AdjustedAmount}
                      placeholder="AdjustedAmount"
                      label="AdjustedAmount"
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                </Grid2>
              ) : null}
            </TreeItem>

            {state.commitOpen ? (
              <>
                {deathDdata.map((deathDetails: any, index: number) => (
                  <>
                    {deathDetails.BCoverage === "" ? null : (
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
                                value={deathDetails.BCoverage}
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
                                value={deathDetails.BSumAssured}
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
                                value={deathDetails.RevBonus}
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
                                value={deathDetails.AddlBonus}
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
                                value={deathDetails.TerminalBonus}
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
                                value={deathDetails.InterimBonus}
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
                                value={deathDetails.LoyaltyBonus}
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
                                value={deathDetails.OtherAmount}
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
                                value={deathDetails.AccumDividend}
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
                                value={deathDetails.AccumDivInt}
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
                                value={deathDetails.TotalFundValue}
                                placeholder="TotalFundValue"
                                label="TotalFundValue"
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
                                id="TotalDeathAmount"
                                name="TotalDeathAmount"
                                value={deathDetails.TotalDeathAmount}
                                placeholder="TotalDeathAmount"
                                label="TotalDeathAmount"
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
      </DeathHFullModal>
    </div>
  );
}

export default DeathHModal;
