
//Attention: Check the path below and change it if required 
import { AssigneeStateType } from "../../types/assignee/assigneeTypes";
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
  POLICYOPEN:  "POLICYOPEN",
  POLICYCLOSE: "POLICYCLOSE",
  CLIENTOPEN:  "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  };

  //Initial State defined



export const initialValues: AssigneeStateType = {
  CompanyID :"",
  PolicyID :"",
  ClientID :"",
  AssigneeType :"",
  Fromdate :"",
  Todate :"",
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
  clientOpen: false,
  };

  //Columns Defined to Pass into the Custom Table



export const columns = [ 
  {
    field: "PolicyID",
    header: "Policy ID",
    dbField: "policy_id",
  },
  {
    field: "ClientID",
    header: "Client ID",
    dbField: "client_id",
  },
  {
    field: "AssigneeType",
    header: "Assignee Type",
    dbField: "assignee_type",
  },
  {
    field: "Fromdate",
    header: "From Date",
    dbField: "fromDate",
    type: "date",
  },
  {
    field: "Todate",
    header: "To Date",
    dbField: "toDate",
    type: "date",
  },
  ];
