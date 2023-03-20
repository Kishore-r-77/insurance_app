//Attention: Check the path below and change it if required
import { LevelsStateType } from "../../types/levels/levelsTypes";
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
  LEVELSOPEN: "LEVELSOPEN",
  LEVELSCLOSE: "LEVELSCLOSE",
};

//Initial State defined

export const initialValues: LevelsStateType = {
  CompanyID: "",
  ShortCode: "",
  LongName: "",
  LevelCode: "",
  LevelID: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
  // *** Attention: Check initial value below ***
  levelsOpen: false,
};

//Columns Defined to Pass into the Custom Table

export const columns = [
  { field: "ID", header: "ID", dbField: "id" },

  {
    field: "ShortCode",
    header: "Short code",
    dbField: "short_code",
  },
  {
    field: "LongName",
    header: "Office",
    dbField: "long_name",
  },
  {
    field: "LevelCode",
    header: "Parent Code",
    dbField: "level_code",
  },
  {
    field: "LevelID",
    header: "Parent Level ID",
    dbField: "level_id",
  },
];
