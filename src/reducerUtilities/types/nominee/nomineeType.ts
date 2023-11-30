export type NomineeStateType = {
  PolicyID: string;
  ClientID: string;
  NomineeRelationship: string;
  NomineeLongName: string;
  NomineePercentage: string;
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
  nomineeOpen: boolean;
  nomineeClientOpen: boolean;
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
  NOMINEEOPEN: string;
  NOMINEECLOSE: string;
  NOMINEECLIENTOPEN: string;
  NOMINEECLIENTCLOSE: string;
};
export type NomineeModalType = {
  state: NomineeStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
