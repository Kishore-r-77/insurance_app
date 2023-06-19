//Attention: Check the path below and change it if required
//import { QBenIllValueStateType } from "../../types/qBenIllValue/qBenIllValueTypes";

import { QBenIllValueStateType } from "../../types/qBenIllValues/qBenIllValueTypes";

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

export const initialValues: QBenIllValueStateType = {
  CompanyID: "",
  QAccuDivInterest: "",
  QAccuDividend: "",
  QAntiSurBenAmt: "",
  QBonusSurValue: "",
  QCoverage: "",
  QDeathBenefitAmt: "",
  QDetailID: "",
  QGuarAdditions: "",
  QGuarSurrValue: "",
  QLifeAssuredAge: "",
  QLoyaltyAdditions: "",
  QMaturityAmt: "",
  QMaturityDate: "",
  QNorValamt: "",
  QOptValamt: "",
  QPesValamt: "",
  QPolAnnivDate: "",
  QPolicyYear: "",
  QRevBonusAmt: "",
  QSplSurrValue: "",
  QSumAssured: "",
  QTerBonusAmt: "",
  QTotalPremPaid: "",
  QUnallocedAmt: "",
  QallocatedAmt: "",
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
  {
    field: "QCoverage",
    header: "coverage",
    dbField: "q_coverage",
  },
  {
    field: "QPolicyYear",
    header: "Policy Year",
    dbField: "q_policy_year",
  },
  {
    field: "QLifeAssuredAge",
    header: "Life Assured Age",
    dbField: "q_life_assured_age",
  },
  {
    field: "QTotalPremPaid",
    header: "Total Prem Paid",
    dbField: "q_total_prem_paid",
  },
  {
    field: "QSumAssured",
    header: "Sum Assured",
    dbField: "q_sum_assured",
  },
  {
    field: "QDeathBenefitAmt",
    header: "Death Benefit Amount",
    dbField: "q_death_benefit_amt ",
  },
  {
    field: "QSplSurrValue",
    header: "Special SV",
    dbField: "q_spl_surr_value",
  },
];
