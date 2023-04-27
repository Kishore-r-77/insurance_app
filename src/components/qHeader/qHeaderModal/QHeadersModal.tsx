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

import styles from "./qHeadersModal.module.css";

//Attention: Check the path below

import { paramItem } from "../qHeaderApis/qHeadersApis";
import { QHeadersModalType } from "../../../reducerUtilities/types/qHeader/qHeadersTypes";
import Client from "../../clientDetails/client/Client";
function QHeadersModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: QHeadersModalType) {
  const addTitle: string = "QHeaders Add";
  const editTitle: string = "QHeaders Edit";
  const infoTitle: string = "QHeaders Info";
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

  const [qProductData, setQProductData] = useState([]);
  const getQProduct = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQProductData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [clientData, setClientIDData] = useState<any>({});
  const getClientIDData = (id: number) => {
    getApi(id).then((resp) => {
      setClientIDData(resp.data["ClientID"]);
    });
  };

  const [qOccGroupData, setQOccGroupData] = useState([]);
  const getQOccGroup = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQOccGroupData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qOccSectData, setQOccSectData] = useState([]);
  const getQOccSect = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQOccSectData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [addressData, setAddressIDData] = useState<any>({});
  const getAddressIDData = (id: number) => {
    getApi(id).then((resp) => {
      setAddressIDData(resp.data["AddressID"]);
    });
  };

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  useEffect(() => {
    getCompanyData(companyId);
    getQProduct(companyId, "Q0005", languageId);
    //getClientData(clientId);
    getQOccGroup(companyId, "Q0007", languageId);
    getQOccSect(companyId, "Q0008", languageId);
    //getAddressIDData(addressId);

    return () => {};
  }, []);

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
          {state.clientOpen ? (
            <Client modalFunc={clientOpenFunc} />
          ) : (
            <Grid2 container spacing={2}>
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

              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly={state.infoOpen}
                      label="Quote Date"
                      inputFormat="DD/MM/YYYY"
                      value={state.addOpen ? state.QuoteDate : record.QuoteDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date.$d,
                          fieldName: "QuoteDate",
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
                  id="QProduct"
                  name="QProduct"
                  value={state.addOpen ? state.QProduct : record.QProduct}
                  placeholder="Product Code"
                  label="Product Code"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QProduct",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {qProductData.map((val: any) => (
                    <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                  id="ClientID"
                  name="ClientID"
                  // Attention: *** Check the value details  ***
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
                  placeholder="Client ID"
                  label="Client ID"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QFirstName"
                  name="QFirstName"
                  value={state.addOpen ? state.QFirstName : record.QFirstName}
                  placeholder="First Name"
                  label="First Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QFirstName",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QLastName"
                  name="QLastName"
                  value={state.addOpen ? state.QLastName : record.QLastName}
                  placeholder="Last Name"
                  label="Last Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QLastName",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QMidName"
                  name="QMidName"
                  value={state.addOpen ? state.QMidName : record.QMidName}
                  placeholder="Middle Name"
                  label="Middle Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QMidName",
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
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      value={state.addOpen ? state.QDob : record.QDob}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date.$d,
                          fieldName: "QDob",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QGender"
                  name="QGender"
                  value={state.addOpen ? state.QGender : record.QGender}
                  placeholder="Gender"
                  label="Gender"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QGender",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QNri"
                  name="QNri"
                  value={state.addOpen ? state.QNri : record.QNri}
                  placeholder="NRI"
                  label="NRI"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QNri",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QEmail"
                  name="QEmail"
                  value={state.addOpen ? state.QEmail : record.QEmail}
                  placeholder="eMail"
                  label="eMail"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QEmail",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QMobile"
                  name="QMobile"
                  value={state.addOpen ? state.QMobile : record.QMobile}
                  placeholder="Mobile No"
                  label="Mobile No"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QMobile",
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
                  id="QOccGroup"
                  name="QOccGroup"
                  value={state.addOpen ? state.QOccGroup : record.QOccGroup}
                  placeholder="Occupation Group"
                  label="Occupation Group"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QOccGroup",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {qOccGroupData.map((val: any) => (
                    <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="QOccSect"
                  name="QOccSect"
                  value={state.addOpen ? state.QOccSect : record.QOccSect}
                  placeholder="Occupation Sector"
                  label="Occupation Sector"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QOccSect",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {qOccSectData.map((val: any) => (
                    <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                  ))}
                </TextField>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QOccupation"
                  name="QOccupation"
                  value={state.addOpen ? state.QOccupation : record.QOccupation}
                  placeholder="Occupation Name"
                  label="Occupation Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QOccupation",
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
                  id="QAnnualIncome"
                  name="QAnnualIncome"
                  value={
                    state.addOpen ? state.QAnnualIncome : record.QAnnualIncome
                  }
                  placeholder="Annual Income"
                  label="Annual Income"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QAnnualIncome",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="QDeclaration"
                  name="QDeclaration"
                  value={
                    state.addOpen ? state.QDeclaration : record.QDeclaration
                  }
                  placeholder="Declaration"
                  label="Declaration"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "QDeclaration",
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
                  id="AddressID"
                  name="AddressID"
                  // Attention: *** Check the value details  ***
                  value={addressData?.AddressIDName}
                  placeholder="Address ID"
                  label="Address ID"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
            </Grid2>
          )}
        </form>
      </CustomModal>
    </div>
  );
}
export default QHeadersModal;
