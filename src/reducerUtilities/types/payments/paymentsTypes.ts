export type PaymentsStateType = {
  CompanyID: string;
  Branch: string;
  CurrentDate: string;
  AccCurry: string;
  AccAmount: string;
  PolicyID: string;
  ClientID: string;
  DateOfPayment: string;
  ReconciledDate: string;
  BankIFSC: string;
  BankAccountNo: string;
  BankReferenceNo: string;
  TypeOfPayment: string;
  InsurerBankIFSC: string;
  InsurerBankAccNo: string;
  AddressID: string;
  Status: string;
  // *** Attention: Check the lookup table open below ***
  clientsOpen: boolean;
  addressOpen: boolean;
  approveOpen: boolean;
  policiesOpen: boolean;
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
  // EDITOPEN: string;
  INFOOPEN: string;
  ADDCLOSE: string;
  // EDITCLOSE: string;
  INFOCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
  // *** Attention: Check the Lookup table Open/close below ***
  CLIENTSOPEN: string;
  CLIENTSCLOSE: string;
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  APPROVEOPEN: string;
  APPROVECLOSE: string;
  POLICIESOPEN: string;
  POLICIESCLOSE: string;
};
export type PaymentsModalType = {
  state: PaymentsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
  handleSearchChange: any;
  searchContent: any;
};
