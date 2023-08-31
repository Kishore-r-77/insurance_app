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
  EMillie:"",
  EEmr:"",
  FromDate: "",
  ToDate: "",
  ReasonDescription: "",
  RequestedDate: "",
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

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  // { field: "CompanyID", header: "Company ID", dbField: "company_id" },
  {
    field: "PolicyID",
    header: "Policy Id",
    dbField: "policy_id",
  },

  {
    field: "EReason",
    header: "EReason",
    dbField: "e_reason",
  },
  {
    field: "EMethod",
    header: "EMethod",
    dbField: "e_method",
  },
  {
    field: "EPrem",
    header: "EPrem",
    dbField: "e_prem",
  },
  {
    field: "EPercentage",
    header: "EPercentage",
    dbField: "e_percentage",
  },
  {
    field: "EAmt",
    header: "EAmt",
    dbField: "e_amt",
  },
  {
    field: "ETerm",
    header: "ETerm",
    dbField: "e_term",
  },
  {
    field: "EAge",
    header: "EAge",
    dbField: "e_age",
  },
  {
    field: "EMillie",
    header: "EMillie",
    dbField: "e_millie",
  },
  {
    field: "EEmr",
    header: "EEmr",
    dbField: "e_emr",
  },
  {
    field: "FromDate",
    header: "FromDate",
    dbField: "from_date",
    type: "date",
  },
  {
    field: "ToDate",
    header: "ToDate",
    dbField: "to_date",
    type: "date",
  },
];
