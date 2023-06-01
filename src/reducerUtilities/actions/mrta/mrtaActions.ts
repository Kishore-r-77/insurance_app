
//Attention: Check the path below and change it if required 
import { MrtaStateType } from "../../types/mrta/mrtaTypes";
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



export const initialValues: MrtaStateType = {
  Benefitid       :"",
  PolicyID :"",
  Pproduct :"",
  Bcoverage       :"",
  Clientid        :"",
  Bstartdate :"",
  Bterm            :"",
  Prempayingterm  :"",
  Bsumassured :"",
  Interest        :"",
  Interimperiod   :"",
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
    field: "Benefitid      ",
    header: "Benefit ID",
    dbField: "BenefitID      ",
  },
  {
    field: "PolicyID",
    header: "Policy Number",
    dbField: "PolicyID",
  },
  {
    field: "Pproduct",
    header: "Product Code",
    dbField: "Pproduct",
  },
  {
    field: "Bcoverage      ",
    header: "Coverage Code",
    dbField: "BCoverage      ",
  },
  {
    field: "Clientid       ",
    header: "Client ID",
    dbField: "ClientID       ",
  },
  {
    field: "Bstartdate",
    header: "Start Date",
    dbField: "BStartDate",
    type: "date",
  },
  {
    field: "Bsumassured",
    header: "Initial Sum Assured",
    dbField: "BSumAssured",
  },
  ];
