import { BatchStateType } from "../../types/batch/batchTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  ADDOPEN: "ADDOPEN",
  ADDCLOSE: "ADDCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined

export const initialValues: BatchStateType = {
  FromPolicy: "",
  ToPolicy: "",
  RevBonusDate: "",
  Date: "",
  addOpen: true,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
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
