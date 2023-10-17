import React, { useEffect, useReducer, useRef, useState } from "react";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import styles from "./policyEnquiry.module.css";
import { useAppSelector } from "../../../redux/app/hooks";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormControl, MenuItem, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import {
  frequency,
  p0018,
  p0023,
  p0024,
  q0005,
} from "../../policy/policyApis/policyApis";
import BenefitEnquiry from "../../policy/policyModal/enquiry/BenefitEnquiry";
import ClientEnquiry from "../../policy/policyModal/enquiry/ClientEnquiry";

function PolicyInformation({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: any) {
  const title = "Policy Enquiry";
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

  const [q0005Data, setq0005Data] = useState([]);

  const getQ0005 = () => {
    return q0005(companyId, languageId)
      .then((resp) => {
        setq0005Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };
  const [freq, setfreq] = useState([]);

  const getFreq = () => {
    return frequency(companyId, languageId)
      .then((resp) => {
        setfreq(resp.data.AllowedFrequencies);
      })
      .catch((err) => console.log(err.message));
  };
  const [p0018Data, setp0018Data] = useState([]);

  const getQ0018 = () => {
    return p0018(companyId, languageId)
      .then((resp) => {
        setp0018Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };
  const [cCurData, setcCurData] = useState([]);
  const [bCurData, setbCurData] = useState([]);

  const getQ0023Ccur = (Ccur: string) => {
    return p0023(companyId, languageId, Ccur)
      .then((resp) => {
        setcCurData(resp.data.AllowedContractCurriencies);
      })
      .catch((err) => console.log(err.message));
  };
  const getQ0023Bcur = (Bcur: string) => {
    return p0023(companyId, languageId, Bcur)
      .then((resp) => {
        setbCurData(resp.data.AllowedBillingCurriencies);
      })
      .catch((err) => console.log(err.message));
  };

  const [p0024Data, setp0024Data] = useState([]);

  const getQ0024 = () => {
    return p0024(companyId, languageId)
      .then((resp) => {
        setp0024Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  const [coverage, setcoverage] = useState([]);

  const getCoverage = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramextradata?name=Q0011&date=20220101&item=END&company_id=1`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcoverage(resp.data["AllowedCoverages"]);
        dispatchBenefit({
          type: "INITIALIZE_STATE",
          payload: [...resp.data["AllowedCoverages"]],
        });
      })
      .catch((err) => console.log(err.message));
  };

  const [clientData, setclientData] = useState([]);
  const getClientByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/clientsgetbypol/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setclientData(resp.data?.Clients);
      })
      .catch((err) => console.log(err.message));
  };

  const [bankData, setbankData] = useState([]);
  const getbankByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/banksgetbypol/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setbankData(resp.data?.Clients);
      })
      .catch((err) => console.log(err.message));
  };

  const [TDFData, setTDFData] = useState([]);
  const geTDFByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/policytdf/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setTDFData(resp.data["TDFPolicy"]);
        console.log(resp.data["TDFPolicy"], "TDF Data");
      })
      .catch((err) => console.log(err.message));
  };

  const [BALData, setBALData] = useState([]);
  const geBALByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/glbalget/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setBALData(resp.data?.History);
      })
      .catch((err) => console.log(err.message));
  };

  const [benefitenquiryData, setbenefitenquiryData] = useState([]);

  const getBenefitByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/benefitgetbypol/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setbenefitenquiryData(resp.data?.Benefit);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getBenefitByPolicy();
    return () => {};
  }, []);

  const [addressData, setaddressData] = useState([]);
  const getAddressByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/addressgetbypol/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setaddressData(resp.data?.Address);
      })
      .catch((err) => console.log(err.message));
  };

  const [historyData, sethistoryData] = useState([]);
  const getHistoryByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/historyget/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        sethistoryData(resp.data?.History);
      })
      .catch((err) => console.log(err.message));
  };

  const [uwData, setuwData] = useState([]);
  const getUWByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/uwenquiry/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setuwData(resp.data?.UWEnquiry);
      })
      .catch((err) => console.log(err.message));
  };

  const [communicationData, setcommunicationData] = useState([]);
  const getCommunicationByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/policycomm/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setcommunicationData(resp.data?.Comm);
      })
      .catch((err) => console.log(err.message));
  };

  const [survivalbenefitenquiryData, setsurvivalbenefitenquiryData] = useState(
    []
  );
  const getSurvivalBenefitByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/survbs/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setsurvivalbenefitenquiryData(resp.data?.SurvivalBenefits);
      })
      .catch((err) => console.log(err.message));
  };

  const [extraData, setextraData] = useState([]);
  const getextraByPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/extras/${record.ID}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setextraData(resp.data?.Extras);
      })
      .catch((err) => console.log(err.message));
  };

  const [ilpSummaryData, setilpSummaryData] = useState([]);
  const getIlpSummaryByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/ilpservices/ilpsummarybypol/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setilpSummaryData(resp.data?.IlpSummary);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCoverage();

    return () => {};
  }, []);

  useEffect(() => {
    getbankByPolicy();
    geTDFByPolicy();

    getAddressByPolicy();
    getHistoryByPolicy();
    geBALByPolicy();
    getUWByPolicy();
    getCommunicationByPolicy();
    getextraByPolicy();
    getSurvivalBenefitByPolicy();
    getIlpSummaryByPolicy();
    return () => {};
  }, [state.infoOpen]);

  var initialBenefitValues = coverage.map((value) => ({
    BStartDate: "",
    BTerm: "",
    ClientID: "",
    clientOpen: false,
    BPTerm: "",
    BCoverage: "",
    BSumAssured: "",
  }));

  const benefitReducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return state.map((value: any, index: number) => {
          if (index === action.index) {
            let newValue = value;
            newValue[action.fieldName] = action.payload;
            return newValue;
          } else {
            return value;
          }
        });
      case ACTIONS.CLIENTOPEN:
        return state.map((value: any, index: number) => {
          if ((index = action.index)) {
            return {
              ...value,
              clientOpen: true,
            };
          }
        });
      case ACTIONS.CLIENTCLOSE:
        return state.map((value: any, index: number) => {
          if ((index = action.index)) {
            return {
              ...value,
              clientOpen: false,
            };
          }
        });
      case "INITIALIZE_STATE":
        return action.payload;
      default:
        return initialBenefitValues;
    }
  };

  const [benefitData, dispatchBenefit] = useReducer(
    benefitReducer,
    initialBenefitValues
  );

  const handleBenefitFormSubmit = (index: number, policyId: string) => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/benefitcreate`,
        {
          CompanyID: companyId,
          PolicyID: parseInt(policyId),
          ClientID: parseInt(benefitData[index]?.ClientID),
          BStartDate: moment(benefitData[index]?.BStartDate)
            .format("YYYYMMDD")
            .toString(),
          BTerm: parseInt(benefitData[index]?.BTerm),
          BPTerm: parseInt(benefitData[index]?.BPTerm),
          BCoverage: benefitData[index]?.Coverage,
          BSumAssured: parseInt(benefitData[index]?.BSumAssured),
        },
        { withCredentials: true }
      )
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanyData(companyId);
    getQ0005();
    getFreq();
    getQ0018();
    getQ0023Ccur("ContractCurr");
    getQ0023Bcur("BillingCurr");
    getQ0024();
    return () => {};
  }, []);

  useEffect(() => {
    getCoverage();
    return () => {};
  }, []);

  const policyAndModalAddSubmit = async () => {
    const response = await handleFormSubmit();

    if (response.status === 200) {
      for (let i = 0; i < coverage.length; i++) {
        handleBenefitFormSubmit(i, response?.response?.data?.Created);
      }
      dispatch({ type: ACTIONS.ADDCLOSE });
    }
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

  const tabsArray = [
    {
      tabName: "Benefits",
      tabIcon: "",
    },
    {
      tabName: "Clients",
      tabIcon: "",
    },
    {
      tabName: "Address",
      tabIcon: "",
    },
    {
      tabName: "Bank",
      tabIcon: "",
    },
    {
      tabName: "Policy History",
      tabIcon: "",
    },
    {
      tabName: "Account Balance",
      tabIcon: "",
    },
    {
      tabName: "Tdf",
      tabIcon: "",
    },
    {
      tabName: "Uw Enquiry",
      tabIcon: "",
    },
    {
      tabName: "Communication",
      tabIcon: "",
    },
    {
      tabName: "Survival Benfit",
      tabIcon: "",
    },
    {
      tabName: "Extra",
      tabIcon: "",
    },
    {
      tabName: "Invest Summary",
      tabIcon: "",
    },
  ];

  const [activeTab, setActiveTab] = useState("Benefits"); // Initialize with the default active tab

  const handleTabClick = async (tabName: string) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "Benefits":
        getBenefitByPolicy(); // Await data retrieval

        break;
      case "Clients":
        getClientByPolicy(); // Await data retrieval

        break;
      // Add cases for other tabs
      default:
        getBenefitByPolicy(); // Await data retrieval
    }
  };

  return (
    <div>
      <CustomFullModal
        open={state.infoOpen}
        title={title}
        handleClose={() => dispatch({ type: ACTIONS.INFOCLOSE })}
      >
        <main className={styles.main}>
          <form className={styles["policy-enquiry"]}>
            <Grid2
              container
              spacing={2}
              style={{ width: "95%", margin: "10px auto" }}
            >
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  InputLabelProps={{ shrink: true }}
                  id="CompanyID"
                  name="CompanyID"
                  value={companyData?.CompanyName}
                  placeholder="Company"
                  label="Company"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  //   dispatch({
                  //     type: state.addOpen
                  //       ? ACTIONS.ONCHANGE
                  //       : ACTIONS.EDITCHANGE,
                  //     payload: e.target.value,
                  //     fieldName: "CompanyID",
                  //   })
                  // }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="PRCD"
                      inputFormat="DD/MM/YYYY"
                      value={record.PRCD}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "PRCD",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  select
                  id="PProduct"
                  name="PProduct"
                  value={record.PProduct}
                  placeholder="Product"
                  label="Product"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {q0005Data.map((val: any) => (
                    <MenuItem key={val.item} value={val.item}>
                      {val.longdesc}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  id="PFreq"
                  name="PFreq"
                  value={record.PFreq}
                  placeholder="Frequency"
                  label="Frequency"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                ></TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  // select
                  id="PContractCurr"
                  name="PContractCurr"
                  value={record.PContractCurr}
                  placeholder="Contract Currency"
                  label="Contract Currency"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {/* {cCurData.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))} */}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  // select
                  id="PBillCurr"
                  name="PBillCurr"
                  value={record.PBillCurr}
                  placeholder="Bill Currency"
                  label="Bill Currency"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {/* {bCurData.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))} */}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  select
                  id="POffice"
                  name="POffice"
                  value={record.POffice}
                  placeholder="Office"
                  label="Office"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {p0018Data.map((val: any) => (
                    <MenuItem key={val.item} value={val.item}>
                      {val.longdesc}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  select
                  disabled
                  id="PolStatus"
                  name="PolStatus"
                  value={record.PolStatus}
                  placeholder="Policy Status"
                  label="Policy Status"
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                >
                  {p0024Data.map((val: any) => (
                    <MenuItem key={val.item} value={val.item}>
                      {val.longdesc}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="Received Date"
                      inputFormat="DD/MM/YYYY"
                      value={record.PReceivedDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "PReceivedDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="Bill To Date"
                      inputFormat="DD/MM/YYYY"
                      value={record.BTDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "BTDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="Paid To Date"
                      inputFormat="DD/MM/YYYY"
                      value={record.PaidToDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "PaidToDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="Next Billing Date"
                      inputFormat="DD/MM/YYYY"
                      value={record.NxtBTDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "NxtBTDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={3}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="Anniversy Date"
                      inputFormat="DD/MM/YYYY"
                      value={record.AnnivDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: date?.$d,
                          fieldName: "AnnivDate",
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="InstalmentPrem"
                  name="InstalmentPrem"
                  value={record.InstalmentPrem}
                  placeholder="Installment Premium"
                  label="Installment Premium"
                  fullWidth
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="ClientID"
                  name="ClientID"
                  value={record.ClientID}
                  placeholder="Owner Id"
                  label="Owner Id"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="AddressID"
                  name="AddressID"
                  value={record.AddressID}
                  placeholder="Address Id"
                  label="Address Id"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="AgencyID"
                  name="AgencyID"
                  value={record.AgencyID}
                  placeholder="Agency Id"
                  label="Agency Id"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="BillingType"
                  name="BillingType"
                  value={record.BillingType}
                  placeholder="Billing Type"
                  label="Billing Type"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={3}>
                <TextField
                  InputProps={{ readOnly: state.infoOpen }}
                  id="BankID"
                  name="BankID"
                  value={record.BankID}
                  placeholder="Bank ID"
                  label="Bank ID"
                  fullWidth
                  margin="dense"
                />
              </Grid2>
            </Grid2>
          </form>
          <nav className={styles["navtabs"]}>
            <ul>
              {tabsArray.map((tabsObj) => (
                <li
                  key={tabsObj.tabName}
                  className={`${styles["tabs-li"]} ${
                    activeTab === tabsObj.tabName ? styles.active : ""
                  }`}
                  onClick={() => handleTabClick(tabsObj.tabName)}
                >
                  <span>{tabsObj.tabName}</span>
                  <span>
                    <PersonIcon />
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <section className={styles["tabs-enquiry"]}>
            <h1>{activeTab}</h1>
            {activeTab === "Benefits" ? (
              <BenefitEnquiry
                benefitenquiryData={benefitenquiryData}
                state={state}
                policyNo={record.ID}
                TransactionNo={record.Tranno}
              />
            ) : (
              <ClientEnquiry clientData={clientData} state={state} />
            )}
          </section>
        </main>
      </CustomFullModal>
    </div>
  );
}

export default PolicyInformation;