export type CampaignCompsStateType = {
  CompanyID: string;
  CampaignID: string;
  CampaignCode: string;
  Fee: string;
  Basis: string;
  MinLead: string;
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
  // *** Attention: Check initial value below ***
  campaignsOpen: boolean;
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
  // *** Attention: Check the Lookup table Open/close below ***
  CAMPAIGNSOPEN: string;
  CAMPAIGNSCLOSE: string;
};
export type CampaignCompsModalType = {
  state: CampaignCompsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
