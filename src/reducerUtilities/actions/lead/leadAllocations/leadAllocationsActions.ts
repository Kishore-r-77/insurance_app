
//Attention: Check the path below and change it if required 
//import { LeadAllocationsStateType } from "../../types/leadAllocations/leadAllocationsTypes";
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
  AGENCIESOPEN:  "AGENCIESOPEN",
  AGENCIESCLOSE: "AGENCIESCLOSE",
  };

  //Initial State defined



export const initialValues: LeadAllocationsStateType = {
  CompanyID :"",
  Office :"",
  SalesManager :"",
  AgencyID :"",
  AllocationDate :"",
  AppointmentDate :"",
  LeadAllocStatus :"",
  ProductType :"",
  ProductCode :"",
  NoofAppointment :"",
  Priority :"",
  Quality :"",
  ClosureStatus :"",
  ClosureDate :"",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
// *** Attention: Check initial value below ***
  agenciesOpen: false,
  };

  //Columns Defined to Pass into the Custom Table



export const columns = [ 
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "SalesManager",
    header: "Sales Manager",
    dbField: "sales_manager",
  },
  {
    field: "AgencyID",
    header: "Agent ID",
    dbField: "agency_id",
  },
  {
    field: "AllocationDate",
    header: "Allocation Date",
    dbField: "allocation_date",
    type: "date",
  },
  {
    field: "AppointmentDate",
    header: "Appointment Date",
    dbField: "appointment_date",
    type: "date",
  },
  {
    field: "LeadAllocStatus",
    header: "Lead Allocation Status",
    dbField: "lead_alloc_status",
  },
  {
    field: "NoofAppointment",
    header: "No.Of Appts",
    dbField: "noof_appointment",
  },
  {
    field: "ClosureStatus",
    header: "Closure Status",
    dbField: "closure_status",
  },
  ];
