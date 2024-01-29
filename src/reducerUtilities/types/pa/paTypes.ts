export type pAStateType = {
  CompanyID: string;
  ClientID: string;
  PaName: string;
  PaType: string;
  StartDate: string;
  EndDate: string;
  PaStatus: string;
  ExtrationDay: string;
  PayDay: string;
  PaToleranceAmt: string;
  PaCurrency: string;
  AddressID: string;
  PaPerson: string;
  PaMobCode: string;
  PaMobMobile: string;
  PaEmail: string;

  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  addressOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
  receiptOpen: boolean;
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
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type PauthType = {
  state: pAStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
