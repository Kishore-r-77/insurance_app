
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
  BENEFITSOPEN:  "BENEFITSOPEN",
  BENEFITSCLOSE: "BENEFITSCLOSE",
  };

  //Initial State defined



export const initialValues: PolicyValidateStateType = {
  "1.Company ID" :"",
  "2.PolicyID" :"",
  "3.Coverage"  :"",
  "4.Premium" :"",
  "5.GST" :"",
  "6.StampDuty" :"",
// *** Attention: Check the lookup table open below ***
  benefitsOpen: false,
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  };

  //Columns Defined to Pass into the Custom Table



export const columns = [ 
  {
    field: "2.PolicyID",
    header: "Policy Number",
    dbField: "policy_id",
  },
  {
    field: "3.Coverage",
    header: "Coverage",
    dbField: "coverage ",
  },
  {
    field: "4.Premium",
    header: "Premium ",
    dbField: "b_prem",
  },
  {
    field: "5.GST",
    header: "GST",
    dbField: "covr_gst",
  },
  {
    field: "6.StampDuty",
    header: "Stamp Duty",
    dbField: "covr_stampduty",
  },
  ];
