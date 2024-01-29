export type ClientStateType = {
  NationalId: string;
  Nationality: string;
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
  ClientMobCode: string;
  ClientStatus: string;
  ClientType: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  addressOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
  receiptOpen: boolean;
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
  ADDRESSOPEN: string;
  ADDRESSCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
  RECEIPTOPEN: string;
  RECEIPTCLOSE: string;
};

export type ClientModalType = {
  state: ClientStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
