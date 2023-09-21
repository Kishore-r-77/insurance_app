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
import styles from "./paymentsModal.module.css";
//Attention: Check the path below
import { PaymentsModalType } from "../../../reducerUtilities/types/payments/paymentsTypes";
import { q0005, paramItem } from "../paymentsApis/paymentsApis";
import Client from "../../clientDetails/client/Client";
import Policy from "../../policy/Policy";
import Address from "../../clientDetails/address/Address";
import {
  getPoliciesByClient,
  getPolicyApi,
} from "../../policy/policyApis/policyApis";
import { AccountCircle } from "@mui/icons-material";
import HoverDetails from "../../../utilities/HoverDetails/HoverDetails";
import axios from "axios";
import useHttp from "../../../hooks/use-http";
import { getData } from "../../../services/http-service";
import ApprovalFullModal from "./approvalFullModal";

function PaymentsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  searchContent,
  handleSearchChange,
}: PaymentsModalType) {
  const addTitle: string = "Payments Add";
  const editTitle: string = "Payments Edit";
  const infoTitle: string = "Payments Info";
  const size: string = "xl";

  //Creating useReducer Hook

  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const id = useAppSelector((state) => state.users.user.message.id);

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const {
    sendRequest: sendPaymentRequest,
    status: getPaymentResponseStatus,
    data: getPaymentResponse,
    error: getPaymentResponseError,
  } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "PaymentAccount";
    sendPaymentRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });
  }, []);

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

  const [aCur, setaCur] = useState([]);
  const getACur = (Acur: string, product: string) => {
    return q0005(companyId, languageId, Acur, product)
      .then((resp) => {
        setaCur(resp.data?.AllowedBillingCurriencies);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCompanyData(companyId);
    getBranch(companyId, "P0018", languageId);
    //getClientData(clientId);
    getTypeOfReceipt(companyId, "P0030", languageId);

    //getPolicyData(policyId);

    return () => {};
  }, []);

  useEffect(() => {
    getPolicy(parseInt(state.PolicyID));
    return () => {};
  }, [state.PolicyID]);

  useEffect(() => {
    getPolicy(parseInt(record.PolicyID));
    return () => {};
  }, [state.infoOpen]);
  useEffect(() => {
    getACur("BillingCurr", policyData?.PProduct);
  }, [toggle]);
  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const clientsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTSCLOSE });
  };

  const policiesOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PolicyID = item.ID;
    } else record.PolicyID = item.ID;
    dispatch({ type: ACTIONS.POLICIESCLOSE });
  };

  const addressOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.AddressID = item.ID;
    } else record.AddressID = item.ID;
    dispatch({ type: ACTIONS.ADDRESSCLOSE });
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

  // const [snapShot, setsnapShot] = useState([]);
  // const getPolicySnapshot = () => {
  //   return getPolicySnap(parseInt(state.PolicyID)).then((resp) => {
  //     setsnapShot(resp.data.result);
  //   });
  // };

  const [isShown, setisShown] = useState(false);

  const handleHover = () => {
    setisShown(!isShown);
    //getPolicySnapshot();
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

  useEffect(() => {
    getAddressByClient();

    return () => {};
  }, [state.ClientID]);

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
            : state.addressOpen
            ? () => dispatch({ type: ACTIONS.ADDRESSCLOSE })
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
              <Policy
                receiptLookup={state.policiesOpen}
                modalFunc={policiesOpenFunc}
                getByTable={policiesByClient}
                getByFunction={getPolicesByClient1}
                searchContent={searchContent}
                handleSearchChange={handleSearchChange}
                receiptFieldMap={fieldMap}
              />
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
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Date Of Payment"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.DateOfPayment
                            : record.DateOfPayment
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "DateOfPayment",
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
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    inputProps={{ readOnly: state.infoOpen }}
                    id="AddressID"
                    onClick={() => dispatch({ type: ACTIONS.ADDRESSOPEN })}
                    name="AddressID"
                    // Attention: *** Check the value details  ***
                    value={state.addOpen ? state.AddressID : record.AddressID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    placeholder="AddressID"
                    label="AddressID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
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
                    id="PolicyID"
                    name="PolicyID"
                    placeholder="Policy Number"
                    label="Policy Number"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.POLICIESOPEN })}
                    value={state.addOpen ? state.PolicyID : record.PolicyID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PolicyID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />

                  {/* {isShown && state.PolicyID ? (
                     <HoverDetails data={snapShot} />
                   ) : null} */}
                </Grid2>
                {/* <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="AddressID"
                    name="AddressID"
                    placeholder="Address ID"
                    label="Address ID"
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
                </Grid2> */}
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="AccCurry"
                    name="AccCurry"
                    value={state.addOpen ? state.AccCurry : record.AccCurry}
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
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {aCur.map((val: string) => (
                      <MenuItem key={val} value={val}>
                        {val}
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
                    value={state.addOpen ? state.AccAmount : record.AccAmount}
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
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PaymentAccount"
                    name="PaymentAccount"
                    value={
                      state.addOpen
                        ? state.PaymentAccount
                        : record.PaymentAccount
                    }
                    placeholder="PaymentAccount"
                    label="PaymentAccount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PaymentAccount",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {getPaymentResponse?.param.data.dataPairs.map(
                      (value: any) => (
                        <MenuItem key={value.code} value={value.code}>
                          {value.description}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Reconciled Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.ReconciledDate
                            : record?.ReconciledDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "ReconciledDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
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
                    select
                    id="TypeOfPayment"
                    name="TypeOfPayment"
                    value={
                      state.addOpen ? state.TypeOfPayment : record.TypeOfPayment
                    }
                    placeholder="Type of Payment"
                    label="Type of Payment"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "TypeOfPayment",
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
                    id="InsurerBankIFSC"
                    name="InsurerBankIFSC"
                    value={
                      state.addOpen
                        ? state.InsurerBankIFSC
                        : record.InsurerBankIFSC
                    }
                    placeholder="InsurerBankIFSC"
                    label="InsurerBankIFSC"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "InsurerBankIFSC",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="InsurerBankAccNo"
                    name="InsurerBankAccNo"
                    value={
                      state.addOpen
                        ? state.InsurerBankAccNo
                        : record.InsurerBankAccNo
                    }
                    placeholder="InsurerBankAccNo"
                    label="InsurerBankAccNo"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "InsurerBankAccNo",
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
                    id="MakerUserID"
                    name="MakerUserID"
                    value={state.addOpen ? id : record.MakerUserID}
                    placeholder="MakerUserID"
                    label="MakerUserID"
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                {/* <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Status"
                    name="Status"
                    value={state.addOpen ? state.Status : record.Status}
                    placeholder="Status"
                    label="Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Status",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2> */}
              </>
            )}
            {state.infoOpen ? (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="CheckerUserID"
                  name="CheckerUserID"
                  value={record.CheckerUserID}
                  placeholder="CheckerUserID"
                  label="CheckerUserID"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "CheckerUserID",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
            ) : null}
            {state.infoOpen ? (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Reason"
                  name="Reason"
                  value={record?.Reason}
                  placeholder="Reason"
                  label="Reason"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "Reason",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
            ) : null}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default PaymentsModal;
