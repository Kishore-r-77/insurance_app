export type LeadFollowupsStateType = {
  CompanyID: string;
  CountryCode: string;
  LeadDetailID: string;
  ClientID: string;
  ClientName: string;
  SalesManager: string;
  AgencyID: string;
  SeqNo: string;
  AppointmentDate: string;
  AppointmentFlag: string;
  PreferredDay: string;
  PreferredTime: string;
  ActualMeetingDate: string;
  ActionNote: string;
  NextFollowupDate: string;
  ProgressStatus: string;
  // *** Attention: Check the lookup table open below ***
  leadDetailsOpen: boolean;
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
  LEADDETAILSOPEN: string;
  LEADDETAILSCLOSE: string;
};
export type LeadFollowupsModalType = {
  state: LeadFollowupsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
