//Attention: Check the path below and change it if required
import { IlpPricesStateType } from "../../types/ilpPrices/ilpPricesTypes";
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
  APPROVEOPEN: "APPROVEOPEN",
  APPROVECLOSE: "APPROVECLOSE",
  BULK_APPROVEOPEN: "BULK_APPROVEOPEN",
  BULK_APPROVECLOSE: "BULK_APPROVECLOSE",
};

//Initial State defined

export const initialValues: IlpPricesStateType = {
  CompanyID: "",
  FundCode: "",
  FundType: "",
  FundDate: "",
  FundEffDate: "",
  FundCurr: "",
  FundBidPrice: "",
  FundOfferPrice: "",
  FundSeqNo: "",
  ApprovalFlag: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  approveOpen: false,
  bulkApproveOpen: false,
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
    field: "FundCode",
    header: "Fund Code",
    dbField: "fund_code",
  },
  {
    field: "FundType",
    header: "Fund Type",
    dbField: "fund_type",
  },
  {
    field: "FundDate",
    header: "Fund Date",
    dbField: "fund_date",
    type: "date",
  },
  {
    field: "FundEffDate",
    header: "Effective Date",
    dbField: "fund_eff_date",
    type: "date",
  },
  {
    field: "FundBidPrice",
    header: "Fund Bid Price",
    dbField: "fund_bid_price",
  },
  {
    field: "FundOfferPrice",
    header: "Fund Offer Price",
    dbField: "fund_offer_price",
  },
  {
    field: "ApprovalFlag",
    header: "Approval Flag",
    dbField: "approval_flag",
  },
];
