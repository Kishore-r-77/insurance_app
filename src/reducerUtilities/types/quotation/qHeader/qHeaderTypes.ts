export type QHeaderStateType = {
  CompanyID: string;
  QuoteDate: string;
  QStatus: string;
  QProduct: string;
  QContractCurr: string;
  ClientID: string;
  QFirstName: string;
  QLastName: string;
  QDob: string;
  QGender: string;
  QNri: string;
  QEmail: string;
  QMobile: string;
  AddressID: string;
  QOccGroup: string;
  QOccSect: string;
  QOccupation: string;
  QAnnualIncome: string;
  AgencyID: string;
  // *** Attention: Check the lookup table open below ***
  clientOpen: boolean;
  addressOpen: boolean;
  agencyOpen: boolean;
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
  CLIENTOPEN: string;
  CLIENTCLOSE: string;
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  AGENCYOPEN: string;
  AGENCYCLOSE: string;
};
export type QHeaderModalType = {
  state: QHeaderStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
