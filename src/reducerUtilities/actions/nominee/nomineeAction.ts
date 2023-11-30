//Attention: Check the path below and change it if required
import { NomineeStateType } from "../../types/nominee/nomineeType";
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
  CLIENTOPEN: "CLIENTOPEN",
  CLIENTCLOSE: "CLIENTCLOSE",
  NOMINEEOPEN: "NOMINEEOPEN",
  NOMINEECLOSE: "NOMINEECLOSE",
  NOMINEECLIENTOPEN: "NOMINEECLIENTOPEN",
  NOMINEECLIENTCLOSE: "NOMINEECLIENTCLOSE",
};

//Initial State defined

export const initialValues: NomineeStateType = {
  PolicyID: "",
  ClientID: "",
  NomineeRelationship: "",
  NomineeLongName: "",
  NomineePercentage: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  nomineeClientOpen: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  policyOpen: false,
  clientOpen: false,
  nomineeOpen: false,
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
    field: "NomineeLongName",
    header: "Nominee Full Name",
    dbField: "nominee_long_name",
  },

  {
    field: "NomineeRelationship",
    header: "Nominee Relationship",
    dbField: "nominee_relationship",
  },

  {
    field: "NomineePercentage",
    header: "Nominee Percentage",
    dbField: "nominee_percentage",
  },
];
