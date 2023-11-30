export type ParamItemsStateType = {
  companyId: string;
  languageId : string,
  longdesc : string ,
  shortdesc: string,
  item: string,
  name: string ,
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  cloneOpen: boolean;
  deleteOpen: boolean;
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

export type ParamsModalType = {
  state: ParamItemsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
