export type ExtractionStateType = {
  addOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
  effectiveDate: string;
};

export type ActionConstantsType = {
  ONCHANGE: string;
  ADDOPEN: string;
  ADDCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type ReceiptModalType = {
  state: ExtractionStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
