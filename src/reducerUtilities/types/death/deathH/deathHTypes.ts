export type DeathHStateType = {
  Function: string;
  CompanyID: string;
  PolicyID: string;
  ClientID: string;
  EffectiveDate: string;
  DeathDate: string;
  Cause: string;
  Status: string;
  BillDate: string;
  PaidToDate: string;
  DeathProof: string;
  Product: string;
  AplAmount: string;
  LoanAmount: string;
  PolicyDepost: string;
  CashDeposit: string;
  RefundPrem: string;
  PremTolerance: string;
  TotalDeathPayable: string;
  AdjustedAmount: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  policyOpen: boolean;
  commitOpen: boolean;
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
};

export type DeathHModalType = {
  state: DeathHStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => any;
  ACTIONS: ActionConstantsType;
};
