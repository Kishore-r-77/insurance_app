import { PermissionStateType } from "../../types/admin/permissionTypes";

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  { field: "ModelName", header: "Model Name", dbField: "company_id" },
  { field: "Method", header: "Method", dbField: "method" },
  { field: "TransCode", header: "TransCode", dbField: "trans_code" },
];

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
  USEROPEN: "USEROPEN",
  USERGROUPOPEN: "USERGROUPOPEN",
  USERCLOSE: "USERCLOSE",
  USERGROUPCLOSE: "USERGROUPCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

export const initialValues: PermissionStateType = {
  CompanyID: "",
  ModelName: "",
  Method: "",
  UserID: "",
  UserGroupID: "",
  TransCode: "",
  userOrGroup: "",
  userOpen: false,
  userGroupOpen: false,
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};
