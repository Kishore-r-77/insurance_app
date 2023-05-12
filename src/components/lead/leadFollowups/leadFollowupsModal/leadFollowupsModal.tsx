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
import CustomModal from "../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../redux/app/hooks";

import { getApi } from "../../../admin/companies/companiesApis/companiesApis";

import styles from "./leadFollowupsModal.module.css";

//Attention: Check the path below

import { paramItem } from "../leadFollowupsApis/leadFollowupsApis";
// *** Attention: Check the path and change it if required ***
import LeadDetails from "../../leadDetails/LeadDetails";
import { LeadFollowupsModalType } from "../../../../reducerUtilities/types/lead/leadFollowups/leadFollowupsTypes";
function LeadFollowupsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: LeadFollowupsModalType) {
  const addTitle: string = "LeadFollowups Add";
  const editTitle: string = "LeadFollowups Edit";
  const infoTitle: string = "LeadFollowups Info";
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

  const [countryCodeData, setCountryCodeData] = useState([]);
  const getCountryCode = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setCountryCodeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [leadDetailData, setLeadDetailIDData] = useState<any>({});
  const getLeadDetailIDData = (id: number) => {
    getApi(id).then((resp) => {
      setLeadDetailIDData(resp.data["LeadDetailID"]);
    });
  };

  const [appointmentFlagData, setAppointmentFlagData] = useState([]);
  const getAppointmentFlag = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setAppointmentFlagData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [preferredDayData, setPreferredDayData] = useState([]);
  const getPreferredDay = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPreferredDayData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [preferredTimeData, setPreferredTimeData] = useState([]);
  const getPreferredTime = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPreferredTimeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [progressStatusData, setProgressStatusData] = useState([]);
  const getProgressStatus = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setProgressStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getCountryCode(companyId, "P0037", languageId);
    //getLeadDetailData(leadDetailId);
    getAppointmentFlag(companyId, "P0005", languageId);
    getPreferredDay(companyId, "P0038", languageId);
    getPreferredTime(companyId, "P0039", languageId);
    getProgressStatus(companyId, "P0004", languageId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const leadDetailsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.LeadDetailID = item.ID;
    } else record.LeadDetailID = item.ID;
    dispatch({ type: ACTIONS.LEADDETAILSCLOSE });
  };

  return (
    <div className={styles.modal}>
      <CustomModal
        open={
          state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        size={size}
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
            {state.leadDetailsOpen ? (
              <LeadDetails modalFunc={leadDetailsOpenFunc} />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company"
                    label="Company"
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="CountryCode"
                    name="CountryCode"
                    value={
                      state.addOpen ? state.CountryCode : record.CountryCode
                    }
                    placeholder="Country"
                    label="Country"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "CountryCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {countryCodeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="LeadDetailID"
                    name="LeadDetailID"
                    placeholder="Lead Detail ID"
                    label="Lead Detail ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.LEADDETAILSOPEN })}
                    value={
                      state.addOpen ? state.LeadDetailID : record.LeadDetailID
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "LeadDetailID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="SeqNo"
                    name="SeqNo"
                    value={state.addOpen ? state.SeqNo : record.SeqNo}
                    placeholder="Auto Seq.Number"
                    label="Auto Seq.Number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "SeqNo",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Scheduled Appt. Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.AppointmentDate
                            : record.AppointmentDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date,
                            fieldName: "AppointmentDate",
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
                    id="AppointmentFlag"
                    name="AppointmentFlag"
                    value={
                      state.addOpen
                        ? state.AppointmentFlag
                        : record.AppointmentFlag
                    }
                    placeholder="Appointment Flag"
                    label="Appointment Flag"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AppointmentFlag",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {appointmentFlagData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PreferredDay"
                    name="PreferredDay"
                    value={
                      state.addOpen ? state.PreferredDay : record.PreferredDay
                    }
                    placeholder="Preferred Day"
                    label="Preferred Day"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PreferredDay",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {preferredDayData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PreferredTime"
                    name="PreferredTime"
                    value={
                      state.addOpen ? state.PreferredTime : record.PreferredTime
                    }
                    placeholder="Preferred Time"
                    label="Preferred Time"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PreferredTime",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {preferredTimeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Actual Meeting Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.ActualMeetingDate
                            : record.ActualMeetingDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date,
                            fieldName: "ActualMeetingDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ActionNote"
                    name="ActionNote"
                    value={state.addOpen ? state.ActionNote : record.ActionNote}
                    placeholder="Action Notes"
                    label="Action Notes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ActionNote",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Next Followup Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.NextFollowupDate
                            : record.NextFollowupDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date,
                            fieldName: "NextFollowupDate",
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
                    id="ProgressStatus"
                    name="ProgressStatus"
                    value={
                      state.addOpen
                        ? state.ProgressStatus
                        : record.ProgressStatus
                    }
                    placeholder="Progress Status"
                    label="Progress Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProgressStatus",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {progressStatusData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default LeadFollowupsModal;
