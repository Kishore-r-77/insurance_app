//Attention: Check the path below and change it if required
import { PolicyValidateStateType } from "../../types/validatepolicy/policyValidateTypes";
//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  POLICYCLOSE: "POLICYCLOSE",
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  // *** Attention: Check the Lookup Open /close ***
  BENEFITSOPEN: "BENEFITSOPEN",
  BENEFITSCLOSE: "BENEFITSCLOSE",
};

//Initial State defined

export const initialValues: PolicyValidateStateType = {
  PolicyID: "",
  CompanyID: "",
  Coverage: "",
  Premium: "",
  GST: "",
  StampDuty: "",
  CumulativePrem: "",
  PolicyDeposit: "",
  BPrem: "",
  CovrGst: "",
  CovrStampduty: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  benefitsOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  {
    field: "PolicyID",
    header: "Policy Number",
    dbField: "policy_id",
  },
  {
    field: "Coverage",
    header: "Coverage",
    dbField: "coverage ",
  },
  {
    field: "Premium",
    header: "Premium ",
    dbField: "b_prem",
  },
  {
    field: "GST",
    header: "GST",
    dbField: "covr_gst",
  },
  {
    field: "StampDuty",
    header: "StampDuty",
    dbField: "covr_stampduty",
  },
];
