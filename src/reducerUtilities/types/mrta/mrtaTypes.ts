
export type MrtaStateType = {
  Benefitid       :string;
  PolicyID :string;
  Pproduct :string;
  Bcoverage       :string;
  Clientid        :string;
  Bstartdate :string;
  Bterm            :string;
  Prempayingterm  :string;
  Bsumassured :string;
  Interest        :string;
  Interimperiod   :string;
// *** Attention: Check the lookup table open below ***
  policyOpen: boolean;
  clientOpen: boolean;
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
  CLIENTOPEN: string;
  CLIENTCLOSE: string;
};
export type MrtaModalType = {
  state: MrtaStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
