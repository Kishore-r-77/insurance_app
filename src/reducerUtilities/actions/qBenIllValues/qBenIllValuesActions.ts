//Attention: Check the path below and change it if required

import { QBenIllValuesStateType } from "../../types/qBenIllValues/qBenIllValuesTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined

export const initialValues: QBenIllValuesStateType = {
  CompanyID: "",
  QDetailID: "",
  QCoverage: "",
  QPolicyYear: "",
  QLifeAssuredAge: "",
  QPolAnnivDate: "",
  QTotalPremPaid: "",
  QSumAssured: "",
  QRevBonusAmt: "",
  QTerBonusAmt: "",
  QAntiSurBenAmt: "",
  QGuarAdditions: "",
  QLoyaltyAdditions: "",
  QDeathBenefitAmt: "",
  QGuarSurrValue: "",
  QSplSurrValue: "",
  QBonusSurValue: "",
  QAccuDividend: "",
  QAccuDivInterest: "",
  QallocatedAmt: "",
  QUnallocedAmt: "",
  QPesValamt: "",
  QNorValamt: "",
  QOptValamt: "",
  QMaturityDate: "",
  QMaturityAmt: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "QDetailID",
    header: "q_detail_id",
    dbField: "q_detail_id",
  },
  {
    field: "QCoverage",
    header: "q_coverage",
    dbField: "q_coverage",
  },
  {
    field: "QPolicyYear",
    header: "q_policy_year",
    dbField: "q_policy_year",
  },
];
