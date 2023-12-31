export type IlpSurrenderHStateType = {
  Function: string;
  SurrPercentage: string;
  CompanyID: string;
  PolicyID: string;
  ClientID: string;
  EffectiveDate: string;
  SurrDate: string;
  Cause: string;
  Status: string;
  BillDate: string;
  PaidToDate: string;
  Product: string;
  AplAmount: string;
  LoanAmount: string;
  PolicyDepost: string;
  CashDeposit: string;
  RefundPrem: string;
  PremTolerance: string;
  TotalSurrPayable: string;
  AdjustedAmount: string;
  ReasonDescription: string;
  RequestedDate: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  policyOpen: boolean;
  commitOpen: boolean;
  ilpsurrenderOpen: boolean;
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
  CLIENTOPEN: string;
  CLIENTCLOSE: string;
  POLICYOPEN: string;
  POLICYCLOSE: string;
  ILPSURRENDEROPEN: string;
  ILPSURRENDERCLOSE: string;
};

export type SurrenderHModalType = {
  state: IlpSurrenderHStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  // handleFormSubmit: () => any;
  ACTIONS: ActionConstantsType;
};
