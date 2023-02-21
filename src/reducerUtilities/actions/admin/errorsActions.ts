import { ErrorsStateType } from "../../types/admin/errorsTypes";

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
};

//Initial State defined
export const initialValues: ErrorsStateType = {
  CompanyID: "",
  LanguageID: "",
  Tranno: "",
  Session: "",
  ShortCode: null,
  LongCode: null,
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
  { field: "ID", header: "ID", dbField: "id" },
  { field: "Tranno", header: "Tran No", dbField: "tranno" },
  { field: "ShortCode", header: "Short Code", dbField: "short_code" },
  {
    field: "LongCode",
    header: "Long Code",
    dbField: "long_code",
  },
];
