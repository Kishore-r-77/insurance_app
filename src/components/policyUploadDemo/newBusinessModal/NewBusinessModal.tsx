import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import "./newBusinessModal.css";

//Attention: Check the path below
//import { PoliciesModalType } from "../../../../reducerUtilities/types/policies/policiesTypes";
import axios from "axios";
import CustomModal from "../../../utilities/modal/CustomModal";
import Agency from "../../agency/Agency";
import Address from "../../clientDetails/address/Address";
import Client from "../../clientDetails/client/Client";
import {
  extraParamItem,
  freqItems,
  paramItem,
} from "../../clientDetails/client/clientApis/clientApis";
import {
  createPoliciesWithBenefits,
  extraParams,
} from "../../policy/policyApis/policyApis";
import { modifyPolicyWithBenefits } from "../../newBusiness/newBusinessApis/newBusinessApis";
import { deleteApi } from "../../policy/policyModal/benefit/benefitApis/benefitApis";
import Bank from "../../clientDetails/bank/Bank";
import Benefit from "../../policy/policyModal/benefit/Benefit";
import moment from "moment";

function NewBusinessModal({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  record,
  notify,
  setNotify,
  getData,
  validatePolicy,
  setbenefitsData,
  benefitsData,
  interest,
  setinterest,
}: any) {
  const addTitle: string = "Policy Add";
  const editTitle: string = "Policy Edit";
  const infoTitle: string = "Policy Info";
  const size = "xl";


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

  const [pProductData, setPProductData] = useState([]);
  const getPProduct = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPProductData(resp?.data?.data);
        return resp?.data?.data;
      })
      .catch((err) => err);
  };

  const [pFreqData, setPFreqData] = useState([]);
  const getPFreq = (companyId: number, PProduct: string, date: string) => {
    axios
      .get("http://localhost:3000/api/v1/basicservices/paramextradata", {
        withCredentials: true,
        params: {
          company_id: companyId,
          name: "Q0005",
          item: PProduct,
          function: "Frequencies",
          date: moment(date).format("YYYYMMDD"),
        },
      })
      .then((resp) => {
        setPFreqData(resp.data?.AllowedFrequencies);
        console.log(resp, "Freq Data ");
        return resp.data?.AllowedFrequencies;
      })
      .catch((err) => err);
  };
  const [pContractCurrData, setPContractCurrData] = useState([]);
  const getPContractCurr = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPContractCurrData(resp.data.data);
        return resp.data.data;
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

  const [pOfficeData, setPOfficeData] = useState([]);
  const getPOffice = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPOfficeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [polStatusData, setPolStatusData] = useState([]);
  const getPolStatus = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPolStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [bCoverageData, setBCoverageData] = useState([]);
  const getBCoverage = (
    companyId: number,
    name: string,
    item: string,
    date: string
  ) => {
    extraParamItem(companyId, name, item, date)
      .then((resp) => {
        setBCoverageData(resp.data["AllowedCoverages"]);
        return resp.data["AllowedCoverages"];
      })
      .catch((err) => err);
  };

  const [billingData, setbillingData] = useState([]);
  const getBilling = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setbillingData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getPFreq(companyId, state?.PProduct, state?.PRCD);
    return () => {};
  }, [state.addOpen && state?.PProduct]);

  console.log(state.editOpen, record, "******State*****");
  useEffect(() => {
    getPFreq(companyId, record.PProduct, record?.PRCD);
    return () => {};
  }, [state.editOpen && record.PProduct]);

  useEffect(() => {
    getCompanyData(companyId);
    getPProduct(companyId, "Q0005", languageId);

    getPContractCurr(companyId, "P0023", languageId);
    getPBillCurr(companyId, "P0023", languageId);
    getPOffice(companyId, "P0018", languageId);
    getPolStatus(companyId, "P0024", languageId);
    getBilling(companyId, "P0055", languageId);

    return () => {};
  }, []);

  useEffect(() => {
    getBCoverage(
      companyId,
      "Q0011",
      state.addOpen ? state?.PProduct : record?.PProduct,
      "20220101"
    );
    return () => {};
  }, [state.addOpen ? state?.PProduct : record?.PProduct]);

  const handleBenefitsAdd = () => {
    setbenefitsData([
      ...benefitsData,
      {
        ClientID: 0,
        BStartDate: "",
        BTerm: 0,
        BPTerm: 0,
        BCoverage: "",
        BSumAssured: 0,
        Interest: 0,
        BPrem: 0,
      },
    ]);
  };

  const handleBenefitsRemove = (index: number, benefitID: number) => {
    const list = [...benefitsData];
    list.splice(index, 1);
    setbenefitsData(list);
    state.editOpen && benefitID
      ? deleteApi(benefitID)
          .then((resp) => {
            
          })
          .catch((err) => {
            
          })
      : null;
  };

  const [capturedCovg, setcapturedCovg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    if (name === "BCoverage") {
      setcapturedCovg(value);
    }
    setbenefitsData(
      benefitsData?.map((benefits: any, index: number) => {
        if (index === i) {
          return { ...benefits, [name]: value };
        } else return benefits;
      })
    );
  };

  const addPoliciesWithBenefits = () => {
    return createPoliciesWithBenefits(state, companyId, benefitsData)
      .then((resp) => {
        validatePolicy(parseInt(resp.data?.Created));
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created record of id:${resp.data?.Created}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        console.log(err);

        setNotify({
          isOpen: true,
          message: err.response.data.error,
          type: "error",
        });
      });
  };

  const modifyPolicyWithBenefit = () => {
    return modifyPolicyWithBenefits(record, companyId, benefitsData)
      .then((resp) => {
        validatePolicy(parseInt(resp.data?.Modified));
        dispatch({ type: ACTIONS.EDITCLOSE });
        setNotify({
          isOpen: true,
          message: `Modified record of id:${resp.data?.Modified}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.error,
          type: "error",
        });
      });
  };

  const handleBStartDate = (date: any, i: number) => {
    setbenefitsData(
      benefitsData?.map((benefits: any, index: number) => {
        if (index === i) {
          return { ...benefits, BStartDate: date };
        } else return benefits;
      })
    );
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

  const [bankClntData, setbankClntData] = useState([]);
  console.log("Bank Open", state.bankOpen);
  const getBankByClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientbankget/${state.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setbankClntData(resp.data?.BankByClient);
      })
      .catch((err) => console.log(err.message));
  };

  const clientOpenFunc = (item: any) => {
    console.log(item.ID, "clientId");
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

  const bankOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.BankID = item.ID;
    } else record.BankID = item.ID;
    dispatch({ type: ACTIONS.BANKCLOSE });
  };

  useEffect(() => {
    getAddressByClient();
    getBankByClient();
    return () => {};
  }, [state.ClientID]);

  const [intrestData, setintrestData] = useState([]);

  const mrtaDropdown = () => {
    return extraParams(
      companyId,
      "Q0006",
      state.addOpen ? capturedCovg : benefitsData[0]?.BCoverage,
      "MrtaInterest"
    )
      .then((resp) => setintrestData(resp.data?.AllowedInterestRates))
      .catch((err) => err.message);
  };

  useEffect(() => {
    mrtaDropdown();
    return () => {};
  }, [
    state.addOpen
      ? capturedCovg
      : state.editOpen
      ? benefitsData[0]?.BCoverage
      : null,
  ]);

  const [bpremData, setbPremData] = useState([]);

  const ilpExtra = () => {
    return extraParams(
      companyId,
      "Q0006",
      state.addOpen ? capturedCovg : benefitsData[0]?.BCoverage,
      "UlAlMethod"
    )
      .then((resp) => setbPremData(resp.data?.AllowedUlAlMethod))
      .catch((err) => err.message);
  };

  useEffect(() => {
    ilpExtra();
    return () => {};
  }, [
    state.addOpen
      ? capturedCovg
      : state.editOpen
      ? benefitsData[0]?.BCoverage
      : null,
  ]);

  console.log(benefitsData[0]?.BCoverage, "BCoverage");
  const [termRangeMenu, settermRangeMenu] = useState([]);
  const [pptRangeMenu, setpptRangeMenu] = useState([]);
  const bcoverage = useRef("");

  const termRange = () => {
    return extraParams(companyId, "Q0006", bcoverage.current, "TermRange")
      .then((resp) => {
        settermRangeMenu(resp.data.AllowedTermRange);
      })
      .catch((err) => err.message);
  };
  const pptRange = () => {
    return extraParams(companyId, "Q0006", bcoverage.current, "PptRange")
      .then((resp) => {
        setpptRangeMenu(resp.data.AllowedPptRange);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    termRange();
    pptRange();
    return () => {};
  }, [bcoverage.current]);

  return (
    <div>
      <CustomFullModal
        open={
          state.addOpen ? state.addOpen : state.editOpen ? state.editOpen : null
        }
        handleFormSubmit={
          state.addOpen
            ? addPoliciesWithBenefits
            : state.editOpen
            ? modifyPolicyWithBenefit
            : null
        }
        handleClose={() => dispatch({ type: ACTIONS.ADDCLOSE })}
        title={
          state.addOpen ? addTitle : state.editOpen ? editTitle : infoTitle
        }
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
                size={size}
                open={state.clientOpen}
                handleClose={() => dispatch({ type: ACTIONS.CLIENTCLOSE })}
              >
                <Client modalFunc={clientOpenFunc} />
              </CustomModal>
            ) : state.addressOpen ? (
              <CustomModal
                size={size}
                open={state.addressOpen}
                handleClose={() => dispatch({ type: ACTIONS.ADDRESSCLOSE })}
              >
                <Address
                  modalFunc={addressOpenFunc}
                  addressByClientData={addressClntData}
                  lookup={state.addressOpen}
                />
              </CustomModal>
            ) : state.agencyOpen ? (
              <CustomModal
                size={size}
                open={state.agencyOpen}
                handleClose={() => dispatch({ type: ACTIONS.AGENCYCLOSE })}
              >
                <Agency modalFunc={agencyOpenFunc} />
              </CustomModal>
            ) : state.bankOpen ? (
              <CustomModal
                size={size}
                open={state.bankOpen}
                handleClose={() => dispatch({ type: ACTIONS.BANKCLOSE })}
              >
                <Bank
                  modalFunc={bankOpenFunc}
                  bankClntData={bankClntData}
                  lookup={state.bankOpen}
                />
              </CustomModal>
            ) : null}
            <TreeItem
              nodeId="1"
              label={state.addOpen ? `Policies Add` : `Policies Edit`}
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
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record?.ClientID}
                    onChange={(e) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientID",
                      })
                    }
                    placeholder="client_id"
                    label="client_id"
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
                    // Attention: *** Check the value details  ***
                    value={state.addOpen ? state.AddressID : record?.AddressID}
                    onChange={(e) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    placeholder="address_id"
                    label="address_id"
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
                    // Attention: *** Check the value details  ***
                    value={state.addOpen ? state.AgencyID : record?.AgencyID}
                    onChange={(e) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencyID",
                      })
                    }
                    placeholder="agency_id"
                    label="agency_id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="PRCD"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.PRCD : record?.PRCD}
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PProduct"
                    name="PProduct"
                    value={state.addOpen ? state?.PProduct : record?.PProduct}
                    placeholder="p_product"
                    label="p_product"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PProduct",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pProductData?.map((val: any) => (
                      <MenuItem value={val?.item}>{val?.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PFreq"
                    name="PFreq"
                    value={state.addOpen ? state.PFreq : record.PFreq}
                    placeholder="p_freq"
                    label="p_freq"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PFreq",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pFreqData?.map((val: any) => (
                      <MenuItem value={val.Item}>{val.LongDesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PContractCurr"
                    name="PContractCurr"
                    value={
                      state.addOpen
                        ? state.PContractCurr
                        : record?.PContractCurr
                    }
                    placeholder="p_contract_curr"
                    label="p_contract_curr"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PContractCurr",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pContractCurrData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PBillCurr"
                    name="PBillCurr"
                    value={state.addOpen ? state.PBillCurr : record?.PBillCurr}
                    placeholder="p_bill_curr"
                    label="p_bill_curr"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PBillCurr",
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
                    select
                    id="POffice"
                    name="POffice"
                    value={state.addOpen ? state.POffice : record?.POffice}
                    placeholder="p_office"
                    label="p_office"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "POffice",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pOfficeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PolStatus"
                    name="PolStatus"
                    value={state.addOpen ? state.PolStatus : record?.PolStatus}
                    placeholder="pol_status"
                    label="pol_status"
                    inputProps={{ readOnly: true }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PolStatus",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {polStatusData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="p_received_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.PReceivedDate
                            : record?.PReceivedDate
                        }
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="puw_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.PUWDate : record?.PUWDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "PUWDate",
                          })
                        }
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="bt_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.BTDate : record?.BTDate}
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="paid_to_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.PaidToDate : record?.PaidToDate
                        }
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="nxt_bt_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.NxtBTDate : record?.NxtBTDate
                        }
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="anniv_date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.AnnivDate : record?.AnnivDate
                        }
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
                        renderInput={(params) => (
                          <TextField {...params} error={false} />
                        )}
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
                    inputProps={{ readOnly: true }}
                    id="InstalmentPrem"
                    name="InstalmentPrem"
                    value={
                      state.addOpen
                        ? state.InstalmentPrem
                        : record?.InstalmentPrem
                    }
                    placeholder="instalment_prem"
                    label="instalment_prem"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "InstalmentPrem",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="BillingType"
                    name="BillingType"
                    value={
                      state.addOpen ? state.BillingType : record?.BillingType
                    }
                    placeholder="billing_type"
                    label="billing_type"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BillingType",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {billingData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="BankID"
                    onClick={() => dispatch({ type: ACTIONS.BANKOPEN })}
                    name="BankID"
                    // Attention: *** Check the value details  ***
                    value={state.addOpen ? state.BankID : record?.BankID}
                    onChange={(e) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankID",
                      })
                    }
                    placeholder="bank_id"
                    label="bank_id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>
            {benefitsData?.map((benefits: any, index: number) => {
              bcoverage.current = benefits?.BCoverage;

              return (
                <>
                  <div style={{ display: "flex" }}>
                    <TreeItem
                      nodeId={(index + 2).toString()}
                      label={state.addOpen ? `Benefits Add` : `Benefits Edit`}
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
                            value={
                              state.addOpen ? state.ClientID : record?.ClientID
                            }
                            placeholder="client_id"
                            label="client_id"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                          <FormControl
                            style={{ marginTop: "0.5rem" }}
                            fullWidth
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="b_start_date"
                                inputFormat="DD/MM/YYYY"
                                value={
                                  state.addOpen ? state.PRCD : record?.PRCD
                                }
                                onChange={(date) =>
                                  handleBStartDate(date, index)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} error={false} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            select
                            id="BCoverage"
                            name="BCoverage"
                            value={benefits.BCoverage}
                            placeholder="b_coverage"
                            label="b_coverage"
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            //   dispatch({
                            //     type: ACTIONS.ONCHANGE,
                            //     payload: e.target.value,
                            //     fieldName: "BCoverage",
                            //   })
                            // }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          >
                            {bCoverageData.map((val: any) => (
                              <MenuItem key={val.Coverage} value={val.Coverage}>
                                {val.Coverage}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            select
                            //InputProps={{
                            //startAdornment: (
                            //<InputAdornment position="start">+91</InputAdornment>
                            // ),
                            //}}
                            id="BTerm"
                            name="BTerm"
                            value={benefits.BTerm}
                            placeholder="b_term"
                            label="b_term"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          >
                            {termRangeMenu.map((val, index) => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            select
                            id="BPTerm"
                            name="BPTerm"
                            value={benefits.BPTerm}
                            placeholder="bp_term"
                            label="bp_term"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          >
                            {pptRangeMenu.map((val, index) => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
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
                            id="BSumAssured"
                            name="BSumAssured"
                            value={benefits.BSumAssured}
                            placeholder="b_sum_assured"
                            label="b_sum_assured"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          ></TextField>
                        </Grid2>
                        {intrestData.length !== 0 ? (
                          <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                              select
                              id="Interest"
                              name="Interest"
                              value={
                                state.addOpen ? benefits.Interest : interest
                              }
                              placeholder="Interest"
                              label="Interest"
                              onChange={
                                state.addOpen
                                  ? (e: React.ChangeEvent<HTMLInputElement>) =>
                                      handleChange(e, index)
                                  : (e) => setinterest(e.target.value)
                              }
                              fullWidth
                              margin="dense"
                            >
                              {intrestData?.map((val, index) => (
                                <MenuItem value={val} key={val}>
                                  {val}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid2>
                        ) : null}
                        {bpremData.length !== 0 ? (
                          <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                              // select
                              id="BPrem"
                              name="BPrem"
                              type="number"
                              // value={benefits.BPrem}
                              value={benefits.BPrem}
                              placeholder="Premium"
                              label="Premium"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, index)}
                              fullWidth
                              margin="dense"
                            >
                              {/* {premiumData?.map((val, index) => (
                                <MenuItem value={val} key={val}>
                                  {val}
                                </MenuItem>
                              ))} */}
                            </TextField>
                          </Grid2>
                        ) : null}
                      </Grid2>
                    </TreeItem>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "5px",
                      }}
                    >
                      {benefitsData?.length - 1 === index &&
                        benefitsData?.length < 10 && (
                          <Button
                            variant="contained"
                            onClick={() => handleBenefitsAdd()}
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

                      {benefitsData?.length !== 1 && (
                        <Button
                          onClick={() =>
                            handleBenefitsRemove(index, benefits.ID)
                          }
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
            })}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default NewBusinessModal;
