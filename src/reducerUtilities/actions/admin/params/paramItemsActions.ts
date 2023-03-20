import { ParamItemsStateType } from "../../../types/admin/params/paramItemsTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  DELOPEN: "DELOPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  DELCLOSE: "DELCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: ParamItemsStateType = {
  companyId: "",
  languageId: "",
  longdesc: "",
  name: "",
  item: "",
  shortdesc: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  deleteOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "item", header: "Item", dbField: "item", sortable: true },
  {
    field: "shortdesc",
    header: "Short Description",
    dbField: "shortdesc",
    sortable: false,
  },
  {
    field: "longdesc",
    header: "Long Description",
    dbField: "longdesc",
    sortable: false,
  },
];
