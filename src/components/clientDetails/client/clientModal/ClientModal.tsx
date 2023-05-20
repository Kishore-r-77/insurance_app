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
import styles from "./clientModal.module.css";

import { ClientModalType } from "../../../../reducerUtilities/types/client/clientTypes";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import { useAppSelector } from "../../../../redux/app/hooks";
import { paramItem } from "../clientApis/clientApis";

function ClientModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: any) {
  const editTitle: string = "Client Edit";
  const infoTitle: string = "Client Info";
  const size = "xl";

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [salutationData, setsalutationData] = useState([]);

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const getSalutation = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setsalutationData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [genderData, setgenderData] = useState([]);
  const getGender = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setgenderData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };
  const [languageData, setlanguageData] = useState([]);
  const getLanguage = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setlanguageData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };
  const [clientStatusData, setclientStatusData] = useState([]);
  const getClientStatus = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setclientStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getGender(companyId, "P0001", languageId);
    getSalutation(companyId, "P0006", languageId);
    getLanguage(companyId, "P0002", languageId);
    getClientStatus(companyId, "P0009", languageId);

    return () => {};
  }, []);

  return (
    <div className={styles.modal}>
      <CustomModal
        size={size}
        open={state.editOpen ? state.editOpen : state.infoOpen}
        handleClose={
          state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
        title={state.editOpen ? editTitle : state.infoOpen ? infoTitle : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
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
                id="ClientShortName"
                name="ClientShortName"
                value={record.ClientShortName}
                placeholder="Client Short Name"
                label="Client Short Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientShortName",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientLongName"
                name="ClientLongName"
                value={record.ClientLongName}
                placeholder="Client Long Name"
                label="Client Long Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientLongName",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientSurName"
                name="ClientSurName"
                value={record.ClientSurName}
                placeholder="Client Sur Name"
                label="Client Sur Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientSurName",
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
                id="Gender"
                name="Gender"
                value={record.Gender}
                placeholder="Gender"
                label="Gender"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Gender",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {genderData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="Salutation"
                name="Salutation"
                value={record.Salutation}
                placeholder="Salutation"
                label="Salutation"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Salutation",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {salutationData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="Language"
                name="Language"
                value={record.Language}
                placeholder="Language"
                label="Language"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Language",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {languageData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientEmail"
                name="ClientEmail"
                value={record.ClientEmail}
                placeholder="ClientEmail"
                label="ClientEmail"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientEmail",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientMobile"
                name="ClientMobile"
                value={record.ClientMobile}
                placeholder="ClientMobile"
                label="ClientMobile"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">+91</InputAdornment>
                //   ),
                // }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientMobile",
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
                id="ClientStatus"
                name="ClientStatus"
                value={record.ClientStatus}
                placeholder="ClientStatus"
                label="ClientStatus"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientStatus",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {clientStatusData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Client Dob"
                    inputFormat="DD/MM/YYYY"
                    value={record.ClientDob}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: ACTIONS.EDITCHANGE,
                        payload:date?.$d,
                        fieldName: "ClientDob",
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
                    label="Client Dod"
                    inputFormat="DD/MM/YYYY"
                    value={record.ClientDod}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: ACTIONS.EDITCHANGE,
                        payload:date?.$d,
                        fieldName: "ClientDod",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default ClientModal;
