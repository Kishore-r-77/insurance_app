//Attention: Check the path below and change it if required
import { IlpFundsStateType } from "../../types/ilpFund/ilpFundsTypes";
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
  // *** Attention: Check the Lookup Open /close ***
  POLICYOPEN: "POLICYOPEN",
  POLICYCLOSE: "POLICYCLOSE",
  BENEFITOPEN: "BENEFITOPEN",
  BENEFITCLOSE: "BENEFITCLOSE",
};

//Initial State defined

export const initialValues: IlpFundsStateType = {
  CompanyID: "",
  PolicyID: "",
  BenefitID: "",
  FundCode: "",
  FundType: "",
  EffectiveDate: "",
  FundCurr: "",
  FundPercentage: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  policyOpen: false,
  benefitOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "PolicyID",
    header: "Policy ID",
    dbField: "policy_id",
  },
  {
    field: "BenefitID",
    header: "Benefit ID",
    dbField: "benefit_id",
  },
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
    field: "EffectiveDate",
    header: "Fund Effective Date",
    dbField: "effective_date",
    type: "date",
  },
  {
    field: "FundCurr",
    header: "Fund Currency",
    dbField: "fund_curr",
  },
  {
    field: "FundPercentage",
    header: "Fund Percentage",
    dbField: "fund_percentage",
  },
];
