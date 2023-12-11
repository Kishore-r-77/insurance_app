import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import axios from "axios";
import CustomModal from "../../../utilities/modal/CustomModal";

//Attention: Check the path below
import {
  paramCoverageItem,
  paramItem,
  paramTermItem,
} from "../qHeaderApis/qHeaderApis";
import { createQHeaderWithQDetail } from "../qHeaderApis/qHeaderqDetailApis";

import Agency from "../../agency/Agency";
import Address from "../../clientDetails/address/Address";
import Client from "../../clientDetails/client/Client";
function QHeaderQDetailEnquiry({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  record,
  getData,
}: any) {
  const title = "Quotation Info";

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
  const [pOfficeData, setPOfficeData] = useState([]);
  const getPOffice = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPOfficeData(resp.data.data);
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
    date: string,
    func: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date, func)
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
    date: string,
    func: string
  ) => {
    paramTermItem(companyId, name, languageId, item, date, func)
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

  useEffect(() => {
    getCompanyData(companyId);
    getQcontractcurr(companyId, "P0023", languageId);
    getQnri(companyId, "P0046", languageId);
    getQoccgroup(companyId, "Q0007", languageId);
    getQoccsect(companyId, "Q0008", languageId);
    getQageadmitted(companyId, "P0046", languageId);
    getPOffice(companyId, "P0018", languageId);

    return () => {};
  }, []);

  useEffect(() => {
    getQproduct(companyId, "Q0005", languageId);
    getQcoverage(companyId, "Q0011", state.Qproduct, "20220101", languageId);

    return () => {};
  }, [state.Qproduct]);

  useEffect(() => {
    getQriskcessterm(
      companyId,
      "Q0015",
      languageId,
      qcoverage.current,
      "20220101",
      "TermRange"
    );
    getQpremcessterm(
      companyId,
      "Q0016",
      languageId,
      qcoverage.current,
      "20220101",
      "PptRange"
    );

    return () => {};
  }, [qcoverage.current]);

  const [qDetailData, setqDetailData] = useState([
    {
      CompanyID: companyId,
      ClientID: 0,
      Qcoverage: "",
      Qsumassured: "",
      Qriskcessterm: "",
      Qpremcessterm: "",
      Qageadmitted: "",
    },
  ]);

  const handleQDetailAdd = () => {
    setqDetailData([
      ...qDetailData,
      {
        CompanyID: companyId,
        ClientID: 0,
        Qcoverage: "",
        Qsumassured: "",
        Qriskcessterm: "",
        Qpremcessterm: "",
        Qageadmitted: "",
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

  const [detailsData, setDetailsData] = useState<any>([]);
  const [headerData, setHeaderData] = useState<any>([]);
  const getDetails = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/quotationservices/qheaderanddetailget/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setDetailsData(resp.data["QDetails"]);
        setHeaderData(resp.data["QHeader"]);
      })
      .catch((err) => console.log(err.message));
  };
  const [qCommunicationData, setQCommunicationData] = useState([]);
  const getQCommunicationByHeader = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/quotationservices/qcommidbyheader/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setQCommunicationData(resp.data?.Comm);
      })
      .catch((err) => console.log(err.message));
  };

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

  const addQHeaderWithQDetail = () => {
    return createQHeaderWithQDetail(state, companyId, qDetailData)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        getData();
      })
      .catch((err) => err.message);
  };

  //   //get Api
  //   const getById = async (id: number) => {
  //     getQheader(id)
  //       .then((resp) => {
  //
  //         dispatch({ type: ACTIONS.EDITCLOSE });
  //         getData();
  //       })
  //       .catch((err) => console.log(err.message));
  //   };

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
    return () => {};
  }, [state.ClientID]);

  useEffect(() => {
    getDetails();

    return () => {};
  }, [state.infoOpen]);

  return (
    <div>
      <CustomFullModal
        open={state.infoOpen}
        //Attention: Check the path below
        handleFormSubmit={null}
        handleClose={() => dispatch({ type: ACTIONS.INFOCLOSE })}
        title={title}
      >
        <form>
          <TreeView
            style={{ width: "90%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1", "2", "3", "4", "5", "6"]}
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
            <TreeItem nodeId="1" label={`Quotation Info`}>
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
                        InputProps={{ readOnly: true }}
                        label="Quote Date"
                        inputFormat="DD/MM/YYYY"
                        value={headerData?.QuoteDate}
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
                    InputLabelProps={{ shrink: true }}
                    id="QHeaderID"
                    //onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="QHeaderID"
                    value={headerData?.ID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "QHeaderID",
                      })
                    }
                    placeholder="ID"
                    label="ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="ClientID"
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="ClientID"
                    value={headerData?.ClientID}
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
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="Qfirstname"
                    name="Qfirstname"
                    value={headerData?.QFirstName}
                    placeholder="First Name"
                    label="First Name"
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: ACTIONS.ONCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "ClientShortName",
                    //   })
                    // }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="Qlastname"
                    name="Qlastname"
                    value={headerData?.QLastName}
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
                        InputProps={{ readOnly: true }}
                        label="Date of Birth"
                        inputFormat="DD/MM/YYYY"
                        value={headerData?.QDob}
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
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="Qgender"
                    name="Qgender"
                    value={headerData?.QGender}
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
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="Qemail"
                    name="Qemail"
                    value={headerData?.QEmail}
                    placeholder="Email"
                    label="Email"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: ACTIONS.ONCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "Qemail",
                    //   })
                    // }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="Qmobile"
                    name="Qmobile"
                    value={headerData?.QMobile}
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
                    InputLabelProps={{ shrink: true }}
                    id="AddressID"
                    name="AddressID"
                    value={headerData?.AddressID}
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
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    // select
                    id="Qcontractcurr"
                    name="Qcontractcurr"
                    value={headerData?.QContractCurr}
                    placeholder="Contract Currency"
                    label="Contract Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qcontractcurr",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {qcontractcurrData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    // select
                    id="POffice"
                    name="POffice"
                    value={headerData?.POffice}
                    placeholder="POffice"
                    label="POffice"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "POffice",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {pOfficeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    //select
                    id="Qproduct"
                    name="Qproduct"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QProduct}
                    placeholder="Product"
                    label="Product"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qproduct",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {qproductData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    // select
                    id="Qnri"
                    name="Qnri"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QNri}
                    placeholder="NRI"
                    label="NRI"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qnri",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {qnriData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    //select
                    id="Qoccgroup"
                    name="Qoccgroup"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QOccGroup}
                    placeholder="Occ Group"
                    label="Occ Group"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qoccgroup",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {qoccgroupData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    //select
                    id="Qoccsect"
                    name="Qoccsect"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QOccSect}
                    placeholder="Occ Sector"
                    label="Occ Sector"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qoccsect",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {/* {qoccsectData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))} */}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Qoccupation"
                    name="Qoccupation"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QOccupation}
                    placeholder="Occupation"
                    label="Occupation"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qoccupation",
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
                    name="Qannualincome"
                    InputLabelProps={{ shrink: true }}
                    value={headerData?.QAnnualIncome}
                    placeholder="Annual Income"
                    label="Annual Income"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Qannualincome",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    id="AgencyID"
                    name="AgencyID"
                    value={headerData?.AgencyID}
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
            {detailsData?.map((qDetail: any, index: number) => (
              <>
                <div style={{ display: "flex" }}>
                  <TreeItem
                    nodeId={(index + 2).toString()}
                    label={`QDetail Info`}
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
                          id="ClientID"
                          name="ClientID"
                          // Attention: *** Check the value details  ***
                          value={record?.ClientID}
                          placeholder="ClientID"
                          label="ClientID"
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qage"
                          name="Qage"
                          value={qDetail.QAge}
                          placeholder="Q Age"
                          label="Q Age"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          // select
                          InputProps={{ readOnly: true }}
                          id="Qcoverage"
                          name="Qcoverage"
                          value={qDetail.QCoverage}
                          placeholder="Coverage"
                          label="Coverage"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        >
                          {/* {qcoverageData.map((val: any) => (
                            <MenuItem value={val.item}>
                              {val.shortdesc}
                            </MenuItem>
                          ))} */}
                        </TextField>
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qsumassured"
                          name="Qsumassured"
                          value={qDetail.QSumAssured}
                          placeholder="Sum Assured"
                          label="Sum Assured"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          //select
                          id="Qriskcessterm"
                          name="Qriskcessterm"
                          value={qDetail.QRiskCessTerm}
                          placeholder="Risk Cess Term"
                          label="Risk Cess Term"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        >
                          {/* {qriskcesstermData.map((val: any) => (
                            <MenuItem value={val.item}>
                              {val.shortdesc}
                            </MenuItem>
                          ))} */}
                        </TextField>
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          //select
                          id="Qpremcessterm"
                          name="Qpremcessterm"
                          value={qDetail.QPremCessTerm}
                          placeholder="Prem Cess Term"
                          label="Prem Cess Term"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        >
                          {/* {qpremcesstermData.map((val: any) => (
                            <MenuItem value={val.item}>
                              {val.shortdesc}
                            </MenuItem>
                          ))} */}
                        </TextField>
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qriskcessage"
                          name="Qriskcessage"
                          value={qDetail.QRiskCessAge}
                          placeholder="Risk Cess Age"
                          label="Risk Cess Age"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qpremcessage"
                          name="Qpremcessage"
                          value={qDetail.QPremCessAge}
                          placeholder="Prem Cess Age"
                          label="Prem Cess Age"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                              label="Risk Cess Date"
                              InputProps={{ readOnly: true }}
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
                        <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Prem Cess Date"
                              inputFormat="DD/MM/YYYY"
                              InputProps={{ readOnly: true }}
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
                          InputProps={{ readOnly: true }}
                          //select
                          id="Qageadmitted"
                          name="Qageadmitted"
                          value={qDetail.QAgeAdmitted}
                          placeholder="Age Admitted"
                          label="Age Admitted"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        >
                          {/* {qageadmittedData.map((val: any) => (
                            <MenuItem value={val.item}>
                              {val.shortdesc}
                            </MenuItem>
                          ))} */}
                        </TextField>
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qemrrating"
                          name="Qemrrating"
                          value={qDetail.QEmrRating}
                          placeholder="EMR Rating"
                          label="EMR Rating"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Qannualpremium"
                          name="Qannualpremium"
                          value={qDetail.QAnnualPremium}
                          placeholder="Annual Premium"
                          label="Annual Premium"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          type="number"
                          id="Interest"
                          name="Interest"
                          value={qDetail.Interest}
                          placeholder="Interest"
                          label="Interest"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                    </Grid2>
                  </TreeItem>
                </div>
              </>
            ))}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default QHeaderQDetailEnquiry;
