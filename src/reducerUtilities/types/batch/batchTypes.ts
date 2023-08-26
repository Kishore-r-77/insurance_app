export type BatchStateType = {
  RevBonusDate: string;
  FromPolicy: string;
  ToPolicy: string;
  addOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
};

export type ActionConstantsType = {
  ONCHANGE: string;
  ADDOPEN: string;
  ADDCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type BatchModalType = {
  state: BatchStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
