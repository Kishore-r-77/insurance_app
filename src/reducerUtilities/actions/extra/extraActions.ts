//Attention: Check the path below and change it if required
import { ExtraStateType } from "../../types/extra/extraTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
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
  POLICYOPEN: "POLICYOPEN",
  POLICYCLOSE: "POLICYCLOSE",
  BENEFITOPEN: "BENEFITOPEN",
  BENEFITCLOSE: "BENEFITCLOSE",
};

//Initial State defined

export const initialValues: ExtraStateType = {
  CompanyID: "",
  PolicyID: "",
  BCoverage: "",
  BenefitID: "",
  EReason: "",
  EMethod: "",
  EPrem: "",
  EPercentage: "",
  EAmt: "",
  ETerm: "",
  EAge: "",
  FromDate: "",
  ToDate: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  policyOpen: false,
  benefitOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [];
