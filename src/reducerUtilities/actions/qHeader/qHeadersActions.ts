//Attention: Check the path below and change it if required

import { QHeadersStateType } from "../../types/qHeader/qHeadersTypes";

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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
};

//Initial State defined

export const initialValues: QHeadersStateType = {
  CompanyID: "",
  QuoteDate: "",
  QProduct: "",
  ClientID: "",
  QFirstName: "",
  QLastName: "",
  QMidName: "",
  QDob: "",
  QGender: "",
  QNri: "",
  QEmail: "",
  QMobile: "",
  QOccGroup: "",
  QOccSect: "",
  QOccupation: "",
  QAnnualIncome: "",
  QDeclaration: "",
  AddressID: "",

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

  {
    field: "QuoteDate",
    header: "Quote Date",
    dbField: "quote_date",
    type: "date",
  },
  {
    field: "QProduct",
    header: "Product Code",
    dbField: "q_product",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "QFirstName",
    header: "First Name",
    dbField: "q_first_name",
  },
  {
    field: "QLastName",
    header: "Last Name",
    dbField: "q_last_name",
  },
  {
    field: "QEmail",
    header: "eMail",
    dbField: "q_email",
  },
  {
    field: "QMobile",
    header: "Mobile No",
    dbField: "q_mobile",
  },
];
