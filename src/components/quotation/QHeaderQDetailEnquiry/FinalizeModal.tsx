import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import Notification from "../../../utilities/Notification/Notification";

import axios from "axios";
import CustomModal from "../../../utilities/modal/CustomModal";

//Attention: Check the path below
import {
  paramCoverageItem,
  paramItem,
  paramTermItem,
} from "../qHeaderApis/qHeaderApis";
import { createPoliciesWithBenefits } from "../QHeaderQDetailEnquiry/FinalizeApi";

import Agency from "../../agency/Agency";
import Address from "../../clientDetails/address/Address";
import Client from "../../clientDetails/client/Client";
function FinalizeModal({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  record,
  getData,
}: any) {
  const title = "Policy Quotation";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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
    getQcoverage(companyId, "Q0011", record?.QProduct, "20220101", languageId);

    return () => {};
  }, []);

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

  const [benefitData, setBenefitData] = useState([
    {
      CompanyID: companyId,
      ClientID: 0,
      BCoverage: "",
      BSumAssured: "",
      BPTerm: "",
      BTerm: "",
      BStartDate: "",
    },
  ]);

  const handleQDetailAdd = () => {
    setBenefitData([
      ...benefitData,
      {
        CompanyID: companyId,
        ClientID: 0,
        BCoverage: "",
        BSumAssured: "",
        BPTerm: "",
        BTerm: "",
        BStartDate: "",
      },
    ]);
  };

  const [addressClntData, setaddressClntData] = useState([]);
  const getAddressByClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/addressgetbyclient/${state?.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setaddressClntData(resp.data?.AddressByClientID);
      })
      .catch((err) => console.log(err.message));
  };

  const [benefitsData, setBenefitsData] = useState<any>([]);
  const [policyData, setPolicyData] = useState<any>([]);
  const getDetails = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/quotationservices/quotefinalize/${record?.ID}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setBenefitsData(resp.data["Benefits"]);
        setPolicyData(resp?.data);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(benefitsData, "========", policyData);
  const [qHeaderData, setQHeaderData] = useState<any>([]);
  const getQHeader = (resp: any) => {
    axios
      .put(
        `http://localhost:3000/api/v1/quotationservices/qheaderupdate`,
        {
          ID: parseInt(record?.ID),
          Policy: parseInt(resp.data?.Created),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setQHeaderData(resp.data);
      })
      .catch((err) => console.log(err.message));
  };
  // const [policyData, setPolicyData] = useState<any>([]);
  // const getPolicy = () => {
  //   axios
  //     .post(
  //       `http://localhost:3000/api/v1/quotationservices/quotefinalize/${record?.ID}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((resp) => {
  //       setPolicyData(resp.data["Policy"]);
  //     })
  //     .catch((err) => console.log(err.message));
  // };
  // console.log(detailsData, "========", policyData);

  // const handleQDetailRemove = (index: number) => {
  //   const list = [...qDetailData];
  //   list.splice(index, 1);
  //   setqDetailData(list);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const { name, value } = e.target;
  //   setqDetailData(
  //     qDetailData.map((qDetail, index) => {
  //       if (index === i) {
  //         return { ...qDetail, [name]: value };
  //       } else return qDetail;
  //     })
  //   );
  // };

  const addPoliciesWithBenefits = () => {
    return createPoliciesWithBenefits(
      state,
      companyId,
      benefitsData,
      policyData
    )
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created record of id:${resp.data?.Created}`,
          type: "success",
        });
        getQHeader(resp);
        getData();
      })
      .catch((err) => err.message);
  };

  //   //get Api
  //   const getById = async (id: number) => {
  //     getQheader(id)
  //       .then((resp) => {
  //         console.log(resp);
  //         dispatch({ type: ACTIONS.EDITCLOSE });
  //         getData();
  //       })
  //       .catch((err) => console.log(err.message));
  //   };

  // const handleQriskcessdate = (date: any, i: number) => {
  //   setBenefitData(
  //     benefitData.map((benefit, index) => {
  //       if (index === i) {
  //         return { ...benefit, Qriskcessdate: date };
  //       } else return benefit;
  //     })
  //   );
  // };
  // const handleQpremcessdate = (date: any, i: number) => {
  //   setBenefitData(
  //     benefitData.map((benefit, index) => {
  //       if (index === i) {
  //         return { ...benefit, Qpremcessdate: date };
  //       } else return benefit;
  //     })
  //   );
  // };
  // const clientOpenFunc = (item: any) => {
  //   if (state.addOpen) {
  //     state.ClientID = item.ID;
  //   } else record.ClientID = item.ID;
  //   dispatch({ type: ACTIONS.CLIENTCLOSE });
  // };

  // const addressOpenFunc = (item: any) => {
  //   if (state.addOpen) {
  //     state.AddressID = item.ID;
  //   } else record.AddressID = item.ID;
  //   dispatch({ type: ACTIONS.ADDRESSCLOSE });
  // };

  // const agencyOpenFunc = (item: any) => {
  //   if (state.addOpen) {
  //     state.AgencyID = item.ID;
  //   } else record.AgencyID = item.ID;
  //   dispatch({ type: ACTIONS.AGENCYCLOSE });
  // };

  useEffect(() => {
    getAddressByClient();
    return () => {};
  }, [record?.ClientID]);

  useEffect(() => {
    getDetails();
    //getPolicy();

    return () => {};
  }, [state?.policycreateOpen]);

  return (
    <div>
      <CustomFullModal
        open={state?.policycreateOpen}
        //Attention: Check the path below
        handleFormSubmit={addPoliciesWithBenefits}
        handleClose={() => dispatch({ type: ACTIONS.POLICYCREATECLOSE })}
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
            <TreeItem nodeId="1" label={`Policy Quotation`}>
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
                        readOnly={state?.poicycreateOpen}
                        label="PRCD"
                        inputFormat="DD/MM/YYYY"
                        value={policyData?.PRCD}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "PRCD",
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
                    //onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="ClientID"
                    value={policyData?.ClientID}
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: ACTIONS.ONCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "ClientID",
                    //   })
                    // }
                    placeholder="Client ID"
                    label="Client ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: state?.poicycreateOpen }}
                    id="AddressID"
                    onClick={() => dispatch({ type: ACTIONS.ADDRESSOPEN })}
                    name="AddressID"
                    value={policyData?.AddressID}
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
                    InputProps={{ readOnly: state?.poicycreateOpen }}
                    //select
                    id="PContractCurr"
                    name="PContractCurr"
                    value={policyData?.PContractCurr}
                    placeholder="Contract Currency"
                    label="Contract Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PContractCurr",
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
                    id="PBillCurr"
                    //onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="PBillCurr"
                    value={policyData?.PBillCurr}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PBillCurr",
                      })
                    }
                    placeholder="PBillCurr"
                    label="PBillCurr"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: state?.poicycreateOpen }}
                    //select
                    id="Office"
                    name="Office"
                    value={policyData?.Office}
                    placeholder="Office"
                    label="Office"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "Office",
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
                    id="PProduct"
                    name="PProduct"
                    value={policyData?.PProduct}
                    placeholder="Product"
                    label="Product"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PProduct",
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
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state?.poicycreateOpen}
                        label="PReceivedDate"
                        inputFormat="DD/MM/YYYY"
                        value={policyData?.PReceivedDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "PReceivedDate",
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
                        readOnly={state?.poicycreateOpen}
                        label="PUWDate"
                        inputFormat="DD/MM/YYYY"
                        value={policyData?.PUWDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "PUWDate",
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
                        readOnly={state?.poicycreateOpen}
                        label="ProposalDate"
                        inputFormat="DD/MM/YYYY"
                        value={policyData?.ProposalDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "ProposalDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="PFreq"
                    name="PFreq"
                    value={policyData?.PFreq}
                    placeholder="Frequency"
                    label="Frequency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PFreq",
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
                    value={policyData?.AgencyID}
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
            {benefitsData?.map((benefit: any, index: number) => (
              <>
                <div style={{ display: "flex" }}>
                  <TreeItem
                    nodeId={(index + 2).toString()}
                    label={`Benefits`}
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
                          // Attention: *** Check the value details  ***
                          value={benefit?.ClientID}
                          placeholder="ClientID"
                          label="ClientID"
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          // select
                          id="BCoverage"
                          name="BCoverage"
                          value={benefit?.BCoverage}
                          placeholder="Coverage"
                          label="Coverage"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   handleChange(e, index)
                          // }
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
                          type="number"
                          id="BSumAssured"
                          name="BSumAssured"
                          value={benefit?.BSumAssured}
                          placeholder="Sum Assured"
                          label="Sum Assured"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   handleChange(e, index)
                          // }
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          //select
                          id="BPTerm"
                          name="BPTerm"
                          value={benefit.BPTerm}
                          placeholder="Risk Cess Term"
                          label="Risk Cess Term"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   handleChange(e, index)
                          // }
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
                          //select
                          id="BTerm"
                          name="BTerm"
                          value={benefit.BTerm}
                          placeholder="Prem Cess Term"
                          label="Prem Cess Term"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   handleChange(e, index)
                          // }
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
                        <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Start Date"
                              inputFormat="DD/MM/YYYY"
                              value={benefit.BStartDate}
                              onChange={(date) => index}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid2>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          id="Interest"
                          name="Interest"
                          value={benefit.Interest}
                          placeholder="Interest"
                          label="Interest"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   handleChange(e, index)
                          // }
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
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default FinalizeModal;
