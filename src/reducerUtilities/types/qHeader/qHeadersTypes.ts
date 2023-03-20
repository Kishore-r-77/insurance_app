
export type QHeadersStateType = {
  CompanyID :string;
  QuoteDate :string;
  QProduct :string;
  ClientID :string;
  QFirstName :string;
  QLastName :string;
  QMidName :string;
  QDob :string;
  QGender :string;
  QNri :string;
  QEmail :string;
  QMobile :string;
  QOccGroup :string;
  QOccSect :string;
  QOccupation :string;
  QAnnualIncome :string;
  QDeclaration :string;
  AddressID :string;
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
  };
export type QHeadersModalType = {
  state: QHeadersStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
