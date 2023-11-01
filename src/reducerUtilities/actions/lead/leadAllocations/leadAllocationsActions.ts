import { LeadAllocationsStateType } from "../../../types/lead/leadAllocations/leadAllocationsTypes";

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
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  AGENCIESOPEN: "AGENCIESOPEN",
  AGENCIESCLOSE: "AGENCIESCLOSE",
};

//Initial State defined

export const initialValues: LeadAllocationsStateType = {
  CompanyID: "",
  Office: "",
  SalesManager: "",
  AgencyID: "",
  ClientID: "",
  ClientName: "",
  AllocationDate: "",
  AppointmentDate: "",
  LeadAllocStatus: "",
  ProductType: "",
  ProductCode: "",
  NoofAppointment: "",
  ExtractionDate: "",
  LeadChannelID: "",
  Priority: "",
  Quality: "",
  ClosureStatus: "",
  ClosureDate: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  clientOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  agenciesOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "LeadChannelID",
    header: "LeadChannel ID",
    dbField: "lead_channel_id",
  },
  {
    field: "ReceivedDate",
    header: "Received Date",
    dbField: "received_date",
  },
  {
    field: "CampaignCode",
    header: "Campaign Code",
    dbField: "campaign_code",
  },
  {
    field: "SalesManager",
    header: "Sales Manager",
    dbField: "sales_manager",
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
];
