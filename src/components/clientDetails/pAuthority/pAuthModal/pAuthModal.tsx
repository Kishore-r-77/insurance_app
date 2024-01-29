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
import { p0050, paramItem } from "../pauthApis/pAuthApis";
import Address from "../../address/Address";
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
    return () => {};
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

  const addressOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.AddressID = item.ID;
    } else record.AddressID = item.ID;
    dispatch({ type: ACTIONS.ADDRESSCLOSE });
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

  const [pBillCurrData, setPBillCurrData] = useState([]);
  const getPBillCurr = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPBillCurrData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getAccountType(companyId, "P0050", languageId, "PaType");
    getbankaccountstaus(companyId, "P0050", languageId, "PaStatus");
    getPBillCurr(companyId, "P0023", languageId);
    return () => {};
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
            : state.addressOpen
            ? () => dispatch({ type: ACTIONS.ADDRESSCLOSE })
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
            ) : state.addressOpen ? (
              <Address modalFunc={addressOpenFunc} />
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
                    value={state.addOpen ? state.PaType : record.PaType}
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
                    value={state.addOpen ? state.PaStatus : record.PaStatus}
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
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ExtrationDay"
                    name="ExtrationDay"
                    value={
                      state.addOpen ? state.ExtrationDay : record.ExtrationDay
                    }
                    placeholder="ExtrationDay"
                    label="ExtrationDay"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ExtrationDay",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PayDay"
                    name="PayDay"
                    value={state.addOpen ? state.PayDay : record.PayDay}
                    placeholder="PayDay"
                    label="PayDay"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PayDay",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PaToleranceAmt"
                    name="PaToleranceAmt"
                    value={
                      state.addOpen
                        ? state.PaToleranceAmt
                        : record.PaToleranceAmt
                    }
                    placeholder="PaToleranceAmt"
                    label="PaToleranceAmt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaToleranceAmt",
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
                    id="PaCurrency"
                    name="PaCurrency"
                    value={
                      state.addOpen ? state.PaCurrency : record?.PaCurrency
                    }
                    placeholder="PaCurrency"
                    label="PaCurrency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaCurrency",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pBillCurrData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.ADDRESSOPEN })}
                    id="AddressID"
                    name="AddressID"
                    value={state.addOpen ? state.AddressID : record.AddressID}
                    placeholder="AddressID"
                    label="AddressID"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PaPerson"
                    name="PaPerson"
                    value={state.addOpen ? state.PaPerson : record.PaPerson}
                    placeholder="PaPerson"
                    label="PaPerson"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaPerson",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PaMobCode"
                    name="PaMobCode"
                    value={state.addOpen ? state.PaMobCode : record.PaMobCode}
                    placeholder="PaMobCode"
                    label="PaMobCode"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaMobCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PaMobMobile"
                    name="PaMobMobile"
                    value={
                      state.addOpen ? state.PaMobMobile : record.PaMobMobile
                    }
                    placeholder="PaMobMobile"
                    label="PaMobMobile"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaMobMobile",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PaEmail"
                    name="PaEmail"
                    value={state.addOpen ? state.PaEmail : record.PaEmail}
                    placeholder="PaEmail"
                    label="PaEmail"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaEmail",
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

export default PauthModal;
