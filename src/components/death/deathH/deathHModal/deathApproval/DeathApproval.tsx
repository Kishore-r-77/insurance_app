import axios from "axios";

import BenefitEnquiry from "../enquiry/BenefitEnquiry";

import DeathDEnquiry from "../enquiry/DeathDEnquiry";
import DeathHeaderEnquiry from "../enquiry/DeathHeaderEnquiry";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { TextField } from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useAppSelector } from "../../../../../redux/app/hooks";
import { getApi } from "../../../../admin/companies/companiesApis/companiesApis";
import {
  frequency,
  p0018,
  p0023,
  p0024,
  q0005,
} from "../../deathHApis/deathHApis";
import DeathApprovalFullModal from "./DeathApprovalFullModal";

function DeathApproval({
  open,
  handleClose,
  id,
  policyId,
  getData,
  setNotify,
}: any) {
  const title = "Death Approval";
  const size = "xl";

  const deathApprovalSubmit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/approvedeath/${id}`,
        {
          //   CompanyID: companyId,
          // policyId,
          // ReasonDescription: reasonDescription,
          // RequestedDate: moment(requestedDate).format("YYYYMMDD").toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        
        handleClose();
        setNotify({
          isOpen: true,
          message: `Death has been Approved Succesfully`,
          type: "success",
        });
        getData();
      })
      .catch((err) => console.log(err));
  };

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

  const [policy, setpolicy] = useState<any>({});
  const [benefits, setBenefits] = useState([]);
  const [deathHs, setDeathHs] = useState([]);
  const [deathDs, setDeathDs] = useState([]);

  const getdeathenquiry = () => {
    axios
      .get(`http://localhost:3000/api/v1/deathservices/enqdeath/${policyId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setpolicy(resp.data.Policy);
        console.log("Policy", policy);
        setBenefits(resp.data.Policy.Benefits);
        console.log("Benefits", benefits);
        setDeathHs(resp.data.Policy.DeathHs);
        setDeathDs(resp.data.Policy.DeathDs);
      })
      .catch((err) => console.log(err.message));
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
  }, [open]);

  return (
    <div>
      <DeathApprovalFullModal
        title={title}
        size={size}
        open={open}
        handleClose={handleClose}
        handleFormSubmit={deathApprovalSubmit}
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
              label={`Enquiry for Death Header Number-${policy.ID}`}
            >
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
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="PRCD"
                    name="PRCD"
                    value={moment(policy.PRCD).format("YYYY-MM-DD")}
                    placeholder="PRCD"
                    label="PRCD"
                    fullWidth
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  ></TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    id="PProduct"
                    name="PProduct"
                    value={policy.PProduct}
                    placeholder="Product"
                    label="Product"
                    fullWidth
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
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
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  ></TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="PReceivedDate"
                    name="PReceivedDate"
                    value={moment(policy.PReceivedDate).format("YYYY-MM-DD")}
                    placeholder="Received Date"
                    label="Received Date"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    name="ClientID"
                    value={policy.ClientID}
                    placeholder="Owner Id"
                    label="Owner Id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="AddressID"
                    name="AddressID"
                    value={policy.AddressID}
                    placeholder="Address Id"
                    label="Address Id"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={3}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="AgencyID"
                    name="AgencyID"
                    value={policy.AgencyID}
                    placeholder="Agency Id"
                    label="Agency Id"
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
                <BenefitEnquiry benefitenquiryData={benefits} />
              </Tab>

              <Tab
                eventKey="Death Header"
                title="Death Header"
                style={{ backgroundColor: "white" }}
              >
                <DeathHeaderEnquiry deathHenquiry={deathHs} />
              </Tab>

              <Tab
                eventKey="Death D"
                title="Death D"
                style={{ backgroundColor: "white" }}
              >
                <DeathDEnquiry deathDenquiry={deathDs} />
              </Tab>
            </Tabs>
          </TreeView>
        </form>
      </DeathApprovalFullModal>
    </div>
  );
}

export default DeathApproval;
