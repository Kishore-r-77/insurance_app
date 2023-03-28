
export type AfiScrStateType = {
  PolicyID :string;
  UwreasonsId :string;
  RequestedDate :string;
// *** Attention: Check the lookup table open below ***
  policiesOpen: boolean;
  uwreasonsOpen: boolean;
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
  POLICIESOPEN: string;
  POLICIESCLOSE: string;
  UWREASONSOPEN: string;
  UWREASONSCLOSE: string;
};
export type AfiScrModalType = {
  state: AfiScrStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
