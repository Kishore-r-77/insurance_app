//Attention: Check the path below and change it if required

import { PaymentsStateType } from "../../types/payments/paymentsTypes";

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
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  APPROVEOPEN: "APPROVEOPEN",
  APPROVECLOSE: "APPROVECLOSE",
  POLICIESOPEN: "POLICIESOPEN",
  POLICIESCLOSE: "POLICIESCLOSE",
};

//Initial State defined

export const initialValues: PaymentsStateType = {
  CompanyID: "",
  Branch: "",
  CurrentDate: "",
  AccCurry: "",
  AccAmount: "",
  PolicyID: "",
  ClientID: "",
  DateOfPayment: "",
  ReconciledDate: "",
  BankIFSC: "",
  BankAccountNo: "",
  BankReferenceNo: "",
  TypeOfPayment: "",
  InsurerBankIFSC: "",
  InsurerBankAccNo: "",
  AddressID: "",
  Status: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  clientsOpen: false,
  addressOpen: false,
  approveOpen: false,
  policiesOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "Payment.No", dbField: "id" },

  {
    field: "Branch",
    header: "Branch",
    dbField: "branch",
  },
  {
    field: "PolicyID",
    header: "Policy Id",
    dbField: "policy_id",
  },
  {
    field: "DateOfPayment",
    header: "Payment Date",
    dbField: "date_of_collection",
    type: "date",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "TypeOfPayment",
    header: "PaymentType",
    dbField: "type_of_payment",
  },
  {
    field: "AccCurry",
    header: "Currency",
    dbField: "acc_curry",
  },
  {
    field: "Status",
    header: "Status",
    dbField: "status",
  },
];
