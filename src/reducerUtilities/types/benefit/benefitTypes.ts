export type BenefitStateType = {
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
  PolicyID: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
  addressOpen: boolean;
  agencyOpen: boolean;
  benefitOpen: boolean;
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
  BENEFITOPEN: string;
  BENEFITCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type BenefitModalType = {
  state: BenefitStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
