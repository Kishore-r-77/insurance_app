export type CompaniesStateType = {
  CompanyName: string;
  CompanyAddress1: string;
  CompanyAddress2: string;
  CompanyAddress3: string;
  CompanyAddress4: string;
  CompanyAddress5: string;
  CompanyPostalCode: string;
  CompanyCountry: string;
  CompanyUid: string;
  CompanyGst: string;
  CompanyPan: string;
  CompanyTan: string;
  CompanyLogo: string;
  CompanyIncorporationDate: string;
  CompanyTerminationDate: string;
  CompanyStatusID: string;
  ContHeaders: string;
  Users: any;
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

export type CompaniesModalType = {
  state: CompaniesStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
