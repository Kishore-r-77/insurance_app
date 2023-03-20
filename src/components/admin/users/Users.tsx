import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useReducer, useState } from "react";
import { usersStateType } from "../../../reducerUtilities/types/admin/users/usersTypes";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./users.module.css";
import {
  initialValues,
  columns,
  ACTIONS,
} from "../../../reducerUtilities/actions/admin/users/usersActions";
import { getAllApi } from "./usersApis/usersApis";

function Users({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: usersStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);

  //Columns Defined to Pass into the Custom Table

  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);

  //Get all Api
  const getData = () => {
    getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        setData(resp.data["All Users"]);
        setisLast(resp.data["All Users"].length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  const nexPage = () => {
    setpageNum((prev) => prev + 1);
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageNum > 1) {
      setpageNum((prev) => prev - 1);
    } else return;
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  return (
    <div>
      <header className={styles.flexStyle}>
        {/* <span>
          <TextField
            select
            value={state.searchCriteria}
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.ONCHANGE,
                payload: e.target.value,
                fieldName: "searchCriteria",
              })
            }
            style={{ width: "12rem" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fieldMap.map((value: any) => (
              <MenuItem key={value.fieldName} value={value.fieldName}>
                {value.displayName}
              </MenuItem>
            ))}
          </TextField>
        </span> */}
        <span className={styles["text-fields"]}>
          <TextField
            value={state.searchString}
            placeholder="Search String"
            label="Search String"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.ONCHANGE,
                payload: e.target.value,
                fieldName: "searchString",
              })
            }
            style={{ width: "12rem" }}
          />
          <Button
            variant="contained"
            onClick={getData}
            color="primary"
            style={{
              marginTop: "0.5rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              backgroundColor: "#0a3161",
              marginLeft: "10px",
            }}
          >
            <SearchIcon />
          </Button>
        </span>

        <h1>Users</h1>
      </header>
      <CustomTable
        data={data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      />
      <CustomPagination
        pageNum={pageNum}
        setpageSize={setpageSize}
        isLast={isLast}
        prevPage={prevPage}
        nexPage={nexPage}
      />
    </div>
  );
}

export default Users;
