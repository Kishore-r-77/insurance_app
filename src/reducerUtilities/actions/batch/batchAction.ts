import { BatchStateType } from "../../types/batch/batchTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  BATCHOPEN: "BATCHOPEN",
  BATCHCLOSE: "BATCHCLOSE",
  PTOPEN: "PTOPEN",
  PTCLOSE: "PTCLOSE",
  RECEIPTOPEN: "RECEIPTOPEN",
  RECEIPTCLOSE: "RECEIPTCLOSE",
  UNITSTOPEN: "UNITSTOPEN",
  UNITSTCLOSE: "UNITSTCLOSE",
  EXTRACTOPEN: "EXTRACTOPEN",
  EXTRACTCLOSE: "EXTRACTCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined

export const initialValues: BatchStateType = {
  FromPolicy: "",
  ToPolicy: "",
  RevBonusDate: "",
  Date: "",
  FromDate: "",
  ToDate: "",
  PtFromPolicy: "",
  PtToPolicy: "",
  effectiveDate: "",
  UnitStFromDate: "",
  UnitStToDate: "",
  UnitStFromPolicy: "",
  UnitStToPolicy: "",
  batchOpen: false,
  premStOpen: false,
  receiptOpen: false,
  unitStOpen: false,
  extractionOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "FromPolicy",
    header: "From Policy",
    dbField: "from_policy",
  },
  {
    field: "ToPolicy",
    header: "To Policy",
    dbField: "to_policy",
  },
];
