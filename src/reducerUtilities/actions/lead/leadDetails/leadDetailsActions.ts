//Attention: Check the path below and change it if required

import { LeadDetailsStateType } from "../../../types/lead/leadDetails/leadDetailsTypes";

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
  LEADCHANNELSOPEN: "LEADCHANNELSOPEN",
  LEADCHANNELSCLOSE: "LEADCHANNELSCLOSE",
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
};

//Initial State defined

export const initialValues: LeadDetailsStateType = {
  CompanyID: "",
  LeadChannelID: "",
  OfficeCode: "",
  ProviderName: "",
  ClientID: "",
  ClientName: "",
  ReceivedDate: "",
  CampaignCode: "",
  ProductType: "",
  ProductCode: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  leadChannelsOpen: false,
  clientOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "LeadChannelID",
    header: "Lead Channel",
    dbField: "lead_channel_id",
  },
  {
    field: "OfficeCode",
    header: "Office",
    dbField: "office_code",
  },
  {
    field: "ProviderName",
    header: "Provider",
    dbField: "provider_name",
  },
  {
    field: "ClientID",
    header: "Client",
    dbField: "client_id",
  },
  {
    field: "ReceivedDate",
    header: "Lead Received Date",
    dbField: "received_date",
    type: "date",
  },
  {
    field: "CampaignCode",
    header: "Lead Campaign Code",
    dbField: "campaign_code",
  },
];
