import { BenefitStateType } from "../../types/benefit/benefitTypes";

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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  AGENCYOPEN: "AGENCYOPEN",
  AGENCYCLOSE: "AGENCYCLOSE",
  BENEFITOPEN: "BENEFITOPEN",
  BENEFITCLOSE: "BENEFITCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: BenefitStateType = {
  CompanyID: "",
  PRCD: "",
  PProduct: "",
  PFreq: "",
  PContractCurr: "",
  PBillCurr: "",
  POffice: "",
  PolStatus: "",
  PReceivedDate: "",
  PUWDate: "",
  ClientID: "",
  PolicyID: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
  addressOpen: false,
  agencyOpen: false,
  benefitOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
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
    field: "BStartDate",
    header: "StartDate",
    dbField: "b_start_date",
    type: "date",
  },

  {
    field: "PFreq",
    header: "Frequency",
    dbField: "pfreq",
  },
  {
    field: "BTerm",
    header: "Term",
    dbField: "b_term",
  },
  {
    field: "BPTerm",
    header: "PTerm",
    dbField: "bp_term",
  },
  {
    field: "BCoverage",
    header: "Coverage",
    dbField: "b_coverage",
  },
  {
    field: "BSumAssured",
    header: "Sum Assured",
    dbField: "b_sum_assured",
  },
];
