export type PolicyStateType = {
  CompanyID: string;
  PRCD: string;
  PProduct: string;
  PFreq: string;
  PContractCurr: string;
  PBillCurr: string;
  POffice: string;
  PolStatus: string;
  PReceivedDate: string;
  PUWDate: string;
  ClientID: string;
  AgencyID: string;
  AddressID: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  addressOpen: boolean;
  agencyOpen: boolean;
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
  AGENCYOPEN: string;
  AGENCYCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type PolicyModalType = {
  state: PolicyStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
