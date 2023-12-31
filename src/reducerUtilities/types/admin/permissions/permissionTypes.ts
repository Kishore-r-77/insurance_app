export type PermissionStateType = {
  CompanyID: string;
  ModelName: string;
  Method: string;
  UserID: any;
  UserGroupID: any;
  userOrGroup: "user" | "userGroup" | "";
  TransactionID: any;
  userOpen: boolean;
  userGroupOpen: boolean;
  addOpen: boolean;
  editOpen: boolean;
  infoOpen: boolean;
  transactionOpen: boolean;
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
  TRANSACTIONOPEN: string;
  TRANSACTIONCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};

export type PermissionModalType = {
  state: PermissionStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => void;
  ACTIONS: ActionConstantsType;
  userData: any;
  setUserData: any;
  userGroupData: any;
  setUserGroupData: any;
  userOrGroup: any;
  setUserOrGroup: any;
};
