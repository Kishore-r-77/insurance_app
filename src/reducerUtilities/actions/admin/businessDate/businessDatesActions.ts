//Attention: Check the path below and change it if required
//import { BusinessDatesStateType } from "../../types/businessDates/businessDatesTypes";

import { BusinessDatesStateType } from "../../../types/admin/businessDate/businessDatesTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  USEROPEN: "USEROPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  USERCLOSE: "USERCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined

export const initialValues: BusinessDatesStateType = {
  CompanyID: "",
  UserID: "",
  Department: "",
  Date: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  userOpen: false,
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
    field: "UserID",
    header: "User ID",
    dbField: "user_id",
  },
  {
    field: "Department",
    header: "Department",
    dbField: "department",
  },
  {
    field: "Date",
    header: "Business Date",
    dbField: "date",
    type: "date",
  },
];
