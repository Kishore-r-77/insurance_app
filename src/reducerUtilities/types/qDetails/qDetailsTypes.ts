
export type QDetailsStateType = {
  CompanyID :string;
  QHeaderID :string;
  QDate :string;
  QCoverage :string;
  QRiskSeqNo :string;
  QAge :string;
  QEmrRating :string;
  QSumAssured :string;
  QRiskCessAge :string;
  QRiskCessTerm :string;
  QRiskCessDate :string;
  QPremCessAge :string;
  QPremCessTerm :string;
  QPremCessDate :string;
  QBeneCessAge :string;
  QBeneCessTerm :string;
  QBeneCessDate :string;
  QAnnualPremium :string;
  QHlyPrem :string;
  QQlyPrem :string;
  QMlyPrem :string;
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
export type QDetailsModalType = {
  state: QDetailsStateType;
  record: any;
  dispatch: React.Dispatch<any>;
  handleFormSubmit: () => Promise<void>;
  ACTIONS: ActionConstantsType;
};
