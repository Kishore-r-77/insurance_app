export type MaturityStateType = {
  Function: string;
  CompanyID: string;
  PolicyID: string;
  ClientID: string;
  EffectiveDate: string;
  MaturityDate: string;
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
  TotalMaturityPayable: string;
  AdjustedAmount: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  policyOpen: boolean;
  commitOpen: boolean;
  maturityOpen: boolean;
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
  MATURITYOPEN: string;
  MATURITYCLOSE: string;
};

export type MaturityType = {
  state: MaturityStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  // handleFormSubmit: () => any;
  ACTIONS: ActionConstantsType;
};
