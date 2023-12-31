export type PolicyValidateStateType = {
  PolicyID: string;
  CompanyID: string;
  Coverage: string;
  Premium: string;
  GST: string;
  StampDuty: string;
  CumulativePrem: string;
  PolicyDeposit: string;
  benefitsOpen: boolean;
  BPrem: string;
  CovrGst: string;
  CovrStampduty: string;
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
  BENEFITSOPEN: string;
  BENEFITSCLOSE: string;
  POLICYCLOSE: string;
};
export type PolicyValidateModalType = {
  state: PolicyValidateStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
