//Attention: Check the path below and change it if required
import { ClientWorkStateType } from "../../types/clientWork/clientWorkTypes";
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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  EMPLOYEROPEN: "EMPLOYEROPEN",
  EMPLOYERCLOSE: "EMPLOYERCLOSE",
};

//Initial State defined

export const initialValues: ClientWorkStateType = {
  CompanyID: "",
  ClientID: "",
  EmployerID: "",
  PayRollNumber: "",
  Designation: "",
  Department: "",
  Location: "",
  StartDate: "",
  EndDate: "",
  WorkType: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  clientOpen: false,
  employerOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "EmployerID",
    header: "Employer ID",
    dbField: "employer_id",
  },
  {
    field: "PayRollNumber",
    header: "Pay Roll No",
    dbField: "pay_roll_number",
  },
  {
    field: "Location",
    header: "Location",
    dbField: "location",
  },
];
