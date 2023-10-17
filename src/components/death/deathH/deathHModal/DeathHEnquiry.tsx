import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { DeathHModalType } from "../../../../reducerUtilities/types/death/deathH/deathHTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomFullModal from "../../../../utilities/modal/CustomFullModal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import {
  frequency,
  p0018,
  p0023,
  p0024,
  q0005,
} from "../deathHApis/deathHApis";
// import AddressEnquiry from "./enquiry/AddressEnquiry";
// import BALEnquiry from "./enquiry/BALEnquiry";
// import BankEnquiry from "./enquiry/BankEnquiry";
// import BenefitEnquiry from "./enquiry/BenefitEnquiry";
// import ClientEnquiry from "./enquiry/ClientEnquiry";
// import CommunicationEnquiry from "./enquiry/CommunicationEnquiry";
// import ExtraEnquiry from "./enquiry/ExtraEnquiry";
// import HistoryEnquiry from "./enquiry/HistoryEnquiry";
// import SurvivalBenefitEnquiry from "./enquiry/SurvivalBenefitEnquiry";
// import TDFEnquiry from "./enquiry/TDFEnquiry";
// import UWEnquiry from "./enquiry/UWEnquiry";
import "./deathHModal.css";
import BenefitEnquiry from "./enquiry/BenefitEnquiry";
import Policy from "../../../policy/Policy";
import DeathHeaderEnquiry from "./enquiry/DeathHeaderEnquiry";
import DeathDEnquiry from "./enquiry/DeathDEnquiry";

function DeathHEnquiry({ state, record, dispatch, ACTIONS }: DeathHModalType) {
  const infoTitle: string = "Death Enquiry Info";
  const size: string = "xl";

  console.log("Records", record);
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
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };
  const [freq, setfreq] = useState([]);

  const getFreq = () => {
    return frequency(companyId, languageId)
      .then((resp) => {
        setfreq(resp.data.AllowedFrequencies);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };
  const [p0018Data, setp0018Data] = useState([]);

  const getQ0018 = () => {
    return p0018(companyId, languageId)
      .then((resp) => {
        setp0018Data(resp.data.data);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };
  const [cCurData, setcCurData] = useState([]);
  const [bCurData, setbCurData] = useState([]);

  const getQ0023Ccur = (Ccur: string) => {
    return p0023(companyId, languageId, Ccur)
      .then((resp) => {
        setcCurData(resp.data.AllowedContractCurriencies);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };
  const getQ0023Bcur = (Bcur: string) => {
    return p0023(companyId, languageId, Bcur)
      .then((resp) => {
        setbCurData(resp.data.AllowedBillingCurriencies);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };

  const [p0024Data, setp0024Data] = useState([]);

  const getQ0024 = () => {
    return p0024(companyId, languageId)
      .then((resp) => {
        setp0024Data(resp.data.data);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
  };

  const [policy, setpolicy] = useState<any>({});
  const [benefits, setBenefits] = useState([]);
  const [deathHs, setDeathHs] = useState([]);
  const [deathDs, setDeathDs] = useState([]);

  const getdeathenquiry = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/enqdeath/${record.PolicyID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpolicy(resp.data.Policy);
        console.log("Policy", policy);
        setBenefits(resp.data.Policy.Benefits);
        console.log("Benefits", benefits);
        setDeathHs(resp.data.Policy.DeathHs);
        setDeathDs(resp.data.Policy.DeathDs);
      })
      .catch((err) => setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        }));
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
    getdeathenquiry();
    return () => {};
  }, [state.infoOpen]);

  return (
    <div>
      <CustomFullModal
        open={state.infoOpen}
        size={size}
        handleClose={() => dispatch({ type: ACTIONS.INFOCLOSE })}
        title={infoTitle}
        ACTIONS={ACTIONS}
      >
        <form>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1"]}
          >
            <TreeItem
              nodeId="1"
              label={`Enquiry for Death Header Number-${record.PolicyID}`}
            >
              <Grid2
                container
                spacing={2}
                style={{ width: "95%", margin: "10px auto" }}
              >
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: state.infoOpen }}
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
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="Proposal Date"
                        inputFormat="DD/MM/YYYY"
                        value={policy.PRCD}
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
                    id="PProduct"
                    name="PProduct"
                    value={policy.PProduct}
                    placeholder="Product"
                    label="Product"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="PFreq"
                    name="PFreq"
                    value={policy.PFreq}
                    placeholder="Frequency"
                    label="Frequency"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="PContractCurr"
                    name="PContractCurr"
                    value={policy.PContractCurr}
                    placeholder="Contract Currency"
                    label="Contract Currency"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="PBillCurr"
                    name="PBillCurr"
                    value={policy.PBillCurr}
                    placeholder="Bill Currency"
                    label="Bill Currency"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="POffice"
                    name="POffice"
                    value={policy.POffice}
                    placeholder="Office"
                    label="Office"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    disabled
                    id="PolStatus"
                    name="PolStatus"
                    value={policy.PolStatus}
                    placeholder="Policy Status"
                    label="Policy Status"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly
                        label="Received Date"
                        inputFormat="DD/MM/YYYY"
                        value={policy.PReceivedDate}
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
                  <TextField
                    InputProps={{ readOnly: state.infoOpen }}
                    id="ClientID"
                    name="ClientID"
                    value={policy.ClientID}
                    placeholder="Owner Id"
                    label="Owner Id"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: state.infoOpen }}
                    id="AddressID"
                    name="AddressID"
                    value={policy.AddressID}
                    placeholder="Address Id"
                    label="Address Id"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: state.infoOpen }}
                    id="AgencyID"
                    name="AgencyID"
                    value={policy.AgencyID}
                    placeholder="Agency Id"
                    label="Agency Id"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: state.infoOpen }}
                    id="BillingType"
                    name="BillingType"
                    value={policy.BillingType}
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
                    value={policy.BankID}
                    placeholder="Bank ID"
                    label="Bank ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>

            <Tabs
              defaultActiveKey="Benefit"
              id="justify-tab-example"
              className="mb-3"
              justify
              style={{ width: "95%", margin: "10px auto" }}
            >
              <Tab
                eventKey="Benefit"
                title="Benefit"
                style={{ backgroundColor: "white" }}
              >
                <BenefitEnquiry benefitenquiryData={benefits} state={state} />
              </Tab>

              <Tab
                eventKey="Death Header"
                title="Death Header"
                style={{ backgroundColor: "white" }}
              >
                <DeathHeaderEnquiry deathHenquiry={deathHs} state={state} />
              </Tab>

              <Tab
                eventKey="Death D"
                title="Death D"
                style={{ backgroundColor: "white" }}
              >
                <DeathDEnquiry deathDenquiry={deathDs} state={state} />
              </Tab>
            </Tabs>
          </TreeView>
        </form>
      </CustomFullModal>
    </div>
  );
}

export default DeathHEnquiry;
