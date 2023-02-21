import { usersStateType } from "../../types/admin/usersTypes";

//Initial State defined
export const initialValues: usersStateType = {
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

export const columns = [
  { field: "Id", header: "ID", dbField: "id" },
  { field: "Email", header: "Email", dbField: "email" },
  { field: "Name", header: "Name", dbField: "name" },
  {
    field: "Phone",
    header: "Phone",
    dbField: "phone",
  },
];
