export type AgencyStateType = {
  CompanyID: string;
  AgencyChannel: string;
  Office: string;
  AgencySt: string;
  LicenseNo: string;
  LicenseStartDate: string;
  LicenseEndDate: string;
  Startdate: string;
  EndDate: string;
  TerminationReason: string;
  ClientID: string;
  Aadhar: string;
  Pan: string;
  AddressID: string;
  BankID: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  addressOpen: boolean;
  bankOpen: boolean;
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
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  BANKOPEN: string;
  BANKCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type AgencyModalType = {
  state: AgencyStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
