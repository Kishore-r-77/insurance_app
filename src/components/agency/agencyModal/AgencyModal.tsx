import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import styles from "./agencyModal.module.css";
import useHttp from "../../../hooks/use-http";
import { AgencyModalType } from "../../../reducerUtilities/types/agency/agencyTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import { getData } from "../../../services/http-service";
import CustomModal from "../../../utilities/modal/CustomModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import Address from "../../clientDetails/address/Address";
import Bank from "../../clientDetails/bank/Bank";
import Client from "../../clientDetails/client/Client";
import { paramItem } from "../../clientDetails/client/clientApis/clientApis";
function AgencyModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: AgencyModalType) {
  const addTitle: string = "Agency Add";
  const editTitle: string = "Agency Edit";
  const infoTitle: string = "Agency Info";
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

  const {
    sendRequest: sendAgencyChannelRequest,
    status: getAgencyChannelResponseStatus,
    data: getAgencyChannelResponse,
    error: getAgencyChannelResponseError,
  } = useHttp(getData, true);

  const [officeData, setofficeData] = useState([]);
  const getPOffice = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setofficeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [agencyStData, setagencyStData] = useState([]);
  const getagencySt = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setagencyStData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };
  const addressOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.AddressID = item.ID;
    } else record.AddressID = item.ID;
    dispatch({ type: ACTIONS.ADDRESSCLOSE });
  };
  const bankOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.BankID = item.ID;
    } else record.BankID = item.ID;
    dispatch({ type: ACTIONS.BANKCLOSE });
  };

  useEffect(() => {
    getCompanyData(companyId);

    getPOffice(companyId, "P0018", languageId);
    getagencySt(companyId, "P0019", languageId);
    return () => {};
  }, []);
  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "AgencyChannel";
    sendAgencyChannelRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });
  }, []);

  useEffect(() => {
    getCompanyData(companyId);
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
            : state.bankOpen
            ? () => dispatch({ type: ACTIONS.BANKCLOSE })
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
          {state.clientOpen ? (
            <Client modalFunc={clientOpenFunc} />
          ) : state.addressOpen ? (
            <Address modalFunc={addressOpenFunc} />
          ) : state.bankOpen ? (
            <Bank modalFunc={bankOpenFunc} />
          ) : (
            <>
              <Grid2 container spacing={2}>
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
                    id="AgencyChannel"
                    name="AgencyChannel"
                    value={
                      state.addOpen ? state.AgencyChannel : record.AgencyChannel
                    }
                    placeholder="AgencyChannel"
                    label="AgencyChannel"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencyChannel",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {getAgencyChannelResponse?.param.data.dataPairs.map(
                      (value: any) => (
                        <MenuItem key={value.code} value={value.code}>
                          {value.description}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Office"
                    name="Office"
                    value={state.addOpen ? state.Office : record?.Office}
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
                    margin="dense"
                  >
                    {officeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="AgencySt"
                    name="AgencySt"
                    value={state.addOpen ? state.AgencySt : record?.AgencySt}
                    placeholder="Agency Status"
                    label="Agency Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencySt",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {agencyStData.map((val: any) => (
                      <MenuItem value={val.item}>{val.longdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Aadhar"
                    name="Aadhar"
                    value={state.addOpen ? state.Aadhar : record.Aadhar}
                    placeholder="Aadhar"
                    label="Aadhar"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Aadhar",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Pan"
                    name="Pan"
                    value={state.addOpen ? state.Pan : record.Pan}
                    placeholder="PAN"
                    label="PAN"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Pan",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="LicenseNo"
                    name="LicenseNo"
                    value={state.addOpen ? state.LicenseNo : record.LicenseNo}
                    placeholder="License No"
                    label="License No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "LicenseNo",
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
                        label="License Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.LicenseStartDate
                            : record.LicenseStartDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "LicenseStartDate",
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
                        label="License End Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.LicenseEndDate
                            : record.LicenseEndDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "LicenseEndDate",
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
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.Startdate : record.Startdate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "Startdate",
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
                    id="TerminationReason"
                    name="TerminationReason"
                    value={
                      state.addOpen
                        ? state.TerminationReason
                        : record.TerminationReason
                    }
                    placeholder="TerminationReason"
                    label="TerminationReason"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "TerminationReason",
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
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    id="ClientID"
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    placeholder="Owner Id"
                    label="Owner Id"
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
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.BANKOPEN })}
                    id="BankID"
                    name="BankID"
                    value={state.addOpen ? state.BankID : record.BankID}
                    placeholder="Bank Id"
                    label="Bank Id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </>
          )}
        </form>
      </CustomModal>
    </div>
  );
}

export default AgencyModal;
