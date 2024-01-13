//Attention: Check the path below and change it if required

import { ReceiptsStateType } from "../../types/receipts/receiptsTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  // EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  ADDCLOSE: "ADDCLOSE",
  // EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  // *** Attention: Check the Lookup Open /close ***
  CLIENTSOPEN: "CLIENTSOPEN",
  CLIENTSCLOSE: "CLIENTSCLOSE",
  POLICIESOPEN: "POLICIESOPEN",
  POLICIESCLOSE: "POLICIESCLOSE",
};

//Initial State defined

export const initialValues: ReceiptsStateType = {
  CompanyID: "",
  Branch: "",
  CurrentDate: "",
  DateOfCollection: "",
  ClientID: "",
  TypeOfReceipt: "",
  BankReferenceNo: "",
  BankAccountNo: "",
  BankIFSC: "",
  AccCurry: "",
  AccAmount: "",
  ReceiptAmount: "",
  ReceiptRefNo: "",
  ReceiptDueDate: "",
  ReceiptFor: "",
  PayingAuthorityId: "",
  ReconciledDate: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "policy_id",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  clientsOpen: false,
  policiesOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "Branch",
    header: "Branch",
    dbField: "branch",
  },
  {
    field: "CurrentDate",
    header: "Current Date",
    dbField: "current_date",
  },
  {
    field: "DateOfCollection",
    header: "Collection Date",
    dbField: "date_of_collection",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "TypeOfReceipt",
    header: "Type of Receipt",
    dbField: "type_of_receipt",
  },
  {
    field: "AccCurry",
    header: "Acc.Currency",
    dbField: "acc_curry",
  },
  {
    field: "PolicyID",
    header: "Policy Number",
    dbField: "policy_id",
  },
];
