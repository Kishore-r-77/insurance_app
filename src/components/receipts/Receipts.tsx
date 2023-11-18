import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomTable from "../../utilities/Table/CustomTable";
// ***  Attention : Check the import below and change it if required ***
import { ReceiptsStateType } from "../../reducerUtilities/types/receipts/receiptsTypes";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/receipts/receiptsActions";
import Notification from "../../utilities/Notification/Notification";
import { useBusinessDate } from "../contexts/BusinessDateContext";
import styles from "./receipts.module.css";
import { addApi, getAllApi } from "./receiptsApis/receiptsApis";
import ReceiptsModal from "./receiptsModal/ReceiptsModal";

function Receipts({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [searchContent, setsearchContent] = useState({
    searchString: "",
    searchCriteria: "id",
  });
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const { businessDate } = useBusinessDate();

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: ReceiptsStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case ACTIONS.ADDOPEN:
        return {
          ...state,
          DateOfCollection: businessDate,
          addOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        // setBusinessData({});
        return {
          ...state,
          PRCD: "",
          PReceivedDate: "",
          addOpen: false,
        };

      // case ACTIONS.EDITCLOSE:
      //   return {
      //     ...state,
      //     editOpen: false,
      //   };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
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

      // *** Attention: Check the Lookup Open /close ***
      case ACTIONS.CLIENTSOPEN:
        return {
          ...state,
          clientsOpen: true,
        };
      case ACTIONS.CLIENTSCLOSE:
        return {
          ...state,
          clientsOpen: false,
        };

      // *** Attention: Check the Lookup Open /close ***
      case ACTIONS.POLICIESOPEN:
        return {
          ...state,
          policiesOpen: true,
        };
      case ACTIONS.POLICIESCLOSE:
        setsearchContent({
          searchString: "",
          searchCriteria: "",
        });
        return {
          ...state,
          policiesOpen: false,
        };
      default:
        return initialValues;
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["All Receipts"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Receipts"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created:${resp.data["Receipt Created"]}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
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

  const handleSearchChange = (e: any) => {
    const { value, name } = e.target;
    console.log(name, value);
    setsearchContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  return (
    <div>
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
        <h1>Receipts</h1>
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
      </header>
      <CustomTable
        data={data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        // hardDelete={hardDelete}
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
      <ReceiptsModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={handleFormSubmit}
        ACTIONS={ACTIONS}
        searchContent={searchContent}
        handleSearchChange={handleSearchChange}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default Receipts;
