
//Attention: Check the path below and change it if required 
//import { AfiScrStateType } from "../../types/afiScr/afiScrTypes";
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
  POLICIESOPEN:  "POLICIESOPEN",
  POLICIESCLOSE: "POLICIESCLOSE",
  UWREASONSOPEN:  "UWREASONSOPEN",
  UWREASONSCLOSE: "UWREASONSCLOSE",
  };

  //Initial State defined



export const initialValues: AfiScrStateType = {
  PolicyID :"",
  Reason :"",
  RequestedDate :"",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
// *** Attention: Check initial value below ***
  policiesOpen: false,
  uwreasonsOpen: false,
  };

  //Columns Defined to Pass into the Custom Table



export const columns = [ 
  {
    field: "PolicyID",
    header: "Policy Number",
    dbField: "policy_id",
  },
  {
    field: "Reason",
    header: "Reason Description",
    dbField: "Reason",
  },
  {
    field: "RequestedDate",
    header: "Effective Date",
    dbField: "requested_date",
    type: "date",
  },
  ];
