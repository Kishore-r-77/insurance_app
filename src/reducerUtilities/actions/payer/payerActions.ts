//Attention: Check the path below and change it if required
//import { PayorStateType } from "../../types/payor/payorTypes";

import { PayerStateType } from "../../types/payer/payerTypes";

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
  // *** Attention: Check the Lookup Open /close ***
  POLICYOPEN: "POLICYOPEN",
  POLICYCLOSE: "POLICYCLOSE",
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  BANKOPEN: "BANKOPEN",
  BANKCLOSE: "BANKCLOSE",
};

//Initial State defined

export const initialValues: PayerStateType = {
  PolicyID: "",
  ClientID: "",
  BankID: "",
  FromDate: "",
  ToDate: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  policyOpen: false,
  clientOpen: false,
  bankOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  {
    field: "PolicyID",
    header: "Policy Number",
    dbField: "policy_id",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "BankID",
    header: "Bank ID",
    dbField: "bank_id",
  },
  {
    field: "FromDate",
    header: "From Date",
    dbField: "from_date",
    type: "date",
  },
  {
    field: "ToDate",
    header: "To Date ",
    dbField: "to_date",
    type: "date",
  },
];
