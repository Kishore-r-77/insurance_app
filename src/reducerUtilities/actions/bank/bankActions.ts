import { BankStateType } from "../../types/bank/bankTypes";

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
export const initialValues: BankStateType = {
  CompanyID: "",
  BankCode: "",
  BankAccountNo: "",
  StartDate: "",
  EndDate: "",
  BankType: "",
  BankAccountStatus: "",
  ClientID: "",
  AgnecyID: "",
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
    field: "BankCode",
    header: "Bank Code",
    dbField: "bank_code",
  },
  {
    field: "BankAccountNo",
    header: "Bank Account No",
    dbField: "bank_account_no",
  },

  {
    field: "StartDate",
    header: "Start Date",
    dbField: "start_date",
    type: "date",
  },

  {
    field: "EndDate",
    header: "End Date",
    dbField: "end_date",
    type: "date",
  },

  {
    field: "BankType",
    header: "Bank Type",
    dbField: "bank_type",
  },
  {
    field: "BankAccountStatus",
    header: "Bank Account Status",
    dbField: "bank_account_status",
  },
  {
    field: "ClientID",
    header: "Client Id",
    dbField: "client_id",
  },
  {
    field: "AgnecyID",
    header: "Agency Id",
    dbField: "agency_id",
  },
];
