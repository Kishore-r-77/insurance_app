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

import styles from "./leadAllocationsModal.module.css";

//Attention: Check the path below
import { paramItem } from "../leadAllocationsApis/leadAllocationsApis";
// *** Attention: Check the path and change it if required ***
import Agency from "../../../agency/Agency";
import { LeadAllocationsModalType } from "../../../../reducerUtilities/types/lead/leadAllocations/leadAllocationsTypes";
function LeadAllocationsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: LeadAllocationsModalType) {
  const addTitle: string = "LeadAllocations Add";
  const editTitle: string = "LeadAllocations Edit";
  const infoTitle: string = "LeadAllocations Info";

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

  const [officeData, setOfficeData] = useState([]);
  const getOffice = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setOfficeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  // const [agencyData, setAgencyIDData] = useState<any>({});
  // const getAgencyIDData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setAgencyIDData(resp.data["AgencyID"]);
  //   });
  // };

  const [leadAllocStatusData, setLeadAllocStatusData] = useState([]);
  const getLeadAllocStatus = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setLeadAllocStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [productTypeData, setProductTypeData] = useState([]);
  const getProductType = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setProductTypeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [productCodeData, setProductCodeData] = useState([]);
  const getProductCode = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setProductCodeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [priorityData, setPriorityData] = useState([]);
  const getPriority = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPriorityData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qualityData, setQualityData] = useState([]);
  const getQuality = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQualityData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [closureStatusData, setClosureStatusData] = useState([]);
  const getClosureStatus = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setClosureStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getOffice(companyId, "P0018", languageId);
    //getAgencyIDData(agencyId);
    getLeadAllocStatus(companyId, "P0015", languageId);
    getProductType(companyId, "Q0005", languageId);
    getProductCode(companyId, "Q0006", languageId);
    getPriority(companyId, "P0013", languageId);
    getQuality(companyId, "P0014", languageId);
    getClosureStatus(companyId, "P0016", languageId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const agenciesOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.AgencyID = item.ID;
    } else record.AgencyID = item.ID;
    dispatch({ type: ACTIONS.AGENCIESCLOSE });
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
            // *** Attention: Check the below Lookup modal function details ***
            {state.agenciesOpen ? (
              <Agency modalFunc={agenciesOpenFunc} />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company "
                    label="Company "
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Office"
                    name="Office"
                    value={state.addOpen ? state.Office : record.Office}
                    placeholder="Office"
                    label="Office"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Office",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {officeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="SalesManager"
                    name="SalesManager"
                    value={
                      state.addOpen ? state.SalesManager : record.SalesManager
                    }
                    placeholder="Sales Manager"
                    label="Sales Manager"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "SalesManager",
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
                    id="AgencyID"
                    name="AgencyID"
                    placeholder="Agent ID"
                    label="Agent ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.AGENCIESOPEN })}
                    value={state.addOpen ? state.AgencyID : record.AgencyID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencyID",
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
                        label="Allocation Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.AllocationDate
                            : record.AllocationDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "AllocationDate",
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
                        label="Appointment Date"
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
                            payload: date.$d,
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
                    id="LeadAllocStatus"
                    name="LeadAllocStatus"
                    value={
                      state.addOpen
                        ? state.LeadAllocStatus
                        : record.LeadAllocStatus
                    }
                    placeholder="Lead Allocation Status"
                    label="Lead Allocation Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "LeadAllocStatus",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {leadAllocStatusData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ProductType"
                    name="ProductType"
                    value={
                      state.addOpen ? state.ProductType : record.ProductType
                    }
                    placeholder="Product Type"
                    label="Product Type"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProductType",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {productTypeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ProductCode"
                    name="ProductCode"
                    value={
                      state.addOpen ? state.ProductCode : record.ProductCode
                    }
                    placeholder="Product Code"
                    label="Product Code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProductCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {productCodeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="NoofAppointment"
                    name="NoofAppointment"
                    value={
                      state.addOpen
                        ? state.NoofAppointment
                        : record.NoofAppointment
                    }
                    placeholder="No.Of Appts"
                    label="No.Of Appts"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "NoofAppointment",
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
                    id="Priority"
                    name="Priority"
                    value={state.addOpen ? state.Priority : record.Priority}
                    placeholder="Lead Priority"
                    label="Lead Priority"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Priority",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {priorityData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Quality"
                    name="Quality"
                    value={state.addOpen ? state.Quality : record.Quality}
                    placeholder="Lead Quality"
                    label="Lead Quality"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Quality",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {qualityData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ClosureStatus"
                    name="ClosureStatus"
                    value={
                      state.addOpen ? state.ClosureStatus : record.ClosureStatus
                    }
                    placeholder="Closure Status"
                    label="Closure Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ClosureStatus",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {closureStatusData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Closure Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.ClosureDate : record.ClosureDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "ClosureDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default LeadAllocationsModal;
