export type UnitStateType = {
  FromDate: string;
  ToDate: string;
  RevBonusDate: string;
  FromPolicy: string;
  ToPolicy: string;
  Date: string;
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
export type UnitModalType = {
  state: UnitStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
