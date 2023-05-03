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
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import "./policyModal.css";

//Attention: Check the path below
//import { PoliciesModalType } from "../../../../reducerUtilities/types/policies/policiesTypes";
import axios from "axios";
import CustomModal from "../../../utilities/modal/CustomModal";
import Agency from "../../agency/Agency";
import Address from "../../clientDetails/address/Address";
import Client from "../../clientDetails/client/Client";
import {
  extraParamItem,
  paramItem,
} from "../../clientDetails/client/clientApis/clientApis";
import { createPoliciesWithBenefits } from "../policyApis/policyApis";

function PolicyModal({
  state,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  record,
  notify,
  setNotify,
  getData,
  validatePolicy,
}: any) {
  const title = "Policies Add";
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
        setPProductData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [pFreqData, setPFreqData] = useState([]);
  const getPFreq = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setPFreqData(resp.data.data);
        return resp.data.data;
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

  useEffect(() => {
    getCompanyData(companyId);
    getPProduct(companyId, "Q0005", languageId);
    getPFreq(companyId, "Q0009", languageId);
    getPContractCurr(companyId, "P0023", languageId);
    getPBillCurr(companyId, "P0023", languageId);
    getPOffice(companyId, "P0018", languageId);
    getPolStatus(companyId, "P0024", languageId);

    return () => {};
  }, []);

  useEffect(() => {
    getBCoverage(companyId, "Q0011", state.PProduct, "20220101");
    return () => {};
  }, [state.PProduct]);

  const [benefitsData, setbenefitsData] = useState([
    {
      ClientID: 0,
      BStartDate: "",
      BTerm: 0,
      BpTerm: 0,
      BCoverage: "",
      BSumAssured: 0,
    },
  ]);

  const handleBenefitsAdd = () => {
    setbenefitsData([
      ...benefitsData,
      {
        ClientID: 0,
        BStartDate: "",
        BTerm: 0,
        BpTerm: 0,
        BCoverage: "",
        BSumAssured: 0,
      },
    ]);
  };

  const handleBenefitsRemove = (index: number) => {
    const list = [...benefitsData];
    list.splice(index, 1);
    setbenefitsData(list);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setbenefitsData(
      benefitsData.map((benefits, index) => {
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
        setNotify({
          isOpen: true,
          message: err.message,
          type: "error",
        });
      });
  };

  const handleBStartDate = (date: any, i: number) => {
    setbenefitsData(
      benefitsData.map((benefits, index) => {
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

  useEffect(() => {
    getAddressByClient();
    return () => {};
  }, [state.ClientID]);

  return (
    <div>
      <CustomFullModal
        open={state.addOpen}
        handleFormSubmit={addPoliciesWithBenefits}
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
            ) : null}
            <TreeItem nodeId="1" label={`Policies Add`}>
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
                    value={state.ClientID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
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
                    value={state.AddressID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
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
                    value={state.AgencyID}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
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
                        value={state.PRCD}
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
                    select
                    id="PProduct"
                    name="PProduct"
                    value={state.PProduct}
                    placeholder="p_product"
                    label="p_product"
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
                    {pProductData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PFreq"
                    name="PFreq"
                    value={state.PFreq}
                    placeholder="p_freq"
                    label="p_freq"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "PFreq",
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    {pFreqData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PContractCurr"
                    name="PContractCurr"
                    value={state.PContractCurr}
                    placeholder="p_contract_curr"
                    label="p_contract_curr"
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
                    value={state.PBillCurr}
                    placeholder="p_bill_curr"
                    label="p_bill_curr"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
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
                    value={state.POffice}
                    placeholder="p_office"
                    label="p_office"
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
                    value={state.PolStatus}
                    placeholder="pol_status"
                    label="pol_status"
                    inputProps={{ readOnly: true }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
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
                        value={state.PReceivedDate}
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
                        readOnly={state.infoOpen}
                        label="puw_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.PUWDate}
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
                        readOnly
                        label="bt_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.BtDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "BtDate",
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
                        readOnly
                        label="paid_to_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.PaidToDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "PaidToDate",
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
                        readOnly
                        label="nxt_bt_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.NxtBtDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "NxtBtDate",
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
                        readOnly
                        label="anniv_date"
                        inputFormat="DD/MM/YYYY"
                        value={state.AnnivDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: ACTIONS.ONCHANGE,
                            payload: date.$d,
                            fieldName: "AnnivDate",
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
                    inputProps={{ readOnly: true }}
                    id="InstalmentPrem"
                    name="InstalmentPrem"
                    value={state.InstalmentPrem}
                    placeholder="instalment_prem"
                    label="instalment_prem"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "InstalmentPrem",
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>
            {benefitsData.map((benefits, index) => (
              <>
                <div style={{ display: "flex" }}>
                  <TreeItem
                    nodeId={(index + 2).toString()}
                    label={`Benefits Add`}
                    style={{ minWidth: "95%", margin: "0px 1rem" }}
                  >
                    <Grid2 container spacing={2}>
                      <Grid2 xs={8} md={6} lg={4}>
                        <TextField
                          InputProps={{ readOnly: true }}
                          id="ClientID"
                          name="ClientID"
                          // Attention: *** Check the value details  ***
                          value={state.ClientID}
                          placeholder="client_id"
                          label="client_id"
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>

                      <Grid2 xs={8} md={6} lg={4}>
                        <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="b_start_date"
                              inputFormat="DD/MM/YYYY"
                              value={benefits.BStartDate}
                              onChange={(date) => handleBStartDate(date, index)}
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
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
                          id="BpTerm"
                          name="BpTerm"
                          value={benefits.BpTerm}
                          placeholder="bp_term"
                          label="bp_term"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
                          fullWidth
                          margin="dense"
                        />
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, index)
                          }
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
                          id="CompanyID"
                          name="CompanyID"
                          value={companyData?.CompanyName}
                          placeholder="company_id"
                          label="company_id"
                          fullWidth
                          margin="dense"
                        />
                      </Grid2>
                    </Grid2>
                  </TreeItem>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "5px",
                    }}
                  >
                    {benefitsData.length - 1 === index &&
                      benefitsData.length < 5 && (
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

                    {benefitsData.length !== 1 && (
                      <Button
                        onClick={() => handleBenefitsRemove(index)}
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
            ))}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default PolicyModal;
