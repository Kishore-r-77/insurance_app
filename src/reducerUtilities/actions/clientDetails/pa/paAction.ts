import { pAStateType } from "../../../types/pa/paTypes";

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
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  RECEIPTOPEN: "RECEIPTOPEN",
  RECEIPTCLOSE: "RECEIPTCLOSE",
};

//Initial State defined
export const initialValues: pAStateType = {
  CompanyID: "",
  ClientID: "",
  PaName: "",
  PaType: "",
  StartDate: "",
  EndDate: "",
  PaStatus: "",
  ExtrationDay: "",
  PayDay: "",
  PaToleranceAmt: "",
  PaCurrency: "",
  AddressID: "",
  PaPerson: "",
  PaMobCode: "",
  PaMobMobile: "",
  PaEmail: "",

  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
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
    field: "ClientID",
    header: "Client Id",
    dbField: "client_id",
  },
  {
    field: "PaName",
    header: "PaName ",
    dbField: "pa_name",
  },
  {
    field: "PaType",
    header: "PaType ",
    dbField: "pa_type",
  },
  {
    field: "StartDate",
    header: "StartDate ",
    dbField: "start_date",
    type: "date",
  },
  {
    field: "EndDate",
    header: "EndDate",
    dbField: "end_date",
    type: "date",
  },
  {
    field: "PaStatus",
    header: "PaStatus ",
    dbField: "pa_status",
  },
];
