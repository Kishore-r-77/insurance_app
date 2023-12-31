import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { FormControl, MenuItem, Tabs, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { PolicyModalType } from "../../../reducerUtilities/types/policy/policyTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFullModal from "../../../utilities/modal/CustomFullModal";
import CustomModal from "../../../utilities/modal/CustomModal";
import Address from "../../clientDetails/address/Address";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import Agency from "../../agency/Agency";
import Client from "../../clientDetails/client/Client";
import {
  frequency,
  p0018,
  p0023,
  p0024,
  q0005,
} from "../newBusinessApis/newBusinessApis";
import "./policyModal.css";

function NewBusinessEnquiry({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: PolicyModalType) {
  const addTitle: string = "Proposal Create";
  const editTitle: string = "Proposal Edit";
  const infoTitle: string = "Proposal Info";
  const size: string = "xl";

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
      })
      .catch((err) => console.log(err.message));
  };

  const [clietData, setclietData] = useState([]);
  const getClientByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/beneficiaries/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setclietData(resp.data["AllowedCoverages"]);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCoverage();
    getClientByPolicy();
    return () => {};
  }, []);

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
          ClientID: benefitData[index].ClientID,
          BStartDate: moment(benefitData[index]?.BStartDate)
            .format("YYYYMMDD")
            .toString(),
          BTerm: benefitData[index]?.BTerm,
          BPTerm: benefitData[index]?.BPTerm,
          BCoverage: benefitData[index]?.BCoverage,
          BSumAssured: benefitData[index]?.BSumAssured,
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

  const policyAndModalAddSubmit = async () => {
    const response = await handleFormSubmit();
    if (response.status === 200) {
      for (let i = 0; i < coverage.length; i++) {
        handleBenefitFormSubmit(i, response.response.data.Created);
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

  return (
    <div>
      <CustomFullModal
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
        handleFormSubmit={() => policyAndModalAddSubmit()}
      >
        <form>
          <TreeView
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
                <Address modalFunc={addressOpenFunc} />
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
            <TreeItem nodeId="1" label="Policy Form">
              <Grid2
                container
                spacing={2}
                style={{ width: "95%", margin: "10px auto" }}
              >
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
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
                        readOnly={state.infoOpen}
                        label="Proposal Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.PRCD : record.PRCD}
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
                    value={state.addOpen ? state.PProduct : record.PProduct}
                    placeholder="Product"
                    label="Product"
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
                    select
                    id="PFreq"
                    name="PFreq"
                    value={state.addOpen ? state.PFreq : record.PFreq}
                    placeholder="Frequency"
                    label="Frequency"
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
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {freq.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    select
                    id="PContractCurr"
                    name="PContractCurr"
                    value={
                      state.addOpen ? state.PContractCurr : record.PContractCurr
                    }
                    placeholder="Contract Currency"
                    label="Contract Currency"
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
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {cCurData.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    select
                    id="PBillCurr"
                    name="PBillCurr"
                    value={state.addOpen ? state.PBillCurr : record.PBillCurr}
                    placeholder="Bill Currency"
                    label="Bill Currency"
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
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {bCurData.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    select
                    id="POffice"
                    name="POffice"
                    value={state.addOpen ? state.POffice : record.POffice}
                    placeholder="Office"
                    label="Office"
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
                    value={state.addOpen ? state.PolStatus : record.PolStatus}
                    placeholder="Policy Status"
                    label="Policy Status"
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
                        readOnly={state.infoOpen}
                        label="Received Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.PReceivedDate
                            : record.PReceivedDate
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
                        label="Next Bill To Date"
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
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    id="ClientID"
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    placeholder="Owner Id"
                    label="Owner Id"
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
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.ADDRESSOPEN })}
                    id="AddressID"
                    name="AddressID"
                    value={state.addOpen ? state.AddressID : record.AddressID}
                    placeholder="Address Id"
                    label="Address Id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AddressID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    onClick={() => dispatch({ type: ACTIONS.AGENCYOPEN })}
                    id="AgencyID"
                    name="AgencyID"
                    value={state.addOpen ? state.AgencyID : record.AgencyID}
                    placeholder="Agency Id"
                    label="Agency Id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "AgencyID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>
            <Tabs>Client</Tabs>

            {/* <Button
              style={{
                marginTop: "1rem",
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "40px",
                backgroundColor: "#0a3161",
              }}
              variant="contained"
              color="primary"
              onClick={() => dispatch({ type: ACTIONS.ADDOPEN })}
            >
              Client
            </Button> */}
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default NewBusinessEnquiry;
