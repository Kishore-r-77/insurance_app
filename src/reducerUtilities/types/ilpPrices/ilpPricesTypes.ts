export type IlpPricesStateType = {
  CompanyID: string;
  FundCode: string;
  FundType: string;
  FundDate: string;
  FundEffDate: string;
  FundCurr: string;
  FundBidPrice: string;
  FundOfferPrice: string;
  FundSeqNo: string;
  ApprovalFlag: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  approveOpen: boolean;
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
  APPROVEOPEN: string;
  APPROVECLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type IlpPricesModalType = {
  state: IlpPricesStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
  p0061Data: any;
  setp0061Data: any;
};
