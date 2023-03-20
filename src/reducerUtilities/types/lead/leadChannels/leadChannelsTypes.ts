
export type LeadChannelsStateType = {
  CompanyID :string;
  ChannelCode :string;
  ChannelDesc :string;
  StartDate :string;
  EndDate :string;
  LeadAllocSt :string;
  StatusReason :string;
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
export type LeadChannelsModalType = {
  state: LeadChannelsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
