export type PermissionStateType = {
  CompanyID: string;
  ModelName: string;
  Method: string;
  UserID: any;
  UserGroupID: any;
  userOrGroup: "user" | "userGroup" | "";
  userOpen: boolean;
  userGroupOpen: boolean;
  TransCode: string;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  searchString: string;
  searchCriteria: string;
  sortColumn: string;
  sortAsc: boolean;
  sortDesc: boolean;
};

type ActionConstantsType = {
  ONCHANGE: string;
  EDITCHANGE: string;
  ADDOPEN: string;
  EDITOPEN: string;
  INFOOPEN: string;
  ADDCLOSE: string;
  EDITCLOSE: string;
  INFOCLOSE: string;
  USEROPEN: string;
  USERGROUPOPEN: string;
  USERCLOSE: string;
  USERGROUPCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type PermissionModalType = {
  state: PermissionStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => void;
  ACTIONS: ActionConstantsType;
};
