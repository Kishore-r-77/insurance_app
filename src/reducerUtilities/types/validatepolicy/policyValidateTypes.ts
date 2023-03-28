
export type PolicyValidateStateType = {
  "1.Company ID" :string,
  "2.PolicyID" :string,
  "3.Coverage"  :string,
  "4.Premium" :string,
  "5.GST" :string,
  "6.StampDuty" :string,
// *** Attention: Check the lookup table open below ***
  benefitsOpen: boolean;
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
  POLICYCLOSE: string;
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
};
export type PolicyValidateModalType = {
  state: PolicyValidateStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
