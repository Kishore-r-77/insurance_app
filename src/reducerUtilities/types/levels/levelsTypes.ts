
export type LevelsStateType = {
  CompanyID :string;
  ShortCode :string;
  LongName :string;
  LevelCode :string;
  LevelID :string;
// *** Attention: Check the lookup table open below ***
  levelsOpen: boolean;
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
  LEVELSOPEN: string;
  LEVELSCLOSE: string;
};
export type LevelsModalType = {
  state: LevelsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
