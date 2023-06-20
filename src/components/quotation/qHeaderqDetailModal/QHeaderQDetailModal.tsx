import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { useAppSelector } from "../../../redux/app/hooks";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TreeItem, TreeView } from "@mui/lab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

import styles from "./qHeaderqDetail.module.css";
import CustomModal from "../../../utilities/modal/CustomModal";
import axios from "axios";

//Attention: Check the path below
import { QHeaderModalType } from "../../../reducerUtilities/types/quotation/qHeader/qHeaderTypes";
import {
  paramItem,
  paramCoverageItem,
  paramTermItem,
} from "../qHeaderApis/qHeaderApis";
import {
  createQHeaderWithQDetail,
  editQHeaderAndQDeatail,
} from "../qHeaderApis/qHeaderqDetailApis";

import Client from "../../clientDetails/client/Client";
import Address from "../../clientDetails/address/Address";
import Agency from "../../agency/Agency";
function QHeaderQDetailModal({
  state,
  dispatch,
  ACTIONS,
  record,
  getData,
  setNotify,
  initialValues,
}: any) {
  const title = state.addOpen ? "Quotation Add" : "Quotation Edit";

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

  const [qproductData, setQproductData] = useState([]);
  const getQproduct = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQproductData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qcontractcurrData, setQcontractcurrData] = useState([]);
  const getQcontractcurr = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQcontractcurrData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qnriData, setQnriData] = useState([]);
  const getQnri = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQnriData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qoccgroupData, setQoccgroupData] = useState([]);
  const getQoccgroup = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQoccgroupData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qoccsectData, setQoccsectData] = useState([]);
  const getQoccsect = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQoccsectData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [qcoverageData, setQcoverageData] = useState([]);
  const getQcoverage = (
    companyId: number,
    name: string,
    item: string,
    date: string,
    languageId: number
  ) => {
    paramCoverageItem(companyId, name, item, date, languageId)
      .then((resp) => {
        setQcoverageData(resp.data["AllowedCoverages"]);
        return resp.data["AllowedCoverages"];
      })
      .catch((err) => err);
  };

  const [qriskcesstermData, setQriskcesstermData] = useState([]);
  const getQriskcessterm = (
    companyId: number,
    name: string,
    languageId: number,
    item: string,
    date: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date)
      .then((resp) => {
        setQriskcesstermData(resp.data["ppt"]);
        return resp.data["ppt"];
      })
      .catch((err) => err);
  };

  const [qpremcesstermData, setQpremcesstermData] = useState([]);
  const getQpremcessterm = (
    companyId: number,
    name: string,
    languageId: number,
    item: string,
    date: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date)
      .then((resp) => {
        setQpremcesstermData(resp.data["ppt"]);
        return resp.data["ppt"];
      })
      .catch((err) => err);
  };

  const [qageadmittedData, setQageadmittedData] = useState([]);
  const getQageadmitted = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQageadmittedData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  let qcoverage = useRef("");
  let QCoverage = useRef("");

  const [editQCoverageData, setEditQcoverageData] = useState([]);
  const getEditQcoverage = (
    companyId: number,
    name: string,
    item: string,
    date: string,
    languageId: number
  ) => {
    paramCoverageItem(companyId, name, item, date, languageId)
      .then((resp) => {
        setEditQcoverageData(resp.data["AllowedCoverages"]);
        return resp.data["AllowedCoverages"];
      })
      .catch((err) => err);
  };

  const [editQRiskCessTermData, setEditQriskcesstermData] = useState([]);
  const getEditQriskcessterm = (
    companyId: number,
    name: string,
    languageId: number,
    item: string,
    date: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date)
      .then((resp) => {
        setEditQriskcesstermData(resp.data["ppt"]);
        return resp.data["ppt"];
      })
      .catch((err) => err);
  };

  const [editQPremCessTermData, setEditQpremcesstermData] = useState([]);
  const getEditQpremcessterm = (
    companyId: number,
    name: string,
    languageId: number,
    item: string,
    date: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date)
      .then((resp) => {
        setEditQpremcesstermData(resp.data["ppt"]);
        return resp.data["ppt"];
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getQcontractcurr(companyId, "P0023", languageId);
    getQnri(companyId, "P0046", languageId);
    getQoccgroup(companyId, "Q0007", languageId);
    getQoccsect(companyId, "Q0008", languageId);
    getQageadmitted(companyId, "P0046", languageId);

    return () => {};
  }, []);

  useEffect(() => {
    getQproduct(companyId, "Q0005", languageId);
    getQcoverage(companyId, "Q0011", state.QProduct, "20220101", languageId);

    return () => {};
  }, [state.QProduct]);

  useEffect(() => {
    getQriskcessterm(
      companyId,
      "Q0015",
      languageId,
      qcoverage.current,
      "20220101"
    );
    getQpremcessterm(
      companyId,
      "Q0016",
      languageId,
      qcoverage.current,
      "20220101"
    );

    return () => {};
  }, [qcoverage.current]);

  useEffect(() => {
    getQproduct(companyId, "Q0005", languageId);
    getEditQcoverage(
      companyId,
      "Q0011",
      record.QProduct,
      "20220101",
      languageId
    );

    return () => {};
  }, [record.QProduct]);

  useEffect(() => {
    getEditQriskcessterm(
      companyId,
      "Q0015",
      languageId,
      QCoverage.current,
      "20220101"
    );
    getEditQpremcessterm(
      companyId,
      "Q0016",
      languageId,
      QCoverage.current,
      "20220101"
    );

    return () => {};
  }, [QCoverage.current]);

  const [qDetailData, setqDetailData] = useState([
    {
      CompanyID: companyId,
      ClientID: 0,
      QCoverage: "",
      QSumAssured: "",
      QRiskCessTerm: "",
      QPremCessTerm: "",
      QAgeAdmitted: "",
    },
  ]);

  const handleQDetailAdd = () => {
    setqDetailData([
      ...qDetailData,
      {
        CompanyID: companyId,
        ClientID: 0,
        QCoverage: "",
        QSumAssured: "",
        QRiskCessTerm: "",
        QPremCessTerm: "",
        QAgeAdmitted: "",
      },
    ]);
  };

  const [addressClntData, setaddressClntData] = useState([]);
  const getAddressByClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/addressgetbyclient/${state.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setaddressClntData(resp.data?.AddressByClientID);
      })
      .catch((err) => console.log(err.message));
  };

  const [clntData, setClntData] = useState<any>([]);
  const getClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${state.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setClntData(resp.data?.Client);
      })
      .catch((err) => console.log(err.message));
  };
  const [clntRecordData, setClntRecordData] = useState<any>([]);
  const getClientRecord = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${record.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setClntRecordData(resp.data?.Client);
      })
      .catch((err) => console.log(err.message));
  };
  const [detailsData, setDetailsData] = useState<any>([]);
  const getDetails = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/quotationservices/qdetailbyqheaderget/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setDetailsData(resp.data["QDetail"]);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(detailsData, "-", record.ID);

  const handleQDetailRemove = (index: number) => {
    const list = [...qDetailData];
    list.splice(index, 1);
    setqDetailData(list);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setqDetailData(
      qDetailData.map((qDetail, index) => {
        if (index === i) {
          return { ...qDetail, [name]: value };
        } else return qDetail;
      })
    );
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { name, value } = e.target;
    setDetailsData(
      detailsData.map((qDetail: any, index: number) => {
        if (index === i) {
          console.log(name, "------", value);
          return { ...qDetail, [name]: value };
        } else return qDetail;
      })
    );
  };

  const addQHeaderWithQDetail = () => {
    return createQHeaderWithQDetail(state, companyId, qDetailData)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created record of id:${resp.data?.Created}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => err.message);
  };
  const editQHeaderWithQDetail = () => {
    return editQHeaderAndQDeatail(record, detailsData, companyId)
      .then((resp) => {
        dispatch({ type: ACTIONS.EDITCLOSE });
        setNotify({
          isOpen: true,
          message: `Modifyed record of id:${resp.data?.Modified}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => err.message);
  };
  console.log(detailsData, "---------", record);

  const handleQriskcessdate = (date: any, i: number) => {
    setqDetailData(
      qDetailData.map((qDetail, index) => {
        if (index === i) {
          return { ...qDetail, Qriskcessdate: date };
        } else return qDetail;
      })
    );
  };
  const handleQpremcessdate = (date: any, i: number) => {
    setqDetailData(
      qDetailData.map((qDetail, index) => {
        if (index === i) {
          return { ...qDetail, Qpremcessdate: date };
        } else return qDetail;
      })
    );
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

  const agencyOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.AgencyID = item.ID;
    } else record.AgencyID = item.ID;
    dispatch({ type: ACTIONS.AGENCYCLOSE });
  };

  useEffect(() => {
    getAddressByClient();
    getClient();
    return () => {};
  }, [state.ClientID]);

  useEffect(() => {
    getDetails();
    getClientRecord();

    return () => {};
  }, [state.editOpen]);

  return (
    <div>
      <CustomFullModal
        open={state.addOpen ? state.addOpen : state.editOpen}
        //Attention: Check the path below
        handleFormSubmit={
          state.addOpen ? addQHeaderWithQDetail : editQHeaderWithQDetail
        }
        handleClose={
          state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : () => dispatch({ type: ACTIONS.EDITCLOSE })
        }
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
            {state.clientOpen ? (
              <CustomModal
                open={state.clientOpen}
                handleClose={() => dispatch({ type: ACTIONS.CLIENTCLOSE })}
                size="xl"
              >
                <Client modalFunc={clientOpenFunc} />
              </CustomModal>
            ) : state.addressOpen ? (
              <CustomModal
                open={state.addressOpen}
                handleClose={() => dispatch({ type: ACTIONS.ADDRESSCLOSE })}
                size="xl"
              >
                <Address
                  modalFunc={addressOpenFunc}
                  addressByClientData={addressClntData}
                  lookup={state.addressOpen}
                />
              </CustomModal>
            ) : state.agencyOpen ? (
              <CustomModal
                open={state.agencyOpen}
                handleClose={() => dispatch({ type: ACTIONS.AGENCYCLOSE })}
                size="xl"
              >
                <Agency modalFunc={agencyOpenFunc} />
              </CustomModal>
            ) : state.clientOpen ? (
              <CustomModal
                open={state.clientOpen}
                handleClose={() => dispatch({ type: ACTIONS.CLIENTCLOSE })}
              >
                <Client modalFunc={clientOpenFunc} />
              </CustomModal>
            ) : null}
            <TreeItem
              nodeId="1"
              label={state.addOpen ? `Quotation Add` : `Quotation Edit`}
            >
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
                    placeholder="company_id"
                    label="company_id"
                    fullWidth
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
                          state.addOpen ? state.Quotedate : record.Quotedate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "Quotedate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientID",
                      })
                    }
                    placeholder="Client ID"
                    label="Client ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="Qfirstname"
                    name="Qfirstname"
                    value={
                      state.addOpen
                        ? clntData?.ClientShortName
                        : clntRecordData?.ClientShortName
                    }
                    placeholder="First Name"
                    label="First Name"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="Qlastname"
                    name="Qlastname"
                    value={
                      state.addOpen
                        ? clntData?.ClientLongName
                        : clntRecordData?.ClientLongName
                    }
                    placeholder="Last Name"
                    label="Last Name"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: ACTIONS.ONCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "Qlastname",
                    //   })
                    // }
                    fullWidth
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
                        value={
                          state.addOpen
                            ? clntData?.ClientDob
                            : clntRecordData?.ClientDob
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "Qdob",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="Qgender"
                    name="Qgender"
                    value={
                      state.addOpen ? clntData.Gender : clntRecordData?.Gender
                    }
                    placeholder="Gender"
                    label="Gender"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: ACTIONS.ONCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "Qgender",
                    //   })
                    // }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Qemail"
                    name="Qemail"
                    value={
                      state.addOpen
                        ? clntData?.ClientEmail
                        : clntRecordData?.ClientEmail
                    }
                    placeholder="Email"
                    label="Email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qemail",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Qmobile"
                    name="Qmobile"
                    value={
                      state.addOpen
                        ? clntData?.ClientMobile
                        : clntRecordData?.ClientMobile
                    }
                    placeholder="Mobile"
                    label="Mobile"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qmobile",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="AddressID"
                    onClick={() => dispatch({ type: ACTIONS.ADDRESSOPEN })}
                    name="AddressID"
                    value={state.addOpen ? state.AddressID : record.AddressID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    placeholder="Address ID"
                    label="Address ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="QContractCurr"
                    name="QContractCurr"
                    value={
                      state.addOpen ? state.QContractCurr : record.QContractCurr
                    }
                    placeholder="Contract Currency"
                    label="Contract Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "QContractCurr",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {qcontractcurrData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Qproduct"
                    name="QProduct"
                    value={state.addOpen ? state.QProduct : record.QProduct}
                    placeholder="Product"
                    label="Product"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "QProduct",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {qproductData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Qnri"
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
                    margin="dense"
                  >
                    {qnriData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Qoccgroup"
                    name="QOccGroup"
                    value={state.addOpen ? state.QOccGroup : record.QOccGroup}
                    placeholder="Occ Group"
                    label="Occ Group"
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
                    margin="dense"
                  >
                    {qoccgroupData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Qoccsect"
                    name="QOccSect"
                    value={state.addOpen ? state.QOccSect : record.QOccSect}
                    placeholder="Occ Sector"
                    label="Occ Sector"
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
                    margin="dense"
                  >
                    {qoccsectData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Qoccupation"
                    name="QOccupation"
                    value={
                      state.addOpen ? state.QOccupation : record.QOccupation
                    }
                    placeholder="Occupation"
                    label="Occupation"
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
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    id="Qannualincome"
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
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="AgencyID"
                    onClick={() => dispatch({ type: ACTIONS.AGENCYOPEN })}
                    name="AgencyID"
                    value={state.addOpen ? state.AgencyID : record.AgencyID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencyID",
                      })
                    }
                    placeholder="Agency ID"
                    label="Agency ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>
            {state.addOpen
              ? qDetailData.map((qDetail, index) => {
                  qcoverage.current = qDetail.QCoverage;
                  return (
                    <>
                      <div style={{ display: "flex" }}>
                        <TreeItem
                          nodeId={(index + 2).toString()}
                          label={state.addOpen ? `QDetail Add` : `QDetail Edit`}
                          style={{ minWidth: "95%", margin: "0px 1rem" }}
                        >
                          <Grid2 container spacing={2}>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="CompanyID"
                                name="CompanyID"
                                value={companyData?.CompanyName}
                                placeholder="company_id"
                                label="company_id"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="ClientID"
                                name="ClientID"
                                value={
                                  state.addOpen
                                    ? state.ClientID
                                    : record.ClientID
                                }
                                placeholder="ClientID"
                                label="ClientID"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="Qage"
                            name="Qage"
                            value={qDetail.Qage}
                            placeholder="Q Age"
                            label="Q Age"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          />
                        </Grid2> */}

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qcoverage"
                                name="QCoverage"
                                value={
                                  state.addOpen
                                    ? qDetail.QCoverage
                                    : record.QCoverage
                                }
                                placeholder="Coverage"
                                label="Coverage"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {qcoverageData.map((val: any) => (
                                  <MenuItem value={val.Coverage}>
                                    {val.Coverage}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qsumassured"
                                name="QSumAssured"
                                value={
                                  state.addOpen
                                    ? qDetail.QSumAssured
                                    : record.QSumAssured
                                }
                                placeholder="Sum Assured"
                                label="Sum Assured"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qriskcessterm"
                                name="QRiskCessTerm"
                                value={
                                  state.addOpen
                                    ? qDetail.QRiskCessTerm
                                    : record.QRiskCessTerm
                                }
                                placeholder="Risk Cess Term"
                                label="Risk Cess Term"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {qriskcesstermData.map((val: any) => (
                                  <MenuItem value={val}>{val}</MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qpremcessterm"
                                name="QPremCessTerm"
                                value={
                                  state.addOpen
                                    ? qDetail.QPremCessTerm
                                    : record.QPremCessTerm
                                }
                                placeholder="Prem Cess Term"
                                label="Prem Cess Term"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {qpremcesstermData.map((val: any) => (
                                  <MenuItem value={val}>{val}</MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="Qriskcessage"
                            name="Qriskcessage"
                            value={qDetail.Qriskcessage}
                            placeholder="Risk Cess Age"
                            label="Risk Cess Age"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          />
                        </Grid2> */}

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="Qpremcessage"
                            name="Qpremcessage"
                            value={qDetail.Qpremcessage}
                            placeholder="Prem Cess Age"
                            label="Prem Cess Age"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          />
                        </Grid2> */}

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <FormControl
                            style={{ marginTop: "0.5rem" }}
                            fullWidth
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Risk Cess Date"
                                inputFormat="DD/MM/YYYY"
                                value={qDetail.Qriskcessdate}
                                onChange={(date) =>
                                  handleQriskcessdate(date, index)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid2> */}

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <FormControl
                            style={{ marginTop: "0.5rem" }}
                            fullWidth
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Prem Cess Date"
                                inputFormat="DD/MM/YYYY"
                                value={qDetail.Qpremcessdate}
                                onChange={(date) =>
                                  handleQpremcessdate(date, index)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid2> */}

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qageadmitted"
                                name="QAgeAdmitted"
                                value={
                                  state.addOpen
                                    ? qDetail.QAgeAdmitted
                                    : record.QAgeAdmitted
                                }
                                placeholder="Age Admitted"
                                label="Age Admitted"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {qageadmittedData.map((val: any) => (
                                  <MenuItem value={val.item}>
                                    {val.shortdesc}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="Qemrrating"
                            name="Qemrrating"
                            value={qDetail.Qemrrating}
                            placeholder="EMR Rating"
                            label="EMR Rating"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          />
                        </Grid2> */}

                            {/* <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="Qannualpremium"
                            name="Qannualpremium"
                            value={qDetail.Qannualpremium}
                            placeholder="Annual Premium"
                            label="Annual Premium"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
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
                          {qDetailData.length - 1 === index &&
                            qDetailData.length < 5 && (
                              <Button
                                variant="contained"
                                onClick={() => handleQDetailAdd()}
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

                          {qDetailData.length !== 1 && (
                            <Button
                              onClick={() => handleQDetailRemove(index)}
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
                    </>
                  );
                })
              : detailsData.map((qDetail: any, index: number) => {
                  QCoverage.current = qDetail.QCoverage;
                  return (
                    <>
                      <div style={{ display: "flex" }}>
                        <TreeItem
                          nodeId={(index + 2).toString()}
                          label={
                            state.editOpen ? `QDetail Edit` : `QDetail Info`
                          }
                          style={{ minWidth: "95%", margin: "0px 1rem" }}
                        >
                          <Grid2 container spacing={2}>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="CompanyID"
                                name="CompanyID"
                                value={companyData?.CompanyName}
                                placeholder="company_id"
                                label="company_id"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="DetailID"
                                name="DetailID"
                                value={qDetail.ID}
                                placeholder="DetailID"
                                label="DetailID"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="QRiskSeqNo"
                                name="QRiskSeqNo"
                                value={qDetail.QRiskSeqNo}
                                placeholder="DetailID"
                                label="QRiskSeqNo"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                InputProps={{ readOnly: true }}
                                id="ClientID"
                                name="ClientID"
                                // Attention: *** Check the value details  ***
                                value={
                                  state.addOpen
                                    ? state.ClientID
                                    : record.ClientID
                                }
                                placeholder="client_id"
                                label="client_id"
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qage"
                                name="Qage"
                                value={qDetail.QAge}
                                placeholder="Q Age"
                                label="Q Age"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                //select
                                id="QCoverage"
                                name="QCoverage"
                                value={qDetail.QCoverage}
                                placeholder="Coverage"
                                label="Coverage"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {/* {editQCoverageData.map((val: any) => (
                                  <MenuItem value={val.item}>
                                    {val.shortdesc}
                                  </MenuItem>
                                ))} */}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qsumassured"
                                name="QSumAssured"
                                value={qDetail.QSumAssured}
                                placeholder="Sum Assured"
                                label="Sum Assured"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleEditChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qriskcessterm"
                                name="QRiskCessTerm"
                                value={qDetail.QRiskCessTerm}
                                placeholder="Risk Cess Term"
                                label="Risk Cess Term"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleEditChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {editQRiskCessTermData.map((val: any) => (
                                  <MenuItem value={val}>{val}</MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="Qpremcessterm"
                                name="QPremCessTerm"
                                value={qDetail.QPremCessTerm}
                                placeholder="Prem Cess Term"
                                label="Prem Cess Term"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleEditChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {editQPremCessTermData.map((val: any) => (
                                  <MenuItem value={val}>{val}</MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qriskcessage"
                                name="Qriskcessage"
                                value={qDetail.QRiskCessAge}
                                placeholder="Risk Cess Age"
                                label="Risk Cess Age"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qpremcessage"
                                name="Qpremcessage"
                                value={qDetail.QPremCessAge}
                                placeholder="Prem Cess Age"
                                label="Prem Cess Age"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <FormControl
                                style={{ marginTop: "0.5rem" }}
                                fullWidth
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    label="Risk Cess Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={qDetail.QRiskCessDate}
                                    onChange={(date) =>
                                      handleQriskcessdate(date, index)
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </FormControl>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <FormControl
                                style={{ marginTop: "0.5rem" }}
                                fullWidth
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    label="Prem Cess Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={qDetail.QPremCessDate}
                                    onChange={(date) =>
                                      handleQpremcessdate(date, index)
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </FormControl>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                select
                                id="QAgeAdmitted"
                                name="QAgeAdmitted"
                                value={qDetail.QAgeAdmitted}
                                placeholder="Age Admitted"
                                label="Age Admitted"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleEditChange(e, index)}
                                fullWidth
                                margin="dense"
                              >
                                {qageadmittedData.map((val: any) => (
                                  <MenuItem value={val.item}>
                                    {val.shortdesc}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="Qemrrating"
                                name="Qemrrating"
                                value={qDetail.QEmrRating}
                                placeholder="EMR Rating"
                                label="EMR Rating"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>

                            <Grid2 xs={8} md={6} lg={4}>
                              <TextField
                                type="number"
                                id="QAnnualPremium"
                                name="QAnnualPremium"
                                value={qDetail.QAnnualPremium}
                                placeholder="Annual Premium"
                                label="Annual Premium"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e, index)}
                                fullWidth
                                margin="dense"
                              />
                            </Grid2>
                          </Grid2>
                        </TreeItem>
                      </div>
                    </>
                  );
                })}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default QHeaderQDetailModal;