export type ClientWorkStateType = {
  CompanyID: string;
  ClientID: string;
  EmployerID: string;
  PayRollNumber: string;
  Designation: string;
  Department: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  WorkType: string;
  // *** Attention: Check the lookup table open below ***
  clientOpen: boolean;
  employerOpen: boolean;
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
  EMPLOYEROPEN: string;
  EMPLOYERCLOSE: string;
};
export type ClientWorkModalType = {
  state: ClientWorkStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
