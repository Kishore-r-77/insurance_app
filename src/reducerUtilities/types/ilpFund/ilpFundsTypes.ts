export type IlpFundsStateType = {
  CompanyID: string;
  PolicyID: string;
  BenefitID: string;
  FundCode: string;
  FundType: string;
  EffectiveDate: string;
  FundCurr: string;
  FundPercentage: string;
  // *** Attention: Check the lookup table open below ***
  policyOpen: boolean;
  benefitOpen: boolean;
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
  POLICYOPEN: string;
  POLICYCLOSE: string;
  BENEFITOPEN: string;
  BENEFITCLOSE: string;
};
export type IlpFundsModalType = {
  state: IlpFundsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
  benefitState: any;
};
