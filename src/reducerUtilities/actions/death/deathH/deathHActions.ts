import { DeathHStateType } from "../../../types/death/deathH/deathHTypes";

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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  POLICYOPEN: "POLICYOPEN",
  POLICYCLOSE: "POLICYCLOSE",
  COMMITOPEN: "COMMITOPEN",
  COMMITCLOSE: "COMMITCLOSE",
};

//Initial State defined
export const initialValues: DeathHStateType = {
  Function: "Fill",
  CompanyID: "",
  PolicyID: "",
  ClientID: "",
  EffectiveDate: "",
  DeathDate: "",
  Cause: "",
  Status: "",
  BillDate: "",
  PaidToDate: "",
  DeathProof: "",
  Product: "",
  AplAmount: "",
  LoanAmount: "",
  PolicyDepost: "",
  CashDeposit: "",
  RefundPrem: "",
  PremTolerance: "",
  TotalDeathPayable: "",
  AdjustedAmount: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
  policyOpen: false,
  commitOpen: false,
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
    header: "Policy ID",
    dbField: "policy_id",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },

  {
    field: "EffectiveDate",
    header: "Effective Date",
    dbField: "effective_date",
    type: "date",
  },
  {
    field: "DeathDate",
    header: "Death Date",
    dbField: "death_date",
    type: "date",
  },
  {
    field: "Cause",
    header: "Cause",
    dbField: "cause",
  },
  {
    field: "DeathProof",
    header: "Death Proof",
    dbField: "death_proof",
  },
  {
    field: "Status",
    header: "Status",
    dbField: "status",
  },
];
