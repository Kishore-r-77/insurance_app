export type SsiStateType = {
  CompanyID: string;
  PaID: string;
  PayingAuthorityID: string;
  PaBillDueMonth: string;
  PaBillSeqNo: string;
  PaBillStatus: string;
  ExtractedDate: string;
  ExtractedCount: string;
  ExtractedAmount: string;
  DeductedCount: string;
  DeductedAmount: string;
  NotDeductedCount: string;
  NotDeductedAmount: string;
  UnReconciledCount: string;
  UnReconciledAmount: string;
  ReconciledDate: string;
  ReconciledBy: string;
  ApprovedDate: string;
  ApprovedBy: string;
  // ** Attention: Check the lookup table open below **

  reconOpen: boolean;
  ssiapproveOpen: boolean;

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
  APPROVECHANGE: string;
  EDITCHANGE: string;
  ADDOPEN: string;
  // EDITOPEN: string;
  INFOOPEN: string;
  ADDCLOSE: string;
  // EDITCLOSE: string;
  INFOCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
  // ** Attention: Check the Lookup table Open/close below **
  CLIENTSOPEN: string;
  CLIENTSCLOSE: string;
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  APPROVEOPEN: string;
  APPROVECLOSE: string;
  RECONOPEN: string;
  RECONCLOSE: string;
  SSIAPPROVEOPEN: string;
  SSIAPPROVECLOSE: string;
  POLICIESOPEN: string;
  POLICIESCLOSE: string;
};
export type SsiModalType = {
  state: SsiStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  // handleFormSubmit: () => Promise<void>;
  // ApproveSubmit: () => Promise<void>;
  // RejectSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
  handleSearchChange: any;
  searchContent: any;
};
