export type AddressStateType = {
  CompanyID: string;
  AddressType: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  AddressLine5: string;
  AddressPostCode: string;
  AddressState: string;
  AddressCountry: string;
  AddressStartDate: string;
  AddressEndDate: string;
  ClientID: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  clientOpen: boolean;
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
  SORT_ASC: string;
  SORT_DESC: string;
};

export type AddressModalType = {
  state: AddressStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
