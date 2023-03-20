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

import styles from "./quotationsModal.module.css";
import QHeaders from "../../qHeader/QHeaders";
import Client from "../../clientDetails/client/Client";
import QDetails from "../../qDetails/QDetails";
import { paramItem } from "../quationsApis/quotationApis";
import { QuotationModalType } from "../../../reducerUtilities/types/quotations/quotationTypes";

//Attention: Check the path below

// *** Attention: Check the path and change it if required ***

function QuotationModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: QuotationModalType) {
  const addTitle: string = "Quotation Add";
  const editTitle: string = "Quotation Edit";
  const infoTitle: string = "Quotation Info";

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

  const [qHeaderData, setQHeaderIDData] = useState<any>({});
  const getQHeaderIDData = (id: number) => {
    getApi(id).then((resp) => {
      setQHeaderIDData(resp.data["QHeaderID"]);
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

  const [qCoverageData, setQCoverageData] = useState([]);
  const getQCoverage = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQCoverageData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qDetailData, setQDetailIDData] = useState<any>({});
  const getQDetailIDData = (id: number) => {
    getApi(id).then((resp) => {
      setQDetailIDData(resp.data["QDetailID"]);
    });
  };

  useEffect(() => {
    getCompanyData(companyId);
    //  getQHeaderData(qHeaderId);
    getQProduct(companyId, "Q0005", languageId);
    //getClientData(clientId);
    getQOccGroup(companyId, "Q0007", languageId);
    getQOccSect(companyId, "Q0008", languageId);
    // getAddressData(addressId);
    getQCoverage(companyId, "Q0006", languageId);
    //getQDetailData(qDetailId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const qHeadersOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.QHeaderID = item.ID;
    } else record.QHeaderID = item.ID;
    dispatch({ type: ACTIONS.QHEADERSCLOSE });
  };

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  const qDetailsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.QDetailID = item.ID;
    } else record.QDetailID = item.ID;
    dispatch({ type: ACTIONS.QDETAILSCLOSE });
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
            {state.qHeadersOpen ? (
              <QHeaders modalFunc={qHeadersOpenFunc} />
            ) : state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
            ) : state.qDetailsOpen ? (
              <QDetails modalFunc={qDetailsOpenFunc} />
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

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="QHeaderID"
                    name="QHeaderID"
                    placeholder="Header ID"
                    label="Header ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.QHEADERSOPEN })}
                    value={state.addOpen ? state.QHeaderID : record.QHeaderID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QHeaderID",
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
                        label="Quote Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.QuoteDate : record.QuoteDate
                        }
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
                    value={
                      state.addOpen ? state.QOccupation : record.QOccupation
                    }
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

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Quotation Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.QDate : record.QDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QDate",
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
                    id="QCoverage"
                    name="QCoverage"
                    value={state.addOpen ? state.QCoverage : record.QCoverage}
                    placeholder="Coverage Code"
                    label="Coverage Code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QCoverage",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {qCoverageData.map((val: any) => (
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
                    id="QRiskSeqNo"
                    name="QRiskSeqNo"
                    value={state.addOpen ? state.QRiskSeqNo : record.QRiskSeqNo}
                    placeholder="Cover Seq No"
                    label="Cover Seq No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QRiskSeqNo",
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
                    id="QAge"
                    name="QAge"
                    value={state.addOpen ? state.QAge : record.QAge}
                    placeholder="Life Assured Age"
                    label="Life Assured Age"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QAge",
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
                    id="QEmrRating"
                    name="QEmrRating"
                    value={state.addOpen ? state.QEmrRating : record.QEmrRating}
                    placeholder="EMR Rating"
                    label="EMR Rating"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QEmrRating",
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
                    id="QSumAssured"
                    name="QSumAssured"
                    value={
                      state.addOpen ? state.QSumAssured : record.QSumAssured
                    }
                    placeholder="Sum Assured"
                    label="Sum Assured"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QSumAssured",
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
                    id="QRiskCessAge"
                    name="QRiskCessAge"
                    value={
                      state.addOpen ? state.QRiskCessAge : record.QRiskCessAge
                    }
                    placeholder="Risk Cess Age"
                    label="Risk Cess Age"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QRiskCessAge",
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
                    id="QRiskCessTerm"
                    name="QRiskCessTerm"
                    value={
                      state.addOpen ? state.QRiskCessTerm : record.QRiskCessTerm
                    }
                    placeholder="Risk Cess Term"
                    label="Risk Cess Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QRiskCessTerm",
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
                        label="Risk Cess Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.QRiskCessDate
                            : record.QRiskCessDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QRiskCessDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="QPremCessAge"
                    name="QPremCessAge"
                    value={
                      state.addOpen ? state.QPremCessAge : record.QPremCessAge
                    }
                    placeholder="Prem Cess Age"
                    label="Prem Cess Age"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QPremCessAge",
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
                    id="QPremCessTerm"
                    name="QPremCessTerm"
                    value={
                      state.addOpen ? state.QPremCessTerm : record.QPremCessTerm
                    }
                    placeholder="Prem Cess Term"
                    label="Prem Cess Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QPremCessTerm",
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
                        label="Prem Cess Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.QPremCessDate
                            : record.QPremCessDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QPremCessDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="QBeneCessAge"
                    name="QBeneCessAge"
                    value={
                      state.addOpen ? state.QBeneCessAge : record.QBeneCessAge
                    }
                    placeholder="Benefit Cess Age"
                    label="Benefit Cess Age"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QBeneCessAge",
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
                    id="QBeneCessTerm"
                    name="QBeneCessTerm"
                    value={
                      state.addOpen ? state.QBeneCessTerm : record.QBeneCessTerm
                    }
                    placeholder="Benefit Cess Term"
                    label="Benefit Cess Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QBeneCessTerm",
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
                        label="Benefit Cess Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.QBeneCessDate
                            : record.QBeneCessDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QBeneCessDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="QAnnualPremium"
                    name="QAnnualPremium"
                    value={
                      state.addOpen
                        ? state.QAnnualPremium
                        : record.QAnnualPremium
                    }
                    placeholder="Annual Premium"
                    label="Annual Premium"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QAnnualPremium",
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
                    id="QHlyPrem"
                    name="QHlyPrem"
                    value={state.addOpen ? state.QHlyPrem : record.QHlyPrem}
                    placeholder="HLY Premium"
                    label="HLY Premium"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QHlyPrem",
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
                    id="QQlyPrem"
                    name="QQlyPrem"
                    value={state.addOpen ? state.QQlyPrem : record.QQlyPrem}
                    placeholder="QLY Premium"
                    label="QLY Premium"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QQlyPrem",
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
                    id="QMlyPrem"
                    name="QMlyPrem"
                    value={state.addOpen ? state.QMlyPrem : record.QMlyPrem}
                    placeholder="MLY Premium"
                    label="MLY Premium"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QMlyPrem",
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
                    id="QDetailID"
                    name="QDetailID"
                    placeholder="q_detail_id"
                    label="q_detail_id"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.QDETAILSOPEN })}
                    value={state.addOpen ? state.QDetailID : record.QDetailID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QDetailID",
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
                    id="QPolicyYear"
                    name="QPolicyYear"
                    value={
                      state.addOpen ? state.QPolicyYear : record.QPolicyYear
                    }
                    placeholder="q_policy_year"
                    label="q_policy_year"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QPolicyYear",
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
                    id="QLifeAssuredAge"
                    name="QLifeAssuredAge"
                    value={
                      state.addOpen
                        ? state.QLifeAssuredAge
                        : record.QLifeAssuredAge
                    }
                    placeholder="q_life_assured_age"
                    label="q_life_assured_age"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QLifeAssuredAge",
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
                        label="q_pol_anniv_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.QPolAnnivDate
                            : record.QPolAnnivDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QPolAnnivDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="QTotalPremPaid"
                    name="QTotalPremPaid"
                    value={
                      state.addOpen
                        ? state.QTotalPremPaid
                        : record.QTotalPremPaid
                    }
                    placeholder="q_total_prem_paid"
                    label="q_total_prem_paid"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QTotalPremPaid",
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
                    id="QRevBonusAmt"
                    name="QRevBonusAmt"
                    value={
                      state.addOpen ? state.QRevBonusAmt : record.QRevBonusAmt
                    }
                    placeholder="q_rev_bonus_amt"
                    label="q_rev_bonus_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QRevBonusAmt",
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
                    id="QTerBonusAmt"
                    name="QTerBonusAmt"
                    value={
                      state.addOpen ? state.QTerBonusAmt : record.QTerBonusAmt
                    }
                    placeholder="q_ter_bonus_amt"
                    label="q_ter_bonus_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QTerBonusAmt",
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
                    id="QAntiSurBenAmt"
                    name="QAntiSurBenAmt"
                    value={
                      state.addOpen
                        ? state.QAntiSurBenAmt
                        : record.QAntiSurBenAmt
                    }
                    placeholder="q_anti_sur_ben_amt"
                    label="q_anti_sur_ben_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QAntiSurBenAmt",
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
                    id="QGuarAdditions"
                    name="QGuarAdditions"
                    value={
                      state.addOpen
                        ? state.QGuarAdditions
                        : record.QGuarAdditions
                    }
                    placeholder="q_guar_additions"
                    label="q_guar_additions"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QGuarAdditions",
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
                    id="QLoyaltyAdditions"
                    name="QLoyaltyAdditions"
                    value={
                      state.addOpen
                        ? state.QLoyaltyAdditions
                        : record.QLoyaltyAdditions
                    }
                    placeholder="q_loyalty_additions"
                    label="q_loyalty_additions"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QLoyaltyAdditions",
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
                    id="QDeathBenefitAmt"
                    name="QDeathBenefitAmt"
                    value={
                      state.addOpen
                        ? state.QDeathBenefitAmt
                        : record.QDeathBenefitAmt
                    }
                    placeholder="q_death_benefit_amt"
                    label="q_death_benefit_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QDeathBenefitAmt",
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
                    id="QGuarSurrValue"
                    name="QGuarSurrValue"
                    value={
                      state.addOpen
                        ? state.QGuarSurrValue
                        : record.QGuarSurrValue
                    }
                    placeholder="q_guar_surr_value"
                    label="q_guar_surr_value"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QGuarSurrValue",
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
                    id="QSplSurrValue"
                    name="QSplSurrValue"
                    value={
                      state.addOpen ? state.QSplSurrValue : record.QSplSurrValue
                    }
                    placeholder="q_spl_surr_value"
                    label="q_spl_surr_value"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QSplSurrValue",
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
                    id="QBonusSurValue"
                    name="QBonusSurValue"
                    value={
                      state.addOpen
                        ? state.QBonusSurValue
                        : record.QBonusSurValue
                    }
                    placeholder="q_bonus_sur_value"
                    label="q_bonus_sur_value"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QBonusSurValue",
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
                    id="QAccuDividend"
                    name="QAccuDividend"
                    value={
                      state.addOpen ? state.QAccuDividend : record.QAccuDividend
                    }
                    placeholder="q_accu_dividend"
                    label="q_accu_dividend"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QAccuDividend",
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
                    id="QAccuDivInterest"
                    name="QAccuDivInterest"
                    value={
                      state.addOpen
                        ? state.QAccuDivInterest
                        : record.QAccuDivInterest
                    }
                    placeholder="q_accu_div_interest"
                    label="q_accu_div_interest"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QAccuDivInterest",
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
                    id="QallocatedAmt"
                    name="QallocatedAmt"
                    value={
                      state.addOpen ? state.QallocatedAmt : record.QallocatedAmt
                    }
                    placeholder="qallocated_amt"
                    label="qallocated_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QallocatedAmt",
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
                    id="QUnallocedAmt"
                    name="QUnallocedAmt"
                    value={
                      state.addOpen ? state.QUnallocedAmt : record.QUnallocedAmt
                    }
                    placeholder="q_unalloced_amt"
                    label="q_unalloced_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QUnallocedAmt",
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
                    id="QPesValamt"
                    name="QPesValamt"
                    value={state.addOpen ? state.QPesValamt : record.QPesValamt}
                    placeholder="q_pes_valamt"
                    label="q_pes_valamt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QPesValamt",
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
                    id="QNorValamt"
                    name="QNorValamt"
                    value={state.addOpen ? state.QNorValamt : record.QNorValamt}
                    placeholder="q_nor_valamt"
                    label="q_nor_valamt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QNorValamt",
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
                    id="QOptValamt"
                    name="QOptValamt"
                    value={state.addOpen ? state.QOptValamt : record.QOptValamt}
                    placeholder="q_opt_valamt"
                    label="q_opt_valamt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QOptValamt",
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
                        label="q_maturity_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.QMaturityDate
                            : record.QMaturityDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "QMaturityDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="QMaturityAmt"
                    name="QMaturityAmt"
                    value={
                      state.addOpen ? state.QMaturityAmt : record.QMaturityAmt
                    }
                    placeholder="q_maturity_amt"
                    label="q_maturity_amt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "QMaturityAmt",
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
export default QuotationModal;
