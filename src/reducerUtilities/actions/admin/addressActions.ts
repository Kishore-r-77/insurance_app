import { AddressStateType } from "../../types/admin/addressTypes";

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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: AddressStateType = {
  CompanyID: "",
  AddressType: "",
  AddressLine1: "",
  AddressLine2: "",
  AddressLine3: "",
  AddressLine4: "",
  AddressLine5: "",
  AddressPostCode: "",
  AddressState: "",
  AddressCountry: "",
  AddressStartDate: "",
  AddressEndDate: "",
  ClientID: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  { field: "CompanyID", header: "Company ID", dbField: "company_id" },
  {
    field: "AddressType",
    header: "Address Type",
    dbField: "address_type",
  },
  {
    field: "AddressPostCode",
    header: "Post Code",
    dbField: "address_post_code",
  },

  {
    field: "AddressState",
    header: "State",
    dbField: "address_state",
  },

  {
    field: "AddressCountry",
    header: "Country",
    dbField: "address_country",
  },

  {
    field: "AddressStartDate",
    header: "Start Date",
    dbField: "address_start_date",
    type: "date",
  },
  {
    field: "AddressEndDate",
    header: "Start Date",
    dbField: "address_end_date",
    type: "date",
  },
];
