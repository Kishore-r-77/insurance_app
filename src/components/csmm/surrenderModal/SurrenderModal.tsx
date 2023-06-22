import styles from "./SurrenderModal.module.css";
import CustomSurrFullModal from "./CustomSurrFullModal";
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
  postSurrender,
  saveSurrender,
} from "./surrenderApi";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/surrender/surrenderActions";
import { SurrenderHStateType } from "../../../reducerUtilities/types/surrender/surrenderType";
import CustomModal from "../../../utilities/modal/CustomModal";

// var initialValues = {
//   ReasonDescription: "",
//   RequestedDate: "",
// };

function SurrenderModal({ open, handleClose, policyRecord, getData }: any) {
  const [surrenderData, setsurrenderData] = useState(initialValues);
  const onChange = (e: any) => {
    const { value, name } = e.target;
    setsurrenderData({ ...surrenderData, [name]: value });
  };
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  //Reducer Function to be used inside UserReducer hook

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const isSave = useRef(false);
  const reducer = (state: SurrenderHStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          addOpen: true,
        };
      case ACTIONS.EDITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          editOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        console.log("Payload", action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        return {
          ...state,
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
        };

      case ACTIONS.CLIENTOPEN:
        return {
          ...state,
          clientOpen: true,
        };
      case ACTIONS.CLIENTCLOSE:
        return {
          ...state,
          clientOpen: false,
        };
      case ACTIONS.POLICYOPEN:
        return {
          ...state,
          policyOpen: true,
        };
      case ACTIONS.POLICYCLOSE:
        return {
          ...state,
          policyOpen: false,
        };
      case ACTIONS.COMMITOPEN:
        setNotify({
          isOpen: true,
          message: "Calculated Successfully",
          type: "success",
        });
        return {
          ...state,
          commitOpen: true,
        };
      case ACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Commit",
          commitOpen: false,
        };

      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };
  const title: string = "Surrender";
  const isChecked = useRef(false);
  const size = "xl";

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
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
    getLAByPolicy1(parseInt(state.PolicyID));
    return () => {};
  }, [state.PolicyID]);

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

  const surrenderCreate = () => {
    return postSurrender(
      state,
      companyId,
      policyRecord.ID,
      policyRecord.ClientID
    )
      .then((resp: any) => {
        isSave.current = true;
        console.log("surrenderCreate");
        setsurrHData(resp.data?.SurrH);
        setsurrDdata(resp.data?.SurrDs);
        if (state.Function === "Fill") {
          dispatch({ type: ACTIONS.COMMITOPEN });

          state.Function = "Commit";
        } else {
          dispatch({ type: ACTIONS.COMMITCLOSE });
          dispatch({ type: ACTIONS.ADDCLOSE });
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
    return saveSurrender(policyRecord.ID, companyId, surrHData, surrDdata)
      .then((resp: any) => {
        isSave.current = false;
        handleClose();
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
      <CustomSurrFullModal
        open={open}
        commit={state.commitOpen}
        handleFormSubmit={isSave.current ? surrenderPolicy : surrenderCreate}
        handleClose={handleClose}
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
                        readOnly={state.infoOpen}
                        label="EffectiveDate"
                        inputFormat="DD/MM/YYYY"
                        value={state.EffectiveDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
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
                    {causeOfSurrenderData.map((value: any) => (
                      <MenuItem key={value.item} value={value.item}>
                        {value.item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={12}>
                  <TextField
                    multiline
                    id="ReasonDescription"
                    name="ReasonDescription"
                    value={surrenderData.ReasonDescription}
                    placeholder="Reason Description"
                    label="Reseon Description"
                    fullWidth
                    margin="dense"
                    onChange={(e) => onChange(e)}
                  />
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
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
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

            {state.commitOpen ? (
              <>
                {surrDdata.map((SurrDdata: any, index: number) => (
                  <>
                    {SurrDdata.BCoverage === "" ? null : (
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
                                value={SurrDdata.BCoverage}
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
                                value={SurrDdata.BSumAssured}
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
                                value={SurrDdata.RevBonus}
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
                                value={SurrDdata.AddlBonus}
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
                                value={SurrDdata.TerminalBonus}
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
                                value={SurrDdata.InterimBonus}
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
                                value={SurrDdata.LoyaltyBonus}
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
                                value={SurrDdata.OtherAmount}
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
                                value={SurrDdata.AccumDividend}
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
                                value={SurrDdata.AccumDivInt}
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
                                value={SurrDdata.TotalFundValue}
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
                                id="SurrAmount"
                                name="SurrAmount"
                                value={SurrDdata.SurrAmount}
                                placeholder="SurrAmount"
                                label="SurrAmount"
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
      </CustomSurrFullModal>
    </div>
  );
}

export default SurrenderModal;
