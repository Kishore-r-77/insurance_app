//Attention: Check the path below and change it if required
import { CampaignCompsStateType } from "../../types/campaignComps/campaignCompsTypes";
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
  CAMPAIGNSOPEN: "CAMPAIGNSOPEN",
  CAMPAIGNSCLOSE: "CAMPAIGNSCLOSE",
};

//Initial State defined

export const initialValues: CampaignCompsStateType = {
  CompanyID: "",
  CampaignID: "",
  CampaignCode: "",
  Fee: "",
  Basis: "",
  MinLead: "",
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
  // *** Attention: Check initial value below ***
  campaignsOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "CampaignID",
    header: "Campaign ID",
    dbField: "campaign_id",
  },
  {
    field: "CampaignCode",
    header: "Campaign Description",
    dbField: "campaign_code",
  },
  {
    field: "Basis",
    header: "Basis",
    dbField: "basis",
  },
  {
    field: "StartDate",
    header: "Start Date",
    dbField: "start_date",
    type: "date",
  },
  {
    field: "EndDate",
    header: "End Date",
    dbField: "end_date",
    type: "date",
  },
];
