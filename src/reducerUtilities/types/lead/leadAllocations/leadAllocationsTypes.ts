
export type LeadAllocationsStateType = {
  CompanyID :string;
  Office :string;
  SalesManager :string;
  AgencyID :string;
  AllocationDate :string;
  AppointmentDate :string;
  LeadAllocStatus :string;
  ProductType :string;
  ProductCode :string;
  NoofAppointment :string;
  Priority :string;
  Quality :string;
  ClosureStatus :string;
  ClosureDate :string;
// *** Attention: Check the lookup table open below ***
  agenciesOpen: boolean;
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
  AGENCIESOPEN: string;
  AGENCIESCLOSE: string;
};
export type LeadAllocationsModalType = {
  state: LeadAllocationsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};