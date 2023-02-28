import { AgencyStateType } from "../../types/agency/agencyTypes";

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
  BANKOPEN: "BANKOPEN",
  BANKCLOSE: "BANKCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: AgencyStateType = {
  CompanyID: "",
  AgencyChannelSt: "",
  Office: "",
  AgencySt: "",
  LicenseNo: "",
  LicenseStartDate: "",
  LicenseEndDate: "",
  Startdate: "",
  EndDate: "",
  TerminationReason: "",
  ClientID: "",
  Aadhar: "",
  Pan: "",
  AddressID: "",
  BankID: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
  addressOpen: false,
  bankOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  // { field: "CompanyID", header: "Company ID", dbField: "company_id" },
  {
    field: "AgencyChannelSt",
    header: "Agency Channel St",
    dbField: "agency_channel_st",
  },
  {
    field: "Office",
    header: "Office",
    dbField: "office",
  },
  {
    field: "AgencySt",
    header: "Agency St",
    dbField: "agency_st",
  },

  {
    field: "LicenseNo",
    header: "License No",
    dbField: "license_no",
  },
  {
    field: "LicenseStartDate",
    header: "License StartDate",
    dbField: "license_start_date",
    type: "date",
  },
  {
    field: "LicenseEndDate",
    header: "License EndDate",
    dbField: "license_end_date",
  },
  {
    field: "TerminationReason",
    header: "Termination Reason",
    dbField: "termination_reason",
  },
  {
    field: "BTDate",
    header: "BT Date",
    dbField: "bt_date",
    type: "date",
  },
];
