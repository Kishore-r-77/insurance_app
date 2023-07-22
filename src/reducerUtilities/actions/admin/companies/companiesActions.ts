import { CompaniesStateType } from "../../../types/admin/companies/companiesTypes";

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
};

//Initial State defined
export const initialValues: CompaniesStateType = {
  CompanyName: "",
  CompanyAddress1: "",
  CompanyAddress2: "",
  CompanyAddress3: "",
  CompanyAddress4: "",
  CompanyAddress5: "",
  CompanyPostalCode: "",
  CompanyCountry: "",
  CompanyUid: "",
  CompanyGst: "",
  CompanyPan: "",
  CompanyTan: "",
  CompanyLogo: "",
  CompanyIncorporationDate: "",
  CompanyTerminationDate: "",
  CompanyStatusID: "",
  CurrencyID: "",
  ContHeaders: "",
  Users: null,
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "ID", header: "ID", dbField: "id" },
  { field: "CompanyName", header: "Company Name", dbField: "company_name" },
  {
    field: "CompanyPostalCode",
    header: "Company Postal Code",
    dbField: "company_postal_code",
  },
  {
    field: "CompanyCountry",
    header: "Company Country",
    dbField: "company_country",
  },
  { field: "CompanyPan", header: "Company Pan", dbField: "company_pan" },
  { field: "CompanyTan", header: "Company Gst", dbField: "company_tan" },
  { field: "CompanyUid", header: "Company Uid", dbField: "company_uid" },
  {
    field: "CompanyIncorporationDate",
    header: "Company Incorporation Date",
    dbField: "company_incorporation_date",
    type: "date",
  },
  {
    field: "CompanyTerminationDate",
    header: "Company Termination Date",
    dbField: "company_termination_date",
    type: "date",
  },
];
