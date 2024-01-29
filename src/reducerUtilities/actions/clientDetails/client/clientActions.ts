import { ClientStateType } from "../../../types/client/clientTypes";

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
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  RECEIPTOPEN: "RECEIPTOPEN",
  RECEIPTCLOSE: "RECEIPTCLOSE",
};

//Initial State defined
export const initialValues: ClientStateType = {
  CompanyID: "",
  ClientShortName: "",
  ClientLongName: "",
  ClientSurName: "",
  Gender: "",
  Salutation: "",
  Language: "",
  ClientDob: "",
  ClientDod: "",
  ClientEmail: "",
  ClientMobile: "",
  NationalId: "",
  Nationality: "",
  ClientMobCode: "",
  ClientStatus: "",
  ClientType: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  addressOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  receiptOpen: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  { field: "CompanyID", header: "Company ID", dbField: "company_id" },
  {
    field: "ClientShortName",
    header: "Client Short Name",
    dbField: "client_short_name",
  },
  {
    field: "ClientLongName",
    header: "Client Long Name",
    dbField: "client_long_name",
  },

  {
    field: "Gender",
    header: "Gender",
    dbField: "gender",
  },

  {
    field: "ClientEmail",
    header: "Client Email",
    dbField: "client_email",
  },
  {
    field: "ClientMobile",
    header: "Client Mobile",
    dbField: "client_mobile",
  },
  {
    field: "ClientType",
    header: "Client Type",
    dbField: "client_type",
  },
  {
    field: "ClientStatus",
    header: "Client Status",
    dbField: "client_status",
  },
  {
    field: "ClientDob",
    header: "Client Dob",
    dbField: "client_dob",
    type: "date",
  },
];
