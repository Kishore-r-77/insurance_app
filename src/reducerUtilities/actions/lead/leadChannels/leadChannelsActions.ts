//Attention: Check the path below and change it if required

import { LeadChannelsStateType } from "../../../types/lead/leadChannels/leadChannelsTypes";

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

export const initialValues: LeadChannelsStateType = {
  CompanyID: "",
  ChannelCode: "",
  ChannelDesc: "",
  StartDate: "",
  EndDate: "",
  LeadAllocSt: "",
  StatusReason: "",
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

  {
    field: "ChannelCode",
    header: "Channel code",
    dbField: "channel_code",
  },
  {
    field: "ChannelDesc",
    header: "Channel Description",
    dbField: "channel_desc",
  },
  {
    field: "StartDate",
    header: "Start Date",
    dbField: "start_date",
    type: "date",
  },
  {
    field: "LeadAllocSt",
    header: "Lead Allocation Status",
    dbField: "lead_alloc_st",
  },
];
