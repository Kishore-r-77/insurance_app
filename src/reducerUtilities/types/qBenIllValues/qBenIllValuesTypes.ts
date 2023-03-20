
export type QBenIllValuesStateType = {
  CompanyID :string;
  QDetailID :string;
  QCoverage :string;
  QPolicyYear :string;
  QLifeAssuredAge :string;
  QPolAnnivDate :string;
  QTotalPremPaid :string;
  QSumAssured :string;
  QRevBonusAmt :string;
  QTerBonusAmt :string;
  QAntiSurBenAmt :string;
  QGuarAdditions :string;
  QLoyaltyAdditions :string;
  QDeathBenefitAmt :string;
  QGuarSurrValue :string;
  QSplSurrValue :string;
  QBonusSurValue :string;
  QAccuDividend :string;
  QAccuDivInterest :string;
  QallocatedAmt :string;
  QUnallocedAmt :string;
  QPesValamt :string;
  QNorValamt :string;
  QOptValamt :string;
  QMaturityDate :string;
  QMaturityAmt :string;
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
export type QBenIllValuesModalType = {
  state: QBenIllValuesStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
