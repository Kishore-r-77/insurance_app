import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomFullModal from "../../../../utilities/modal/CustomFullModal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import { getAddressType } from "../../address/addressApis/addressApis";
import { createClientWithAddress } from "../clientApis/clientAddressApis";
import { paramItem, paramItems } from "../clientApis/clientApis";
import styles from "./clientFullModal.module.css";
import { getBusinessDateApi } from "../../../receipts/receiptsApis/receiptsApis";
import moment from "moment";

function ClientFullModal({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  notify,
  setNotify,
  getData,
}: any) {
  const title = "Client Add";
  const [businessDate, setbusinessDate] = useState("");
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

  const [addressTypeData, setaddressTypeData] = useState([]);
  const addressType = (companyId: number, languageId: number) => {
    getAddressType(companyId, languageId)
      .then((resp) => {
        setaddressTypeData(resp.data.data);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getGender(companyId, "P0001", languageId);
    getSalutation(companyId, "P0006", languageId);
    getLanguage(companyId, "P0002", languageId);
    getClientStatus(companyId, "P0009", languageId);
    addressType(companyId, languageId);

    return () => {};
  }, []);

  const [addressData, setaddressData] = useState([
    {
      AddressType: "",
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      AddressLine4: "",
      AddressLine5: "",
      AddressPostCode: "",
      AddressState: "",
      AddressCountry: "",
      AddressStartDate: businessDate,
      // AddressEndDate: "",
      ClientID: 0,
    },
  ]);

  const getBusinessDate = () => {
    return getBusinessDateApi(companyId, 0)
      .then((resp) => {
        setbusinessDate(resp.data.BusinessDate);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getBusinessDate();
    return () => {};
  }, [state.addOpen]);

  useEffect(() => {
    setaddressData((prev: any) => [
      {
        ...prev,
        AddressStartDate: businessDate,
      },
    ]);
    return () => {};
  }, [state.addOpen]);

  const handleAddressAdd = () => {
    setaddressData([
      ...addressData,
      {
        AddressType: "",
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        AddressLine4: "",
        AddressLine5: "",
        AddressPostCode: "",
        AddressState: "",
        AddressCountry: "",
        AddressStartDate: businessDate,
        // AddressEndDate: "",
        ClientID: 0,
      },
    ]);
  };

  const handleAddressRemove = (index: number) => {
    const list = [...addressData];
    list.splice(index, 1);
    setaddressData(list);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setaddressData(
      addressData.map((address, index) => {
        if (index === i) {
          return { ...address, [name]: value };
        } else return address;
      })
    );
  };
  const handleAddressStartDate = (date: any, i: number) => {
    setaddressData(
      addressData.map((address, index) => {
        if (index === i) {
          return { ...address, AddressStartDate: date };
        } else return address;
      })
    );
  };
  const handleAddressEndDate = (date: any, i: number) => {
    setaddressData(
      addressData.map((address, index) => {
        if (index === i) {
          return {
            ...address,
            AddressEndDate: date,
          };
        } else return address;
      })
    );
  };

  const addClientWithAddress = () => {
    return createClientWithAddress(state, companyId, addressData, clientType)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created record of id:${resp.data?.Created}`,
          type: "success",
        });
        getData();
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  const [clientType, setclientType] = useState("I");
  const handleradiochange = (event: any) => {
    setclientType(event.target.value);
  };

  const [countries, setcountries] = useState([]);
  const getCountries = () => {
    return paramItems(companyId, "P0050", languageId, "AddressCountry")
      .then((resp) => {
        setcountries(resp.data.param.data.dataPairs);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getCountries();
    return () => {};
  }, []);

  const [phoneNumbers, setphoneNumbers] = useState([]);

  const getPhoneNumbers = () => {
    return paramItems(companyId, "P0050", languageId, "ClientMobile")
      .then((resp) => {
        setphoneNumbers(resp.data.param.data.dataPairs);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getPhoneNumbers();
    return () => {};
  }, [state.NationalId]);

  const initialCountryValues = {
    code: "",
    dialCode: "",
    flag: "",
    name: "",
  };

  const [countryDetails, setcountryDetails] = useState<{
    code: string;
    dialCode: string;
    flag: string;
    name: string;
  }>(initialCountryValues);

  const getCountryDetails = () => {
    return paramItems(companyId, "P0066", languageId, state.NationalId)
      .then((resp) => {
        setcountryDetails(resp.data.param.data);
        state.ClientMobCode = resp.data.param.data.dialCode;
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getCountryDetails();
    return () => {};
  }, [state.NationalId]);
  useEffect(() => {
    setcountryDetails(initialCountryValues);
    return () => {};
  }, [state.addOpen === false]);

  return (
    <div>
      <CustomFullModal
        open={state.addOpen}
        handleFormSubmit={addClientWithAddress}
        handleClose={() => dispatch({ type: ACTIONS.ADDCLOSE })}
        title={title}
      >
        <form>
          <TreeView
            style={{ width: "90%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1"]}
          >
            <TreeItem nodeId="1" label={`Client Add`}>
              <Grid2
                lg={12}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <FormControl style={{ textAlign: "center" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    <b> Client Type</b>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="I"
                    name="radio-buttons-group"
                    row
                    value={clientType}
                    onChange={(e) => handleradiochange(e)}
                  >
                    <FormControlLabel
                      value="I"
                      control={<Radio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="C"
                      control={<Radio />}
                      label="Corporate"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid2>
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
                    value={companyData?.CompanyName}
                    placeholder="Company"
                    label="Company"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ClientShortName"
                    name="ClientShortName"
                    value={state.ClientShortName}
                    placeholder="Client Short Name"
                    label={clientType === "I" ? "Client Short Name" : "FAO"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientShortName",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ClientLongName"
                    name="ClientLongName"
                    value={state.ClientLongName}
                    placeholder="Client Long Name"
                    label={
                      clientType === "I" ? "Client Long Name" : "Company Name"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientLongName",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                {clientType === "I" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      id="ClientSurName"
                      name="ClientSurName"
                      value={state.ClientSurName}
                      placeholder="Client Sur Name"
                      label="Client Sur Name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: ACTIONS.ONCHANGE,
                          payload: e.target.value,
                          fieldName: "ClientSurName",
                        })
                      }
                      fullWidth
                      margin="dense"
                    />
                  </Grid2>
                ) : null}
                {clientType === "I" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      select
                      id="Gender"
                      name="Gender"
                      value={state.Gender}
                      placeholder="Gender"
                      label="Gender"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: ACTIONS.ONCHANGE,
                          payload: e.target.value,
                          fieldName: "Gender",
                        })
                      }
                      fullWidth
                      margin="dense"
                    >
                      {genderData.map((val: any) => (
                        <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                ) : null}

                {clientType === "I" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      select
                      id="Salutation"
                      name="Salutation"
                      value={state.Salutation}
                      placeholder="Salutation"
                      label="Salutation"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: ACTIONS.ONCHANGE,
                          payload: e.target.value,
                          fieldName: "Salutation",
                        })
                      }
                      fullWidth
                      margin="dense"
                    >
                      {salutationData.map((val: any) => (
                        <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                ) : null}

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Language"
                    name="Language"
                    value={state.Language}
                    placeholder="Language"
                    label="Language"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Language",
                      })
                    }
                    fullWidth
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
                    value={state.ClientEmail}
                    placeholder="ClientEmail"
                    label={clientType === "I" ? "Client Email" : "Office Mail"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientEmail",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="NationalId"
                    name="NationalId"
                    value={state.NationalId}
                    placeholder="NationalId"
                    label="NationalId"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "NationalId",
                      })
                    }
                    fullWidth
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Nationality"
                    name="Nationality"
                    value={state.Nationality}
                    placeholder="Nationality"
                    label="Nationality"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Nationality",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {countries.map((val: any, index: number) => (
                      <MenuItem key={val.code} value={val.code}>
                        {val.description}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ClientMobile"
                    name="ClientMobile"
                    value={state.ClientMobile}
                    placeholder="ClientMobile"
                    label={
                      clientType === "I" ? "Client Mobile" : "Office Mobile"
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {countryDetails.flag}
                          {countryDetails.dialCode}
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientMobile",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ClientType"
                    name="ClientType"
                    value={clientType}
                    placeholder="Client Type"
                    label="Client Type"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ClientStatus"
                    name="ClientStatus"
                    value={state.ClientStatus}
                    placeholder="ClientStatus"
                    label="ClientStatus"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientStatus",
                      })
                    }
                    fullWidth
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
                        label={
                          clientType === "I"
                            ? "Client Dob"
                            : "Date of incorporation"
                        }
                        inputFormat="DD/MM/YYYY"
                        value={state.ClientDob}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date?.$d,
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
                        label={
                          clientType === "I"
                            ? "Client Dod"
                            : "Date Of Termination"
                        }
                        inputFormat="DD/MM/YYYY"
                        value={state.ClientDod}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date?.$d,
                            fieldName: "ClientDod",
                          })
                        }
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
              </Grid2>
            </TreeItem>
            {addressData.map((address, index) => (
              <div style={{ display: "flex" }}>
                <TreeItem
                  nodeId={(index + 2).toString()}
                  label={`Address Add`}
                  style={{ minWidth: "95%", margin: "0px 1rem" }}
                >
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
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        select
                        id="AddressType"
                        name="AddressType"
                        placeholder="Address Type"
                        label="Address Type"
                        fullWidth
                        value={address.AddressType}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        margin="dense"
                      >
                        {addressTypeData.map((val: any) => (
                          <MenuItem value={val.item}>{val.longdesc}</MenuItem>
                        ))}
                      </TextField>
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressLine1"
                        name="AddressLine1"
                        placeholder="Address Line 1"
                        label="Address Line 1"
                        fullWidth
                        value={address.AddressLine1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressLine2"
                        name="AddressLine2"
                        placeholder="Address Line 2"
                        label="Address Line 2"
                        value={address.AddressLine2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressLine3"
                        name="AddressLine3"
                        placeholder="Address Line 3"
                        label="Address Line 3"
                        value={address.AddressLine3}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressLine4"
                        name="AddressLine4"
                        placeholder="Address Line 4"
                        label="Address Line 4"
                        value={address.AddressLine4}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressLine5"
                        name="AddressLine5"
                        placeholder="Address Line 5"
                        label="Address Line 5"
                        value={address.AddressLine5}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressPostCode"
                        name="AddressPostCode"
                        placeholder="PostCode"
                        label="PostCode"
                        value={address.AddressPostCode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressState"
                        name="AddressState"
                        placeholder="State"
                        label="State"
                        value={address.AddressState}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>
                    <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        id="AddressCountry"
                        name="AddressCountry"
                        placeholder="Address Country"
                        label="Address Country"
                        value={address.AddressCountry}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, index)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid2>

                    <Grid2 xs={8} md={6} lg={4}>
                      <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Address Start Date"
                            inputFormat="DD/MM/YYYY"
                            value={address.AddressStartDate}
                            onChange={(date: any) =>
                              handleAddressStartDate(date?.$d, index)
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid2>
                    {/* <Grid2 xs={8} md={6} lg={4}>
                      <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Address End Date"
                            inputFormat="DD/MM/YYYY"
                            value={address.AddressEndDate}
                            onChange={(date: any) =>
                              handleAddressEndDate(date, index)
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid2> */}
                    {/* <Grid2 xs={8} md={6} lg={4}>
                      <TextField
                        InputProps={{ readOnly: true }}
                        onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                        id="ClientID"
                        name="ClientID"
                        placeholder="Client Id"
                        label="Client Id"
                        fullWidth
                        margin="dense"
                      />
                    </Grid2> */}
                  </Grid2>
                </TreeItem>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                  }}
                >
                  {addressData.length - 1 === index &&
                    addressData.length < 4 && (
                      <Button
                        variant="contained"
                        onClick={() => handleAddressAdd()}
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
                  {addressData.length !== 1 && (
                    <Button
                      onClick={() => handleAddressRemove(index)}
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
                  )}
                </div>
              </div>
            ))}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default ClientFullModal;
