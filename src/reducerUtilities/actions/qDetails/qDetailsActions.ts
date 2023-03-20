//Attention: Check the path below and change it if required

import { QDetailsStateType } from "../../types/qDetails/qDetailsTypes";

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

export const initialValues: QDetailsStateType = {
  CompanyID: "",
  QHeaderID: "",
  QDate: "",
  QCoverage: "",
  QRiskSeqNo: "",
  QAge: "",
  QEmrRating: "",
  QSumAssured: "",
  QRiskCessAge: "",
  QRiskCessTerm: "",
  QRiskCessDate: "",
  QPremCessAge: "",
  QPremCessTerm: "",
  QPremCessDate: "",
  QBeneCessAge: "",
  QBeneCessTerm: "",
  QBeneCessDate: "",
  QAnnualPremium: "",
  QHlyPrem: "",
  QQlyPrem: "",
  QMlyPrem: "",
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
    field: "QHeaderID",
    header: "Header ID",
    dbField: "q_header_id",
  },
  {
    field: "QDate",
    header: "Quotation Date",
    dbField: "q_date",
    type: "date",
  },
  {
    field: "QCoverage",
    header: "Coverage Code",
    dbField: "q_coverage",
  },
  {
    field: "QRiskSeqNo",
    header: "Cover Seq No",
    dbField: "q_risk_seq_no",
  },
  {
    field: "QSumAssured",
    header: "Sum Assured",
    dbField: "q_sum_assured",
  },
];
