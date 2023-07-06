export type BusinessDatesStateType = {
  CompanyID: string;
  UserID: string;
  Department: string;
  Date: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  userOpen: boolean;
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
  USEROPEN: string;
  ADDCLOSE: string;
  EDITCLOSE: string;
  INFOCLOSE: string;
  USERCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type BusinessDatesModalType = {
  state: BusinessDatesStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
