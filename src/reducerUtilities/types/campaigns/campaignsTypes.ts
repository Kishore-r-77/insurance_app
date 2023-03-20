export type CampaignsStateType = {
  CompanyID: string;
  SourceName: string;
  ChannelCode: string;
  Province: string;
  Region: string;
  Office: string;
  Status: string;
  StartDate: string;
  EndDate: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
};

export type ActionConstantsType = {
  ONCHANGE: string;
  EDITCHANGE: string;
  ADDOPEN: string;
  EDITOPEN: string;
  INFOOPEN: string;
  ADDCLOSE: string;
  EDITCLOSE: string;
  INFOCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type CampaignsModalType = {
  state: CampaignsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
