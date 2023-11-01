export type BankStateType = {
  CompanyID: string;
  BankCode: string;
  BankAccountNo: string;
  StartDate: string;
  EndDate: string;
  BankType: string;
  BankAccountStatus: string;
  ClientID: string;
  BankGroup: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
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
  CLIENTOPEN: string;
  CLIENTCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type BankModalType = {
  state: BankStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
