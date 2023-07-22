//Attention: Check the path below and change it if required
//import { QHeaderStateType } from "../../types/qHeader/qHeaderTypes";

import { QHeaderStateType } from "../../../types/quotation/qHeader/qHeaderTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  POLICYCREATEOPEN: "POLICYCREATEOPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  POLICYCREATECLOSE: "POLICYCREATECLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  // *** Attention: Check the Lookup Open /close ***
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  AGENCYOPEN: "AGENCYOPEN",
  AGENCYCLOSE: "AGENCYCLOSE",
};

//Initial State defined

export const initialValues: QHeaderStateType = {
  CompanyID: "",
  QuoteDate: "",
  QStatus: "",
  QProduct: "",
  QContractCurr: "",
  POffice: "",
  ClientID: "",
  QFirstName: "",
  QLastName: "",
  QDob: "",
  QGender: "",
  QNri: "",
  QEmail: "",
  QMobile: "",
  AddressID: "",
  QOccGroup: "",
  QOccSect: "",
  QOccupation: "",
  QAnnualIncome: "",
  AgencyID: "",
  PProduct: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  policycreateOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  clientOpen: false,
  addressOpen: false,
  agencyOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "Quote No", dbField: "id" },

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
  {
    field: "AgencyID",
    header: "AgencyID",
    dbField: "agency_id",
  },
  {
    field: "QStatus",
    header: "QStatus",
    dbField: "q_status",
  },
];
