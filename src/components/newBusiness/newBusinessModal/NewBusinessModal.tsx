import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import CustomModal from "../../../utilities/modal/CustomModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import Agency from "../../agency/Agency";
import Address from "../../clientDetails/address/Address";
import Bank from "../../clientDetails/bank/Bank";
import Client from "../../clientDetails/client/Client";
import {
  extraParamItem,
  paramItem,
} from "../../clientDetails/client/clientApis/clientApis";
import PAuth from "../../clientDetails/pAuthority/Pauth";
import {
  createPoliciesWithBenefits,
  extraParams,
} from "../../policy/policyApis/policyApis";
import { deleteApi } from "../../policy/policyModal/benefit/benefitApis/benefitApis";
import ExtrasAdd from "../extras/extrasAdd";
import IlpFundsAdd from "../ilpFunds/IlpFundsAdd";
import { modifyPolicyWithBenefits } from "../newBusinessApis/newBusinessApis";

function NewBusinessModal({
  state,
  dispatch,
  ACTIONS,
  record,
  setNotify,
  getData,
  validatePolicy,
  setbenefitsData,
  benefitsData,
  interest,
  setinterest,
  initialBenefitsValuesIlp,
  initialBenefitsValues,
  funds,
  setfunds,
  extrasforedit,
  setextrasforedit,
}: any) {
  const addTitle: string = "Policy Add";
  const editTitle: string = "Policy Edit";
  const infoTitle: string = "Policy Info";
  const size = "xl";

  const totalFundPercentage = useRef(0);

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

  const [selecteBenefitIndex, setselecteBenefitIndex] = useState("");
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

        return resp.data?.AllowedFrequencies;
      })
      .catch((err) => err);
  };
  const [pContractCurrData, setPContractCurrData] = useState([]);
  const getPContractCurr = (
    companyId: number,
    PProduct: string,
    date: string
  ) => {
    axios
      .get("http://localhost:3000/api/v1/basicservices/paramextradata", {
        withCredentials: true,
        params: {
          company_id: companyId,
          name: "Q0005",
          item: PProduct,
          function: "ContractCurr",
          date: moment(date).format("YYYYMMDD"),
        },
      })
      .then((resp) => {
        setPContractCurrData(resp.data?.AllowedContractCurriencies);

        return resp.data?.AllowedContractCurriencies;
      })
      .catch((err) => err);
  };

  const [pBillCurrData, setPBillCurrData] = useState([]);
  const getPBillCurr = (companyId: number, PProduct: string, date: string) => {
    axios
      .get("http://localhost:3000/api/v1/basicservices/paramextradata", {
        withCredentials: true,
        params: {
          company_id: companyId,
          name: "Q0005",
          item: PProduct,
          function: "BillingCurr",
          date: moment(date).format("YYYYMMDD"),
        },
      })
      .then((resp) => {
        setPBillCurrData(resp.data?.AllowedBillingCurriencies);

        return resp.data?.AllowedBillingCurriencies;
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
    getPContractCurr(companyId, state?.PProduct, state?.PRCD);
    getPBillCurr(companyId, state?.PProduct, state?.PRCD);
    return () => {};
  }, [state.addOpen && state?.PProduct]);

  useEffect(() => {
    getPFreq(companyId, record.PProduct, record?.PRCD);
    return () => {};
  }, [state.editOpen && record.PProduct]);

  useEffect(() => {
    getCompanyData(companyId);
    getPProduct(companyId, "Q0005", languageId);
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
      state.PProduct === "ILP"
        ? initialBenefitsValuesIlp[0]
        : initialBenefitsValues[0],
    ]);
  };

  const handleBenefitsRemove = (index: number, benefitID: number) => {
    const list = [...benefitsData];
    list.splice(index, 1);
    setbenefitsData(list);
    state.editOpen && benefitID
      ? deleteApi(benefitID)
          .then((resp) => {})
          .catch((err) => {})
      : null;
    const fundlist = [...ilpfunds];
    fundlist.splice(index, 1);
    setilpfunds(fundlist);
    const extralist = [...extras];
    extralist.splice(index, 1);
    setextras(extralist);
    state.editOpen && benefitID
      ? deleteApi(benefitID)
          .then((resp) => {})
          .catch((err) => {})
      : null;
  };

  const [capturedCovg, setcapturedCovg] = useState("");
  const [benefitClientId, setbenefitClientId] = useState<any>({
    "0": "",
  });

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

  const benefitClientOpenFunc = (item: any) => {
    setbenefitClientId((prev: any) => {
      prev[selecteBenefitIndex] = item.ID;
      return prev;
    });
    setbenefitsData(
      benefitsData?.map((benefits: any, index: number) => {
        if (index === +selecteBenefitIndex) {
          return {
            ...benefits,
            ClientID: benefitClientId[selecteBenefitIndex],
          };
        } else return benefits;
      })
    );
    dispatch({ type: ACTIONS.BENEFITCLIENTCLOSE });
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
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;

    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  const authOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PayingAuthority = item.ID;
    } else record.PayingAuthority = item.ID;

    dispatch({ type: ACTIONS.AUTHCLOSE });
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

  const [termRangeMenu, settermRangeMenu] = useState<any>({});
  const [pptRangeMenu, setpptRangeMenu] = useState<any>({});
  const bcoverage = useRef("");
  const termRange = () => {
    return extraParams(companyId, "Q0006", bcoverage.current, "TermRange")
      .then((resp) => {
        //setpptRangeMenu(resp.data.AllowedTermRange);
        settermRangeMenu((prev: any) => ({
          ...prev,
          [bcoverage.current]: resp.data.AllowedTermRange,
        }));
      })
      .catch((err) => err.message);
  };
  const pptRange = () => {
    return extraParams(companyId, "Q0006", bcoverage.current, "PptRange")
      .then((resp) => {
        // setpptRangeMenu(resp.data.AllowedPptRange);
        setpptRangeMenu((prev: any) => ({
          ...prev,
          [bcoverage.current]: resp.data.AllowedPptRange,
        }));
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    termRange();
    pptRange();
    return () => {};
  }, [bcoverage.current]);

  const handleBenefitClientIdUpdate = (index: number) => {
    setselecteBenefitIndex(index.toString());
    dispatch({ type: ACTIONS.BENEFITCLIENTOPEN });
  };

  const [ilpModalParam, setilpModalParam] = useState({
    open: false,
    data: null,
  });

  const [extraModalParam, setextraModalParam] = useState({
    open: false,
    data: null,
  });

  const [benefitIndex, setbenefitIndex] = useState(0);
  const initialFundValues = [
    {
      FundCode: "",
      FundPercentage: 0,
    },
  ];

  const [fundDetails, setfundDetails] = useState(initialFundValues);

  const ilpOpen = (data: any) => {
    setilpModalParam((prev) => ({ ...prev, open: true, data }));
    setbenefitIndex(data?.benefitIndex);
  };

  const ilpClose = (values: any) => {
    setilpModalParam((prev) => ({ ...prev, open: false }));
    const uniqueFundsMap: Map<string, any> = new Map();

    // Filter out duplicates based on FundCode
    if (state.addOpen) {
      const uniqueFunds = fundDetails?.filter((fund: any) => {
        if (fund?.FundCode && fund?.FundPercentage !== undefined) {
          // Check if the FundCode is already in the map
          if (!uniqueFundsMap.has(fund.FundCode)) {
            uniqueFundsMap.set(fund.FundCode, fund);
            return true;
          }
        }
        return false;
      });
    } else {
      const uniqueFunds = funds?.filter((fund: any) => {
        if (fund?.FundCode && fund?.FundPercentage !== undefined) {
          // Check if the FundCode is already in the map
          if (!uniqueFundsMap.has(fund.FundCode)) {
            uniqueFundsMap.set(fund.FundCode, fund);
            return true;
          }
        }
        return false;
      });
    }
    if (values.operation === "save") {
      const updatedIlpFunds = Array.from(uniqueFundsMap.values());

      if (benefitsData[benefitIndex]) {
        benefitsData[benefitIndex].IlpFunds = updatedIlpFunds;
      }
      setNotify({
        isOpen: true,
        message: "Successfully Captured Funds",
        type: "success",
      });
    }
    if (values.operation === "cancel") {
      setfundDetails(initialFundValues);
      totalFundPercentage.current = 0;
    }
  };

  const extraOpen = (data: any) => {
    setextraModalParam((prev) => ({ ...prev, open: true, data }));
    setbenefitIndex(data?.benefitIndex);
  };

  const extraClose = (values: any) => {
    setextraModalParam((prev) => ({ ...prev, open: false }));

    const uniqueExtrasMap: Map<string, any> = new Map();

    let updatedBenefitsData = benefitsData.map((benefit: any) => {
      if (benefit.Index === benefitIndex) {
        benefit.Extras.forEach((extra: any) => {
          if (extra?.EMethod && extra?.EReason !== undefined) {
            if (!uniqueExtrasMap.has(extra.EMethod)) {
              uniqueExtrasMap.set(extra.EMethod, extra);
            }
          }
        });
        return {
          ...benefit,
          Extras: Array.from(uniqueExtrasMap.values()),
        };
      }
      return benefit;
    });

    if (values.operation === "save") {
      updatedBenefitsData = updatedBenefitsData.map((benefit: any) => {
        if (benefit.Index === benefitIndex) {
          return {
            ...benefit,
            Extras: Array.from(uniqueExtrasMap.values()),
          };
        }
        return benefit;
      });

      setbenefitsData(updatedBenefitsData);

      setNotify({
        isOpen: true,
        message: "Successfully Captured Extras",
        type: "success",
      });
    }
  };

  useEffect(() => {
    setCheckedItems([]);
    setbenefitClientId({
      "0": "",
    });
    setfundDetails(initialFundValues);

    return () => {};
  }, [state.addOpen === false]);

  const [ilpfunds, setilpfunds] = useState([
    { FundCode: "", FundPercentage: "" },
  ]);

  const [extras, setextras] = useState([
    {
      EReason: "",
      EMethod: "",
      ToDate: "",
      ReasonDescription: "",
      EPrem: 0,
      EPercentage: 0,
      EAmt: 0,
      ETerm: 0,
      EAge: 0,
      EMillie: 0,
    },
  ]);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, name]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== name)
      );
    }
  };

  const [p0071Data, setP0071Data] = useState<any>([]);

  const getP0071 = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramItem?companyId=1&name=P0071&languageId=1&item=${bcoverage.current}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        const data = resp.data?.param?.data?.p0071Array || [];
        setP0071Data(data);

        const defaultChecked = data
          .filter((item: any) => item.manOrOpt === "M")
          .map((item: any) => item.benDataType);

        setCheckedItems(defaultChecked);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.message);
      });
  };

  useLayoutEffect(() => {
    getP0071();
  }, [bcoverage.current]);
  const [selectedBillingType, setSelectedBillingType] = useState("");
  const [P0055Data, setP0055Data] = useState<any>({});
  // const authTableOpen = useRef(false);
  const getP0055 = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/paramItem?companyId=1&name=P0055&languageId=1&item=${selectedBillingType}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        const data = resp.data?.param?.data;
        setP0055Data(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.message);
      });
  };
  useEffect(() => {
    getP0055();
  }, [selectedBillingType]);
  const iconSelect = (benDataType: any, benefits: any, index: number) => {
    switch (benDataType) {
      case "Extra":
        {
          extraOpen({
            benefitIndex: index,
            extraData: benefits.Extras,
          });
        }
        break;
      case "Fund":
        {
          ilpOpen({
            benefitIndex: index,
            fundData: benefits.IlpFunds,
          });
        }
        break;
    }
  };
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
            ) : state.authOpen ? (
              <CustomModal
                size={size}
                open={state.authOpen}
                handleClose={() => dispatch({ type: ACTIONS.AUTHCLOSE })}
              >
                <PAuth modalFunc={authOpenFunc} />
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
                    InputProps={{ readOnly: state.infoOpen }}
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
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="ProposalDate"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.ProposalDate
                            : record?.ProposalDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "ProposalDate",
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
                    inputProps={{ readOnly: state.editOpen || state.infoOpen }}
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
                      <MenuItem key={val?.item} value={val?.item}>
                        {val?.shortdesc}
                      </MenuItem>
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
                      <MenuItem value={val.Item}>{val.ShortDesc}</MenuItem>
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
                      <MenuItem value={val.Item}>{val.ShortDesc}</MenuItem>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectedValue = e.target.value;
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: selectedValue,
                        fieldName: "BillingType",
                      });
                      setSelectedBillingType(selectedValue);
                    }}
                    fullWidth
                    margin="dense"
                  >
                    {billingData.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.shortdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="BankID"
                    onClick={() => dispatch({ type: ACTIONS.BANKOPEN })}
                    name="BankID"
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

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{
                      readOnly:
                        state.infoOpen || P0055Data.payingAuthority === "Y",
                    }}
                    id="PayingAuthority"
                    onClick={() => {
                      if (P0055Data.payingAuthority === "Y") {
                        dispatch({ type: ACTIONS.AUTHOPEN });
                      }
                    }}
                    name="PayingAuthority"
                    value={
                      state.addOpen
                        ? state.PayingAuthority
                        : record?.PayingAuthority
                    }
                    onChange={(e) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PayingAuthority",
                      })
                    }
                    placeholder="paying_authority"
                    label="paying_authority"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>
            {benefitsData?.map((benefits: any, benfitIndex: number) => {
              bcoverage.current = benefits?.BCoverage;

              return (
                <>
                  {state.benefitClientOpen ? (
                    <CustomModal
                      size={size}
                      open={state.benefitClientOpen}
                      handleClose={() =>
                        dispatch({ type: ACTIONS.BENEFITCLIENTCLOSE })
                      }
                    >
                      <Client modalFunc={benefitClientOpenFunc} />
                    </CustomModal>
                  ) : null}
                  <div style={{ display: "flex" }}>
                    <TreeItem
                      nodeId={(benfitIndex + 2).toString()}
                      label={state.addOpen ? `Benefits Add` : `Benefits Edit`}
                      style={{ minWidth: "95%", margin: "0px 1rem" }}
                    >
                      <>
                        <span
                          style={{
                            textAlign: "center",
                            display: "block",
                          }}
                        >
                          <hr />
                        </span>

                        <section
                          style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                          }}
                        >
                          {p0071Data.map((item: any, index: number) => (
                            <span style={{ textAlign: "center" }}>
                              <Grid2 xs={8} md={6} lg={4}>
                                {item.manOrOpt === "M" ? (
                                  <span
                                    style={{ display: "block", color: "red" }}
                                  >
                                    *
                                  </span>
                                ) : null}
                                <Tooltip title={`${item.benDataType}`}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() =>
                                      iconSelect(
                                        item.benDataType,
                                        benefits,
                                        benfitIndex
                                      )
                                    }
                                    style={{
                                      maxWidth: "30px",
                                      maxHeight: "30px",
                                      minWidth: "30px",
                                      minHeight: "30px",
                                      // backgroundColor: "#191970",
                                    }}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item?.icon,
                                      }}
                                    />
                                  </Button>
                                </Tooltip>
                              </Grid2>
                            </span>
                          ))}
                        </section>
                      </>

                      <br />
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
                            InputProps={{ readOnly: state.infoOpen }}
                            id="ClientID"
                            name="ClientID"
                            InputLabelProps={{ shrink: true }}
                            value={
                              state.addOpen ? state.ClientID : record?.ClientID
                            }
                            onClick={() =>
                              handleBenefitClientIdUpdate(benfitIndex)
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
                                  handleBStartDate(date, benfitIndex)
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, benfitIndex)}
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
                            id="BTerm"
                            name="BTerm"
                            value={benefits.BTerm}
                            placeholder="b_term"
                            label="b_term"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, benfitIndex)}
                            fullWidth
                            margin="dense"
                          >
                            {termRangeMenu[bcoverage.current]?.map(
                              (val: any, index: any) => (
                                <MenuItem key={val} value={val}>
                                  {val}
                                </MenuItem>
                              )
                            )}
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
                            ) => handleChange(e, benfitIndex)}
                            fullWidth
                            margin="dense"
                          >
                            {pptRangeMenu[bcoverage.current]?.map(
                              (val: any, index: any) => (
                                <MenuItem key={val} value={val}>
                                  {val}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            id="BSumAssured"
                            name="BSumAssured"
                            value={benefits.BSumAssured}
                            placeholder="b_sum_assured"
                            label="b_sum_assured"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, benfitIndex)}
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
                                      handleChange(e, benfitIndex)
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
                              ) => handleChange(e, benfitIndex)}
                              fullWidth
                              margin="dense"
                            ></TextField>
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
                      {benefitsData?.length - 1 === benfitIndex &&
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
                            handleBenefitsRemove(benfitIndex, benefits.ID)
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
      <IlpFundsAdd
        open={ilpModalParam.open}
        handleClose={ilpClose}
        data={ilpModalParam.data}
        fundDetails={state.addOpen ? fundDetails : funds}
        setfundDetails={state.addOpen ? setfundDetails : setfunds}
        setNotify={setNotify}
        totalFundPercentage={totalFundPercentage}
      />
      <ExtrasAdd
        open={extraModalParam.open}
        handleClose={extraClose}
        data={extraModalParam.data}
        benefitsData={state.addOpen ? benefitsData : extrasforedit}
        setbenefitsData={state.addOpen ? setbenefitsData : setextrasforedit}
        benefitIndex={benefitIndex}
      />
    </div>
  );
}

export default NewBusinessModal;
