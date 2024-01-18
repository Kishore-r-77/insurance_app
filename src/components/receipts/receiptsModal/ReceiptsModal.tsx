import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
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

import styles from "./receiptsModal.module.css";

//Attention: Check the path below
import { ReceiptsModalType } from "../../../reducerUtilities/types/receipts/receiptsTypes";
import { q0005, paramItem, getPolicySnap } from "../receiptsApis/receiptsApis";
import Client from "../../clientDetails/client/Client";
import Policy from "../../policy/Policy";
import {
  getPoliciesByClient,
  getPolicyApi,
} from "../../policy/policyApis/policyApis";
import { getPayingAuthByClient } from "../../clientDetails/pAuthority/pauthApis/pAuthApis";
import { AccountCircle } from "@mui/icons-material";
import HoverDetails from "../../../utilities/HoverDetails/HoverDetails";
import NewBusiness from "../../newBusiness/NewBusiness";
import axios from "axios";
import moment from "moment";
import { getBusinessDateApi } from "../receiptsApis/receiptsApis";
import PAuth from "../../clientDetails/pAuthority/Pauth";
function ReceiptsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  searchContent,
  handleSearchChange,
  payauthData,
  setpayauthData,
  currencyData,
  setcurrencyData,
}: any) {
  const addTitle: string = "Receipts Add";
  const editTitle: string = "Receipts Edit";
  const infoTitle: string = "Receipts Info";
  const size: string = "xl";

  //Creating useReducer Hook

  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);

  const [payingauthpageNum, setpayingauthpageNum] = useState(1);
  const [payingauthpageSize, setpayingauthpageSize] = useState(5);
  const [payingauthtotalRecords, setpayingauthtotalRecords] = useState(0);
  const [payingauthisLast, setpayingauthisLast] = useState(false);
  const [payingauthfieldMap, setpayingauthfieldMap] = useState([]);

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

  const [branchData, setBranchData] = useState([]);
  const getBranch = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setBranchData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  // const [clientData, setClientIDData] = useState<any>({});
  // const getClientData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setClientIDData(resp.data["ClientID"]);
  //   });
  // };

  const [typeOfReceiptData, setTypeOfReceiptData] = useState([]);
  const getTypeOfReceipt = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setTypeOfReceiptData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [toggle, settoggle] = useState(false);

  const [policyData, setpolicyData] = useState<any>([]);
  const getPolicy = (policyId: number) => {
    return getPolicyApi(policyId)
      .then((resp) => {
        setpolicyData(resp.data?.Policy);
        settoggle(!toggle);
      })
      .catch((err) => err.message);
  };

  const getPayingAuthority = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/paget/${state?.ReceiptRefNo}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpayauthData(resp.data?.PayingAuthority);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getPayingAuthority();

    return () => {};
  }, [state.ReceiptRefNo]);

  const getCurrency = () => {
    axios
      .get(`http://localhost:3000/api/v1/acservices/cocurrname/${companyId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setcurrencyData(resp.data?.ShortName);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCurrency();

    return () => {};
  }, [state.ReceiptFor]);
  // old currency dropdown

  // const [aCur, setaCur] = useState([]);
  // const getACur = (Acur: string, product: string) => {
  //   return q0005(companyId, languageId, Acur, product)
  //     .then((resp) => {
  //       setaCur(resp.data?.AllowedBillingCurriencies);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  useEffect(() => {
    getCompanyData(companyId);
    getBranch(companyId, "P0018", languageId);
    //getClientData(clientId);
    getTypeOfReceipt(companyId, "P0030", languageId);

    //getPolicyData(policyId);
    // state.DateOfCollection = businessData.Date;
    return () => {};
  }, []);

  const [pRCurrData, setPRCurrData] = useState([]);
  const getRCurr = (companyId: number, policyData: any) => {
    axios
      .get("http://localhost:3000/api/v1/basicservices/paramextradata", {
        withCredentials: true,
        params: {
          company_id: companyId,
          name: "Q0005",
          item: policyData.PProduct,
          function: "BillingCurr",
          date: moment(policyData?.PRCD).format("YYYYMMDD"),
        },
      })
      .then((resp) => {
        setPRCurrData(resp.data?.AllowedBillingCurriencies);
        return resp.data?.AllowedBillingCurriencies;
      })
      .catch((err) => err);
  };

  const p0050 = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    return axios.get(
      `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
      {
        withCredentials: true,
        params: {
          companyId,
          name,
          languageId,
          item,
        },
      }
    );
  };

  const [receiptData, setReceiptData] = useState([]);
  const getReceiptData = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setReceiptData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };
  useEffect(() => {
    getReceiptData(companyId, "P0050", languageId, "ReceiptFor");
    return () => {};
  }, []);

  useEffect(() => {
    getPolicy(parseInt(state.ReceiptRefNo));
    // getPFreq(companyId);
    return () => {};
  }, [state.ReceiptRefNo]);

  useEffect(() => {
    getPolicy(parseInt(record.ReceiptRefNo));
    return () => {};
  }, [state.infoOpen]);

  // old currency dropdown

  useEffect(() => {
    getRCurr(companyId, policyData);
  }, [toggle]);

  const clientsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTSCLOSE });
  };
  const payauthOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ReceiptRefNo = item.ID;
    } else record.ReceiptRefNo = item.ID;
    dispatch({ type: ACTIONS.PAYINGAUTHCLOSE });
  };

  const policiesOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ReceiptRefNo = item.ID;
    } else record.ReceiptRefNo = item.ID;
    dispatch({ type: ACTIONS.POLICIESCLOSE });
  };

  const [policiesByClient, setpoliciesByClient] = useState();

  // const getPolicesByClient1 = (clientId: number) => {
  //   return getPoliciesByClient(clientId).then((resp) => {
  //     setpoliciesByClient(resp.data["All Policies"]);
  //   });
  // };

  const getPolicesByClient1 = (
    pageNum: number,
    pageSize: number,
    searchContent: any
  ) => {
    return getPoliciesByClient(
      parseInt(state.ClientID),
      pageNum,
      pageSize,
      searchContent,
      state
    )
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setpoliciesByClient(resp.data["All Policies"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Policies"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getPolicesByClient1(pageNum, pageSize, searchContent);
    return () => {};
  }, [state.ClientID]);

  const [payingauthByClient, setpayingauthByClient] = useState();

  const getPayingAuthByClient1 = (
    payingauthpageNum: number,
    payingauthpageSize: number,
    searchContent: any
  ) => {
    return getPayingAuthByClient(
      parseInt(state.ClientID),
      payingauthpageNum,
      payingauthpageSize,
      searchContent,
      state
    )
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setpayingauthByClient(resp.data["All PayingAuth"]);
        setpayingauthtotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setpayingauthisLast(resp.data["All PayingAuth"]?.length === 0);
        setpayingauthfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getPayingAuthByClient1(
      payingauthpageNum,
      payingauthpageSize,
      searchContent
    );
    return () => {};
  }, [state.ReceiptRefNo]);

  const [snapShot, setsnapShot] = useState([]);

  const getPolicySnapshot = () => {
    return getPolicySnap(parseInt(state.ReceiptRefNo)).then((resp) => {
      setsnapShot(resp.data.result);
    });
  };

  const [isShown, setisShown] = useState(false);

  const handleHover = () => {
    setisShown(!isShown);
    getPolicySnapshot();
  };

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
          state.clientsOpen
            ? () => dispatch({ type: ACTIONS.CLIENTSCLOSE })
            : state.policiesOpen
            ? () => dispatch({ type: ACTIONS.POLICIESCLOSE })
            : state.payingauthopen
            ? () => dispatch({ type: ACTIONS.PAYINGAUTHCLOSE })
            : state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : // : state.editOpen
              // ? () => dispatch({ type: ACTIONS.EDITCLOSE })
              () => dispatch({ type: ACTIONS.INFOCLOSE })
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
        handleFormSubmit={state.addOpen ? () => handleFormSubmit() : null}
      >
        <form>
          <Grid2 container spacing={2}>
            {state.clientsOpen ? (
              <Client modalFunc={clientsOpenFunc} />
            ) : state.policiesOpen ? (
              <NewBusiness
                receiptLookup={state.policiesOpen}
                modalFunc={policiesOpenFunc}
                getByTable={policiesByClient}
                getByFunction={getPolicesByClient1}
                searchContent={searchContent}
                handleSearchChange={handleSearchChange}
                receiptFieldMap={fieldMap}
              />
            ) : state.payingauthopen ? (
              <PAuth
                payauthLookup={state.payingauthopen}
                modalFunc={payauthOpenFunc}
                getByTable={payingauthByClient}
                getByFunction={getPayingAuthByClient1}
                searchContent={searchContent}
                handleSearchChange={handleSearchChange}
                payauthFieldMap={payingauthfieldMap}
              />
            ) : (
              <>
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
                    select
                    id="Branch"
                    name="Branch"
                    value={state.addOpen ? state.Branch : record.Branch}
                    placeholder="Branch"
                    label="Branch"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Branch",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {branchData.map((val: any) => (
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
                    onClick={() => dispatch({ type: ACTIONS.CLIENTSOPEN })}
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
                <Grid2 xs={12} md={12} lg={4}>
                  <TextField
                    select
                    id="ReceiptFor"
                    name="ReceiptFor"
                    value={state.addOpen ? state.ReceiptFor : record.ReceiptFor}
                    placeholder="Receipt For"
                    label="Receipt For"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ReceiptFor",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {receiptData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                {state.ReceiptFor === "03" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      InputProps={{ readOnly: true }}
                      id="ReceiptRefNo"
                      name="ReceiptRefNo"
                      placeholder="ReceiptRefNo"
                      label="ReceiptRefNo"
                      // Attention: *** Check the value details  ***
                      //onClick={() => dispatch({ type: ACTIONS.CLIENTSOPEN })}
                      value={state.addOpen ? state.ClientID : record.ClientID}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptRefNo",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: true }}
                      margin="dense"
                    />
                  </Grid2>
                ) : state.ReceiptFor === "01" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      // InputProps={{
                      //   readOnly: true,
                      //   endAdornment: (
                      //     <InputAdornment position="start">
                      //       <AccountCircle />
                      //     </InputAdornment>
                      //   ),
                      // }}
                      id="ReceiptRefNo"
                      name="ReceiptRefNo"
                      placeholder="ReceiptRefNo"
                      label="ReceiptRefNo"
                      // Attention: *** Check the value details  ***
                      onClick={() => dispatch({ type: ACTIONS.POLICIESOPEN })}
                      value={
                        state.addOpen ? state.ReceiptRefNo : record.ReceiptRefNo
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptRefNo",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />

                    {isShown && state.ReceiptRefNo ? (
                      <HoverDetails data={snapShot} />
                    ) : null}
                  </Grid2>
                ) : state.ReceiptFor === "02" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      id="ReceiptRefNo"
                      name="ReceiptRefNo"
                      onClick={() => dispatch({ type: ACTIONS.PAYINGAUTHOPEN })}
                      value={
                        state.addOpen ? state.ReceiptRefNo : record.ReceiptRefNo
                      }
                      placeholder="ReceiptRefNo"
                      label="ReceiptRefNo"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptRefNo",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                ) : (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      type="number"
                      id="ReceiptRefNo"
                      name="ReceiptRefNo"
                      onMouseEnter={() => handleHover()}
                      onMouseOut={() => setisShown(false)}
                      value={
                        state.addOpen ? state.ReceiptRefNo : record.ReceiptRefNo
                      }
                      placeholder="ReceiptRefNo"
                      label="ReceiptRefNo"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptRefNo",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: true }}
                      margin="dense"
                    />
                  </Grid2>
                )}
                {state.ReceiptFor === "01" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      select
                      id="ReceiptCurry"
                      name="ReceiptCurry"
                      value={
                        state.addOpen ? state.ReceiptCurry : record.ReceiptCurry
                      }
                      placeholder="Receipt.Currency"
                      label="Receipt.Currency"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptCurry",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    >
                      {pRCurrData.map((val: any) => (
                        <MenuItem key={val.Item} value={val.Item}>
                          {val.Item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                ) : state.ReceiptFor === "02" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      //select
                      id="ReceiptCurry"
                      name="ReceiptCurry"
                      value={
                        state.addOpen
                          ? payauthData.PaCurrency
                          : record.ReceiptCurry
                      }
                      placeholder="Receipt.Currency"
                      label="Receipt.Currency"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptCurry",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    >
                      {pRCurrData.map((val: any) => (
                        <MenuItem key={val.Item} value={val.Item}>
                          {val.Item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                ) : state.ReceiptFor === "03" ? (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      //select
                      id="ReceiptCurry"
                      name="ReceiptCurry"
                      value={state.addOpen ? currencyData : record.ReceiptCurry}
                      placeholder="Receipt.Currency"
                      label="Receipt.Currency"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptCurry",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: true }}
                      margin="dense"
                    >
                      {/* {pRCurrData.map((val: any) => (
                        <MenuItem key={val.Item} value={val.Item}>
                          {val.Item}
                        </MenuItem>
                      ))} */}
                    </TextField>
                  </Grid2>
                ) : (
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      select
                      id="ReceiptCurry"
                      name="ReceiptCurry"
                      value={
                        state.addOpen ? state.ReceiptCurry : record.ReceiptCurry
                      }
                      placeholder="Receipt.Currency"
                      label="Receipt.Currency"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "ReceiptCurry",
                        })
                      }
                      fullWidth
                      inputProps={{ readOnly: true }}
                      margin="dense"
                    />
                  </Grid2>
                )}
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    id="ReceiptAmount"
                    name="ReceiptAmount"
                    onMouseEnter={() => handleHover()}
                    onMouseOut={() => setisShown(false)}
                    value={
                      state.addOpen ? state.ReceiptAmount : record.ReceiptAmount
                    }
                    placeholder="Receipt Amount"
                    label="Receipt Amount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ReceiptAmount",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    //select
                    id="AccCurry"
                    name="AccCurry"
                    value={
                      state.addOpen
                        ? payauthData.PaCurrency ||
                          state.AccCurry ||
                          currencyData
                        : record.AccCurry
                    }
                    placeholder="Acc.Currency"
                    label="Acc.Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AccCurry",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  >
                    {pRCurrData.map((val: any) => (
                      <MenuItem key={val.Item} value={val.Item}>
                        {val.Item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    id="AccAmount"
                    name="AccAmount"
                    onMouseEnter={() => handleHover()}
                    onMouseOut={() => setisShown(false)}
                    value={
                      state.addOpen ? state.ReceiptAmount : record.AccAmount
                    }
                    placeholder="Accounting Amount"
                    label="Accounting Amount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AccAmount",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Receipt DueDate"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.ReceiptDueDate
                            : record.ReceiptDueDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "ReceiptDueDate",
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
                        label="Date Of Collection"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.DateOfCollection
                            : record.DateOfCollection
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "DateOfCollection",
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
                    id="TypeOfReceipt"
                    name="TypeOfReceipt"
                    value={
                      state.addOpen ? state.TypeOfReceipt : record.TypeOfReceipt
                    }
                    placeholder="Type of Receipt"
                    label="Type of Receipt"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "TypeOfReceipt",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {typeOfReceiptData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="BankReferenceNo"
                    name="BankReferenceNo"
                    value={
                      state.addOpen
                        ? state.BankReferenceNo
                        : record.BankReferenceNo
                    }
                    placeholder="Bank Ref. Number"
                    label="Bank Ref. Number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankReferenceNo",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="BankAccountNo"
                    name="BankAccountNo"
                    value={
                      state.addOpen ? state.BankAccountNo : record.BankAccountNo
                    }
                    placeholder="Bank Account Number"
                    label="Bank Account Number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankAccountNo",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="BankIFSC"
                    name="BankIFSC"
                    value={state.addOpen ? state.BankIFSC : record.BankIFSC}
                    placeholder="Bank IFSC"
                    label="Bank IFSC"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankIFSC",
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
export default ReceiptsModal;
