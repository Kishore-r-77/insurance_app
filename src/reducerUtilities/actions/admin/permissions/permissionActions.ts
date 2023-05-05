import { PermissionStateType } from "../../../types/admin/permissions/permissionTypes";

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  { field: "ModelName", header: "Model Name", dbField: "company_id" },
  { field: "Method", header: "Method", dbField: "method" },
  // {
  //   field: "TransactionID",
  //   header: "Transaction ID",
  //   dbField: "transaction_id",
  // },
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
  TRANSACTIONOPEN: "TRANSACTIONOPEN",
  TRANSACTIONCLOSE: "TRANSACTIONCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

export const initialValues: PermissionStateType = {
  CompanyID: "",
  ModelName: "",
  Method: "",
  UserID: "",
  UserGroupID: "",
  TransactionID: "",
  userOrGroup: "",
  userOpen: false,
  userGroupOpen: false,
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  transactionOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};
