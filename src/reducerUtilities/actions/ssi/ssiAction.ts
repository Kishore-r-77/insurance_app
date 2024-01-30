//Attention: Check the path below and change it if required

import { SsiStateType } from "../../types/ssi/ssiTypes";

//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  APPROVECHANGE: "APPROVECHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  // EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  ADDCLOSE: "ADDCLOSE",
  // EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
  // *** Attention: Check the Lookup Open /close ***
  CLIENTSOPEN: "CLIENTSOPEN",
  CLIENTSCLOSE: "CLIENTSCLOSE",
  ADDRESSOPEN: "ADDRESSOPEN",
  ADDRESSCLOSE: "ADDRESSCLOSE",
  APPROVEOPEN: "APPROVEOPEN",
  APPROVECLOSE: "APPROVECLOSE",
  RECONOPEN: "RECONOPEN",
  RECONCLOSE: "RECONCLOSE",
  SSIAPPROVEOPEN: "SSIAPPROVEOPEN",
  SSIAPPROVECLOSE: "SSIAPPROVECLOSE",
  POLICIESOPEN: "POLICIESOPEN",
  POLICIESCLOSE: "POLICIESCLOSE",
};

//Initial State defined

export const initialValues: SsiStateType = {
  CompanyID: "",
  PaID: "",
  PayingAuthorityID: "",
  PaBillDueMonth: "",
  PaBillSeqNo: "",
  PaBillStatus: "",
  ExtractedDate: "",
  ExtractedCount: "",
  ExtractedAmount: "",
  DeductedCount: "",
  DeductedAmount: "",
  NotDeductedCount: "",
  NotDeductedAmount: "",
  UnReconciledCount: "",
  UnReconciledAmount: "",
  ReconciledDate: "",
  ReconciledBy: "",
  ApprovedDate: "",
  ApprovedBy: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***

  reconOpen: false,
  ssiapproveOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "SSI.No", dbField: "id" },

  {
    field: "PaName",
    header: "Pa Name",
    dbField: "pa_name",
  },
  {
    field: "PaType",
    header: "PaType",
    dbField: "pa_type",
  },
  {
    field: "PaBillDueMonth",
    header: "DueMonth",
    dbField: "pa_bill_due_month",
  },

  {
    field: "PaBillStatus",
    header: "PaBillStatus",
    dbField: "pa_bill_status",
  },
  {
    field: "PaBillSeqNo",
    header: "SeqNo",
    dbField: "pa_bill_seq_no",
  },

  {
    field: "PayingAuthorityID",
    header: "Pa Id",
    dbField: "paying_authority_id",
  },

  {
    field: "ExtractedDate",
    header: "Extracted Date",
    dbField: "extracted_date",
    type: "date",
  },
  {
    field: "ExtractedCount",
    header: "ExtractedCount",
    dbField: "extracted_count",
  },
  {
    field: "ExtractedAmount",
    header: "Extracted Amount",
    dbField: "extracted_amount",
  },
];
