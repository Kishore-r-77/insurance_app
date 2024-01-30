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
import styles from "./clientWorkModal.module.css";
//Attention: Check the path below
import { ClientWorkModalType } from "../../../reducerUtilities/types/clientWork/clientWorkTypes";
import { paramItem } from "../clientWorkApis/clientWorkApis";
// *** Attention: Check the path and change it if required ***
import Client from "../../clientDetails/client/Client";
import Payingauthority from "../../clientDetails/pAuthority/Pauth";
import { getAllClientByClientType } from "../../clientDetails/client/clientApis/clientApis";
import axios from "axios";
function ClientWorkModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  searchContent,
  handleSearchChange,
}: any) {
  const addTitle: string = "ClientWork Add";
  const editTitle: string = "ClientWork Edit";
  const infoTitle: string = "ClientWork Info";
  const size: string = "xl";

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

  useEffect(() => {
    getCompanyData(companyId);

    return () => {};
  }, []);

  const [clientByClientType, setclientByClientType] = useState();

  const getClient = (pageNum: number, pageSize: number, searchContent: any) => {
    return getAllClientByClientType(pageNum, pageSize, searchContent, state)
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setclientByClientType(resp.data["All Clients"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Clients"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getClient(pageNum, pageSize, searchContent);
    return () => {};
  }, [state.addOpen]);

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  const employerOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.EmployerID = item.ID;
    } else record.EmployerID = item.ID;
    dispatch({ type: ACTIONS.EMPLOYERCLOSE });
  };

  const p0050 = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    return axios.get(
      `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
      {
        withCredentials: true,
        params: {
          companyId,
          name,
          languageId,
          item,
        },
      }
    );
  };

  const [worktypeData, setworktypeData] = useState([]);
  const getWorkType = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setworktypeData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getWorkType(companyId, "P0050", languageId, "WORKTYPE");
    return () => {};
  }, [state.addOpen]);

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
          state.clientOpen
            ? () => dispatch({ type: ACTIONS.CLIENTCLOSE })
            : state.employerOpen
            ? () => dispatch({ type: ACTIONS.EMPLOYERCLOSE })
            : state.addOpen
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
        handleFormSubmit={state.infoOpen ? null : () => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            {state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
            ) : state.employerOpen ? (
              <Client
                receiptLookup={state.employerOpen}
                modalFunc={employerOpenFunc}
                getByTable={clientByClientType}
                getByFunction={getClient}
                searchContent={searchContent}
                handleSearchChange={handleSearchChange}
                receiptFieldMap={fieldMap}
              />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company ID"
                    label="Company ID"
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                {state.infoOpen ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      InputProps={{ readOnly: true }}
                      id="ClientID"
                      name="ClientID"
                      placeholder="Client ID"
                      label="Client ID"
                      // Attention: *** Check the value details  ***
                      //onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                      value={state.addOpen ? state.ClientID : record.ClientID}
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      //   dispatch({
                      //     type: state.addOpen
                      //       ? ACTIONS.ONCHANGE
                      //       : ACTIONS.EDITCHANGE,
                      //     payload: e.target.value,
                      //     fieldName: "ClientID",
                      //   })
                      // }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                ) : (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      InputProps={{ readOnly: true }}
                      id="ClientID"
                      name="ClientID"
                      placeholder="Client ID"
                      label="Client ID"
                      // Attention: *** Check the value details  ***
                      onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                      value={state.addOpen ? state.ClientID : record.ClientID}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ClientID",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                )}
                {state.infoOpen ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="EmployerID"
                      name="EmployerID"
                      placeholder="EmployerID"
                      label="EmployerID"
                      // Attention: *** Check the value details  ***
                      //onClick={() => dispatch({ type: ACTIONS.EMPLOYEROPEN })}
                      value={
                        state.addOpen ? state.EmployerID : record.EmployerID
                      }
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      //   dispatch({
                      //     type: state.addOpen
                      //       ? ACTIONS.ONCHANGE
                      //       : ACTIONS.EDITCHANGE,
                      //     payload: e.target.value,
                      //     fieldName: "EmployerID",
                      //   })
                      // }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                ) : (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="EmployerID"
                      name="EmployerID"
                      placeholder="EmployerID"
                      label="EmployerID"
                      // Attention: *** Check the value details  ***
                      onClick={() => dispatch({ type: ACTIONS.EMPLOYEROPEN })}
                      value={
                        state.addOpen ? state.EmployerID : record.EmployerID
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "EmployerID",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                )}
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PayRollNumber"
                    name="PayRollNumber"
                    value={
                      state.addOpen ? state.PayRollNumber : record.PayRollNumber
                    }
                    placeholder="Pay Roll No"
                    label="Pay Roll No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PayRollNumber",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                {state.infoOpen ? (
                  <Grid2 xs={12} md={12} lg={4}>
                    <TextField
                      //select
                      id="WorkType"
                      name="WorkType"
                      placeholder="Work Type"
                      label="Work Type"
                      fullWidth
                      value={state.addOpen ? state.WorkType : record.WorkType}
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      //   dispatch({
                      //     type: state.addOpen
                      //       ? ACTIONS.ONCHANGE
                      //       : ACTIONS.EDITCHANGE,
                      //     payload: e.target.value,
                      //     fieldName: "WorkType",
                      //   })
                      // }
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    >
                      {worktypeData.map((val: any) => (
                        <MenuItem value={val.code}>{val.description}</MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                ) : (
                  <Grid2 xs={12} md={12} lg={4}>
                    <TextField
                      select
                      id="WorkType"
                      name="WorkType"
                      placeholder="Work Type"
                      label="Work Type"
                      fullWidth
                      value={state.addOpen ? state.WorkType : record.WorkType}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "WorkType",
                        })
                      }
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    >
                      {worktypeData.map((val: any) => (
                        <MenuItem value={val.code}>{val.description}</MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                )}
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Designation"
                    name="Designation"
                    value={
                      state.addOpen ? state.Designation : record.Designation
                    }
                    placeholder="Designation"
                    label="Designation"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Designation",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Department"
                    name="Department"
                    value={state.addOpen ? state.Department : record.Department}
                    placeholder="Department"
                    label="Department"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Department",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Location"
                    name="Location"
                    value={state.addOpen ? state.Location : record.Location}
                    placeholder="Location"
                    label="Location"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Location",
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
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.StartDate : record.StartDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "StartDate",
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
                        label="End Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.EndDate : record.EndDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "EndDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
                {/* <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    id="PrevPaId"
                    name="PrevPaId"
                    value={state.addOpen ? state.PrevPaID : record.PrevPaID}
                    placeholder="Prev PA ID"
                    label="Prev PA ID"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PrevPaID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2> */}
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default ClientWorkModal;
