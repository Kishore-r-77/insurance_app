//Attention: Check the path below and change it if required
import { CampaignsStateType } from "../../types/campaigns/campaignsTypes";
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
  CAMPAIGNSOPEN: "CAMPAIGNOPEN",
  CAMPAIGNsCLOSE: "CAMPAIGNCLOSE",
};

//Initial State defined

export const initialValues: CampaignsStateType = {
  CompanyID: "",
  SourceName: "",
  ChannelCode: "",
  Province: "",
  Region: "",
  Office: "",
  Status: "",
  StartDate: "",
  EndDate: "",
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
    field: "SourceName",
    header: "Campaign Code",
    dbField: "source_name",
  },
  {
    field: "ChannelCode",
    header: "Channel Code",
    dbField: "channel_code",
  },
  {
    field: "Status",
    header: "Campaign Status",
    dbField: "status",
  },
  {
    field: "StartDate",
    header: "Campaign Start Date",
    dbField: "start_date",
    type: "date",
  },
  {
    field: "EndDate",
    header: "Campaign End Date",
    dbField: "end_date",
    type: "date",
  },
];
