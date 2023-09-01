import {
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import styles from "./extraModal.module.css";

//Attention: Check the path below
import { ExtraModalType } from "../../../reducerUtilities/types/extra/extraTypes";
import { p0050, paramItem } from "../extraApis/extraApis";
// *** Attention: Check the path and change it if required ***
import Policy from "../../policy/Policy";
import Benefit from "../../policy/policyModal/benefit/Benefit";
function ExtraModal({
  benefitState,
  lookup,
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: ExtraModalType) {
  const addTitle: string = "Extra Add";
  const editTitle: string = "Extra Edit";
  const infoTitle: string = "Extra Info";
  const size: string = "xl";

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

  const [bCoverageData, setBCoverageData] = useState([]);
  const getBCoverage = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setBCoverageData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [eReasonData, setEReasonData] = useState([]);
  const getEReason = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setEReasonData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [eMethodData, setEMethodData] = useState([]);
  const getEMethod = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setEMethodData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [eMortalityData, setEMortalityData] = useState([]);
  const getEMortality = (companyId: number, name: string, languageId: number, item: string) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setEMortalityData(resp.data.param.data.dataPairs);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getBCoverage(companyId, "Q0006", languageId);
    getEReason(companyId, "P0026", languageId);
    getEMethod(companyId, "P0025", languageId);
    getEMortality(companyId, "P0050", languageId, "UWEMR");
    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const policyOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PolicyID = item.ID;
    } else record.PolicyID = item.ID;
    dispatch({ type: ACTIONS.POLICYCLOSE });
  };

  const benefitOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.BenefitID = item.ID;
    } else record.BenefitID = item.ID;
    dispatch({ type: ACTIONS.BENEFITCLOSE });
  };

  console.log(benefitState, lookup, "benefitState");

  const eMethod = record.EMethod as '01' | '02' | '03' | '04' | '05' | '06';

  return (
    <div className={styles.modal}>
      <CustomModal
        size={size}
        open={
          state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        handleClose={
          state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
        title={
          state.addOpen
            ? addTitle
            : state.editOpen
            ? editTitle
            : state.infoOpen
            ? infoTitle
            : null
        }
        ACTIONS={ACTIONS}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            {state.policyOpen ? (
              <Policy modalFunc={policyOpenFunc} />
            ) : state.benefitOpen ? (
              <Benefit modalFunc={benefitOpenFunc} />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company Number"
                    label="Company Number"
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="PolicyID"
                    name="PolicyID"
                    placeholder="Policy Number"
                    label="Policy Number"
                    // Attention: *** Check the value details  ***
                    onClick={() =>
                      lookup ? {} : dispatch({ type: ACTIONS.POLICYOPEN })
                    }
                    value={
                      lookup
                        ? benefitState.PolicyID
                        : state.addOpen
                        ? state.PolicyID
                        : record.PolicyID
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PolicyID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="BenefitID"
                    name="BenefitID"
                    placeholder="Benefit ID"
                    label="Benefit ID"
                    onClick={() =>
                      lookup ? {} : dispatch({ type: ACTIONS.BENEFITOPEN })
                    }
                    value={
                      lookup
                        ? benefitState.ID
                        : state.addOpen
                        ? state.BenefitID
                        : record.BenefitID
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BenefitID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="BCoverage"
                    name="BCoverage"
                    value={
                      lookup
                        ? benefitState.BCoverage
                        : state.addOpen
                        ? state.BCoverage
                        : record.BCoverage
                    }
                    placeholder="Coverage Code"
                    InputProps={{ readOnly: lookup || state.infoOpen }}
                    label="Coverage Code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BCoverage",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {bCoverageData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="EReason"
                    name="EReason"
                    value={state.addOpen ? state.EReason : record.EReason}
                    placeholder="Reason for Extra"
                    label="Reason for Extra"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "EReason",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {eReasonData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="EMethod"
                    name="EMethod"
                    value={state.addOpen ? state.EMethod : record.EMethod}
                    placeholder="Method for Extra"
                    label="Method for Extra"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "EMethod",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {eMethodData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                {
                  {
                    '05':
                    <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EPrem"
                      name="EPrem"
                      value={state.addOpen ? state.EPrem : record.EPrem}
                      placeholder="Extra Premium per Mille"
                      label="Extra Premium per Mille"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EPrem",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
                  '02':
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EAmt"
                      name="EAmt"
                      value={state.addOpen ? state.EAmt : record.EAmt}
                      placeholder="Extra by Flat Amount"
                      label="Extra by Flat Amount"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EAmt",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
                  '04':
                  <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="ETerm"
                    name="ETerm"
                    value={state.addOpen ? state.ETerm : record.ETerm}
                    placeholder="Extra for Fixed Term"
                    label="Extra for Fixed Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ETerm",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>,
                '01':
                <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  type="number"
                  //InputProps={{
                  //startAdornment: (
                  //<InputAdornment position="start">+91</InputAdornment>
                  // ),
                  //}}
                  id="EAge"
                  name="EAge"
                  value={state.addOpen ? state.EAge : record.EAge}
                  placeholder="Extra for Age"
                  label="Extra for Age"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "EAge",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>,
              '03':
              <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EPercentage"
                      name="EPercentage"
                      value={
                        state.addOpen ? state.EPercentage : record.EPercentage
                      }
                      placeholder="Extra by Percentage"
                      label="Extra by Percentage"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EPercentage",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
              '06':
              <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                    select
                    id="EEmr"
                    name="EEmr"
                    value={state.addOpen ? state.EEmr : record.EEmr}
                    placeholder="Method for Extra"
                    label="Method for Extra"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "EEmr",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {eMortalityData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
                  </Grid2>
                  }[state.EMethod]
                }

                {
                  {
                    '05':
                    <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EPrem"
                      name="EPrem"
                      value={state.addOpen ? state.EPrem : record.EPrem}
                      placeholder="Extra Premium per Mille"
                      label="Extra Premium per Mille"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EPrem",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
                  '02':
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EAmt"
                      name="EAmt"
                      value={state.addOpen ? state.EAmt : record.EAmt}
                      placeholder="Extra by Flat Amount"
                      label="Extra by Flat Amount"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EAmt",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
                  '04':
                  <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="ETerm"
                    name="ETerm"
                    value={state.addOpen ? state.ETerm : record.ETerm}
                    placeholder="Extra for Fixed Term"
                    label="Extra for Fixed Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ETerm",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>,
                '01':
                <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  type="number"
                  //InputProps={{
                  //startAdornment: (
                  //<InputAdornment position="start">+91</InputAdornment>
                  // ),
                  //}}
                  id="EAge"
                  name="EAge"
                  value={state.addOpen ? state.EAge : record.EAge}
                  placeholder="Extra for Age"
                  label="Extra for Age"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "EAge",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>,
              '03':
              <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="EPercentage"
                      name="EPercentage"
                      value={
                        state.addOpen ? state.EPercentage : record.EPercentage
                      }
                      placeholder="Extra by Percentage"
                      label="Extra by Percentage"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EPercentage",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>,
              '06':
              <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                    select
                    id="EEmr"
                    name="EEmr"
                    value={state.addOpen ? state.EEmr : record.EEmr}
                    placeholder="Method for Extra"
                    label="Method for Extra"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "EEmr",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {eMortalityData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
                  </Grid2>
                  }[eMethod]
                }

              <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={true}
                        label="From Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          lookup
                            ? benefitState.BStartDate
                            : state.addOpen
                            ? state.BCoverage
                            : record.BCoverage
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "FromDate",
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="To Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.ToDate : record.ToDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "ToDate",
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={state?.ToDate?.length === 0 ? true : false}
                            required
                            helperText={
                              state?.ToDate?.length === 0 ? "Required" : null
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      //InputProps={{
                      //startAdornment: (
                      //<InputAdornment position="start">+91</InputAdornment>
                      // ),
                      //}}
                      id="ReasonDescription"
                      name="ReasonDescription"
                      value={
                        state.addOpen
                          ? state.ReasonDescription
                          : record.ReasonDescription
                      }
                      placeholder="Reason Description"
                      label="Reason Description"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReasonDescription",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default ExtraModal;
