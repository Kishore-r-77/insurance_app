import { PolicyStateType } from "../../types/policy/policyTypes";

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
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: PolicyStateType = {
  CompanyID: "",
  PRCD: "",
  PProduct: "",
  PFreq: "",
  PContractCurr: "",
  PBillCurr: "",
  POffice: "",
  PolStatus: "PA",
  PReceivedDate: "",
  PUWDate: "",
  ClientID: "",
  AgencyID: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
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
    field: "PRCD",
    header: "Policy Receivable Date",
    dbField: "prcd",
    type: "date",
  },
  {
    field: "PProduct",
    header: "Produce",
    dbField: "pproduct",
  },

  {
    field: "Gender",
    header: "Gender",
    dbField: "gender",
  },

  {
    field: "PFreq",
    header: "Frequency",
    dbField: "pfreq",
  },
  {
    field: "POffice",
    header: "Office",
    dbField: "poffice",
  },
  {
    field: "PolStatus",
    header: "Policy Status",
    dbField: "pol_status",
  },
  {
    field: "PUWDate",
    header: "PUW Date",
    dbField: "puw_date",
    type: "date",
  },
  {
    field: "BTDate",
    header: "BT Date",
    dbField: "bt_date",
    type: "date",
  },
];
