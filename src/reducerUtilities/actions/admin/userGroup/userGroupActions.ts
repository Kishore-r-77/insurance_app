import { UserGroupStateType } from "../../../types/admin/userGroups/userGroupTypes";

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
export const initialValues: UserGroupStateType = {
  CompanyID: "",
  GroupName: "",
  ValidFrom: "",
  ValidTo: "",
  Users: null,
  Permissions: null,
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
  { field: "ID", header: "ID", dbField: "id", sortable: true },
  { field: "CompanyID", header: "Company ID", dbField: "company_id" },
  {
    field: "GroupName",
    header: "Group Name",
    dbField: "group_name",
    sortable: true,
  },
  {
    field: "ValidFrom",
    header: "Valid From",
    dbField: "valid_from",
    type: "date",
  },
  { field: "ValidTo", header: "Valid To", dbField: "valid_to", type: "date" },
];
