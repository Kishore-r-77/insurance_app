// import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import Notification from "../../utilities/Notification/Notification";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import { useBusinessDate } from "../contexts/BusinessDateContext";
import styles from "./ssi.module.css";
import SsiTable from "./ssiTable/SsiTable";
import { SsiStateType } from "../../reducerUtilities/types/ssi/ssiTypes";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/ssi/ssiAction";
import { getAllApi } from "./ssiApis/ssiApis";
import ReconcileModal from "./ssiModal/ssiReconcile/ReconcileModal";
import axios from "axios";
import SsiApproveModal from "./ssiModal/ssiApproval/SsiApproveModal";

function Ssi({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  console.log(record, "bharani");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { businessDate } = useBusinessDate();
  const [searchContent, setsearchContent] = useState({
    searchString: "",
    searchCriteria: "",
  });
  //   //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        setData(resp.data["All Pabillsum"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Pabillsum"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const userId = useAppSelector((state) => state.users.user.message.id);

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: SsiStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      // case ACTIONS.APPROVECHANGE:
      //   setRecord((prev: any) => ({
      //     ...prev,
      //     [action.fieldName]: action.payload,
      //   }));
      //   return {
      //     ...state,
      //     approveOpen: true,
      //   };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        return {
          ...state,
          infoOpen: true,
        };

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

      case ACTIONS.RECONOPEN:
        setRecord(action.payload);
        return {
          ...state,
          reconOpen: true,
        };
      case ACTIONS.RECONCLOSE:
        return {
          ...state,
          reconOpen: false,
        };

      case ACTIONS.SSIAPPROVEOPEN:
        setRecord(action.payload);

        return {
          ...state,
          ssiapproveOpen: true,
        };

      case ACTIONS.SSIAPPROVECLOSE:
        return {
          ...state,
          ssiapproveOpen: false,
        };

      // case ACTIONS.APPROVEOPEN:
      //   setRecord(action.payload);
      //   console.log("approveOpen:", state.approveOpen);
      //   return {
      //     ...state,
      //     approveOpen: true,
      //   };

      // case ACTIONS.APPROVECLOSE:
      //   return {
      //     ...state,
      //     approveOpen: false,
      //   };

      default:
        return initialValues;
        console.log(state.ssiapproveOpen, "aaaaaaa");
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);
  console.log(state.ssiapproveOpen, "ssiapprove");
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const id = useAppSelector((state) => state.users.user.message.id);

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
    setsearchContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    console.log("approveOpen:", state.ssiapproveOpen);

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
        <h1>SSI</h1>
      </header>
      <SsiTable
        data={data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
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
      <ReconcileModal
        state={state}
        record={record}
        dispatch={dispatch}
        // handleFormSubmit={handleFormSubmit}
        ACTIONS={ACTIONS}
        searchContent={searchContent}
        handleSearchChange={handleSearchChange}
      />
      <SsiApproveModal
        state={state}
        record={record}
        dispatch={dispatch}
        // handleFormSubmit={handleFormSubmit}
        ACTIONS={ACTIONS}
        searchContent={searchContent}
        handleSearchChange={handleSearchChange}
      />

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default Ssi;
