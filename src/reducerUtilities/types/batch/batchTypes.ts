export type BatchStateType = {
  RevBonusDate: string;
  FromPolicy: string;
  ToPolicy: string;
  Date: string;
  FromDate: string;
  ToDate: string;
  PtFromPolicy: string;
  PtToPolicy: string;
  effectiveDate: string;
  UnitStFromDate: string;
  UnitStToDate: string;
  UnitStFromPolicy: string;
  UnitStToPolicy: string;
  batchOpen: boolean;
  premStOpen: boolean;
  receiptOpen: boolean;
  unitStOpen: boolean;
};

export type ActionConstantsType = {
  ONCHANGE: string;
  BATCHOPEN: string;
  BATCHCLOSE: string;
  PTOPEN: string;
  PTCLOSE: string;
  RECEIPTOPEN: string;
  RECEIPTCLOSE: string;
  UNITSTOPEN: string;
  UNITSTCLOSE: string;
  SORT_ASC: string;
  SORT_DESC: string;
};
export type BatchModalType = {
  state: BatchStateType;

  dispatch: React.Dispatch<any>;

  ACTIONS: ActionConstantsType;
};
