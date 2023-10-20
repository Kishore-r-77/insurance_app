import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import { useAppSelector } from "../../../redux/app/hooks";
import { DeathHStateType } from "../../../reducerUtilities/types/death/deathH/deathHTypes";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/death/deathH/deathHActions";
import styles from "./deathH.module.css";

import { getAllApi, getBusinessDateApi } from "./deathHApis/deathHApis";
import DeathHModal from "./deathHModal/DeathHModal";
import DeathHTable from "./deathHTable/DeathHTable";
import Notification from "../../../utilities/Notification/Notification";
import DeathHEnquiry from "./deathHModal/DeathHEnquiry";

function DeathH({ modalFunc, dataIndex, lookup, getByTable }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  //Reducer Function to be used inside UserReducer hook

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const reducer = (state: DeathHStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          EffectiveDate: businessData.BusinessDate,
          addOpen: true,
        };
      case ACTIONS.EDITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          editOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        console.log("Payload", action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        return {
          ...state,
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
        };

      case ACTIONS.CLIENTOPEN:
        return {
          ...state,
          clientOpen: true,
        };
      case ACTIONS.CLIENTCLOSE:
        return {
          ...state,
          clientOpen: false,
        };
      case ACTIONS.POLICYOPEN:
        return {
          ...state,
          policyOpen: true,
        };
      case ACTIONS.POLICYCLOSE:
        return {
          ...state,
          policyOpen: false,
        };
      case ACTIONS.COMMITOPEN:
        setNotify({
          isOpen: true,
          message: "Calculated Successfully",
          type: "success",
        });
        return {
          ...state,
          commitOpen: true,
        };
      case ACTIONS.COMMITCLOSE:
        return {
          ...state,
          Function: "Commit",
          commitOpen: false,
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
  const userId = useAppSelector((state) => state.users.user.message.id);
  const [businessData, setBusinessData] = useState<any>({});
  const getBusinessDate = (companyId: number, userId: number) => {
    return getBusinessDateApi(companyId, userId)
      .then((resp) => {
        setBusinessData(resp.data);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getBusinessDate(companyId, userId);
    return () => {};
  }, []);

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["AllDeath"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["AllDeath"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  const nexPage = () => {
    setpageNum((prev) => prev + 1);
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageNum > 1) {
      setpageNum((prev) => prev - 1);
    } else return;
  };

  return (
    <div style={{ width: "100%" }}>
      <header className={styles.flexStyle}>
        <span>
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
        </span>
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
        <h1>Death Header</h1>
        <Button
          id={styles["add-btn"]}
          style={{
            marginTop: "1rem",
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            backgroundColor: "#0a3161",
          }}
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: ACTIONS.ADDOPEN })}
        >
          <AddBoxIcon />
        </Button>
      </header>{" "}
      <DeathHTable
        data={lookup ? getByTable : data}
        dataIndex={dataIndex}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        getData={getData}
        setNotify={setNotify}
      />
      <CustomPagination
        pageNum={pageNum}
        setpageSize={setpageSize}
        // totalPages={totalPages}
        totalRecords={totalRecords}
        isLast={isLast}
        prevPage={prevPage}
        nexPage={nexPage}
      />
      <DeathHEnquiry
        state={state}
        record={record}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      />
      <DeathHModal
        state={state}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        getData={getData}
        notify={notify}
        setNotify={setNotify}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default DeathH;
