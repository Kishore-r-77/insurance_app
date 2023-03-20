
export type LeadDetailsStateType = {
  CompanyID :string;
  LeadChannelID :string;
  OfficeCode :string;
  ProviderName :string;
  ClientID :string;
  ReceivedDate :string;
  CampaignCode :string;
  ProductType :string;
  ProductCode :string;
// *** Attention: Check the lookup table open below ***
  leadChannelsOpen: boolean;
  clientOpen: boolean;
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
  // *** Attention: Check the Lookup table Open/close below ***
  LEADCHANNELSOPEN: string;
  LEADCHANNELSCLOSE: string;
  CLIENTOPEN: string;
  CLIENTCLOSE: string;
};
export type LeadDetailsModalType = {
  state: LeadDetailsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
