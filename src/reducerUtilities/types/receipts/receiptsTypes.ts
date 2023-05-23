export type ReceiptsStateType = {
  CompanyID: string;
  Branch: string;
  CurrentDate: string;
  DateOfCollection: string;
  ClientID: string;
  TypeOfReceipt: string;
  BankReferenceNo: string;
  BankAccountNo: string;
  AccCurry: string;
  AccAmount: string;
  PolicyID: string;
  ReconciledDate: string;
  // *** Attention: Check the lookup table open below ***
  clientsOpen: boolean;
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
  POLICIESOPEN: string;
  POLICIESCLOSE: string;
};
export type ReceiptsModalType = {
  state: ReceiptsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
