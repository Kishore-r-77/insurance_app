//Attention: Check the path below and change it if required

import { LeadFollowupsStateType } from "../../../types/lead/leadFollowups/leadFollowupsTypes";

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
  LEADDETAILSOPEN: "LEADDETAILSOPEN",
  LEADDETAILSCLOSE: "LEADDETAILSCLOSE",
};

//Initial State defined

export const initialValues: LeadFollowupsStateType = {
  CompanyID: "",
  CountryCode: "",
  LeadDetailID: "",
  SeqNo: "",
  ClientID: "",
  ClientName: "",
  SalesManager: "",
  AgencyID: "",
  AppointmentDate: "",
  AppointmentFlag: "",
  PreferredDay: "",
  PreferredTime: "",
  ActualMeetingDate: "",
  ActionNote: "",
  NextFollowupDate: "",
  ProgressStatus: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  leadDetailsOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "LeadDetailID",
    header: "Lead Detail ID",
    dbField: "lead_detail_id",
  },
  {
    field: "Followup SeqNo",
    header: "Auto Seq.Number",
    dbField: "seq_no",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "ClientName",
    header: "Client Name",
    dbField: "client_name",
  },
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
    field: "AppointmentDate",
    header: "Scheduled Appt. Date",
    dbField: "appointment_date",
    type: "date",
  },
  {
    field: "AppointmentFlag",
    header: "Appointment Flag",
    dbField: "appointment_flag",
  },
  {
    field: "NextFollowupDate",
    header: "Next Followup Date",
    dbField: "next_followup_date",
    type: "date",
  },
  {
    field: "ProgressStatus",
    header: "Progress Status",
    dbField: "progress_status",
  },
];
