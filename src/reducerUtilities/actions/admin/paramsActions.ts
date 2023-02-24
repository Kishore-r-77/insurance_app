import { ParamsStateType } from "../../types/admin/parameterTypes";

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
export const initialValues: ParamsStateType = {
  companyId: "",
  languageId: "",
  longdesc: "",
  name: "",
  type: "",

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
  { field: "companyId", header: "Company Id", dbField: "company_id" },
  { field: "name", header: "Name", dbField: "name", sortable: true },
  {
    field: "longdesc",
    header: "Description",
    dbField: "longdesc",
  },
];
