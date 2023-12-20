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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BankModalType } from "../../../../reducerUtilities/types/bank/bankTypes";
import { PauthType } from "../../../../reducerUtilities/types/pa/paTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import Client from "../../client/Client";
import styles from "./pAuthModal.module.css";
import { p0050 } from "../pauthApis/pAuthApis";
// import { p0050, paramItem } from "../bankApis/bankApis";

function PauthModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: PauthType) {
  const addTitle: string = "PA Add";
  const editTitle: string = "PA Edit";
  const infoTitle: string = "PA Info";
  const size: string = "xl";

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };


  useEffect(() => {
    getCompanyData(companyId);
    return () => { };
  }, []);

  // const [clientId, setClientId] = useState<any>("");
  // const [payerClientId, setpayerClientId] = useState<any>("")

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
      // setClientId(item.ID)
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });


  };

  const [paTypeData, setpaTypeData] = useState([]);
  const getAccountType = (
    companyId: number,
    name: string,
    languageId: number,
    item: string

  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setpaTypeData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  const [paStatusData, setpaStatusData] = useState([]);
  const getbankaccountstaus = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setpaStatusData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getAccountType(companyId, "P0050", languageId, "PaType");
    getbankaccountstaus(companyId, "P0050", languageId, "PaStatus");
    return () => { };
  }, []);


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
          state.clientOpen
            ? () => dispatch({ type: ACTIONS.CLIENTCLOSE })
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
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            {state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
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
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    id="ClientID"
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    placeholder="Client Id"
                    label="Client Id"
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
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    // InputProps={{ readOnly: true }}
                    // onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    id="PaName"
                    name="PaName"
                    value={state.addOpen ? state.PaName : record.PaName}
                    placeholder="PaName"
                    label="PaName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaName",
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
                    id="PaType"
                    name="PaType"
                    value={
                      state.addOpen
                        ? state.PaType
                        : record.PaType
                    }
                    placeholder="PaType"
                    label="PaType"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaType",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {paTypeData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PaStatus"
                    name="PaStatus"
                    value={
                      state.addOpen
                        ? state.PaStatus
                        : record.PaStatus
                    }
                    placeholder="PaStatus"
                    label="PaStatus"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaStatus",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {paStatusData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
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
                            payload: date?.$d,
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
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default PauthModal;
