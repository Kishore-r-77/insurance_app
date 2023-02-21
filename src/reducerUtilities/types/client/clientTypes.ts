export type ClientStateType = {
  CompanyID: string;
  ClientShortName: string;
  ClientLongName: string;
  ClientSurName: string;
  Gender: string;
  Salutation: string;
  Language: string;
  ClientDob: string;
  ClientDod: string;
  ClientEmail: string;
  ClientMobile: string;
  ClientStatus: string;
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

export type ClientModalType = {
  state: ClientStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
