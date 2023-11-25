import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/payments/paymentsActions";
import { PaymentsStateType } from "../../reducerUtilities/types/payments/paymentsTypes";
import { useAppSelector } from "../../redux/app/hooks";
import Notification from "../../utilities/Notification/Notification";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import { useBusinessDate } from "../contexts/BusinessDateContext";
import styles from "./payments.module.css";
import {
  addApi,
  approveApi,
  getAllApi,
  rejectionApi,
} from "./paymentsApis/paymentsApis";
import PaymentsModal from "./paymentsModal/PaymentsModal";
import ApprovalModal from "./paymentsModal/approvalModal";
import PaymentsTable from "./paymentsTable/PaymentsTable";

function Payments({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

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
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["All Payments"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Payments"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const userId = useAppSelector((state) => state.users.user.message.id);

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PaymentsStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case ACTIONS.APPROVECHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          approveOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          ReconciledDate: businessDate,
          addOpen: true,
        };
      // case ACTIONS.EDITOPEN:
      //   setRecord(action.payload);
      //   return {
      //     ...state,
      //     editOpen: true,
      //   };

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
          addOpen: false,
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
      case ACTIONS.ADDRESSOPEN:
        return {
          ...state,
          addressOpen: true,
        };
      case ACTIONS.ADDRESSCLOSE:
        return {
          ...state,
          PRCD: "",
          PReceivedDate: "",
          addressOpen: false,
        };
      case ACTIONS.APPROVEOPEN:
        setRecord(action.payload);
        return {
          ...state,
          approveOpen: true,
        };
      case ACTIONS.APPROVECLOSE:
        return {
          ...state,
          approveOpen: false,
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

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const id = useAppSelector((state) => state.users.user.message.id);
  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId, id)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created:${resp.data["Payment Created"]}`,
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

  //ApproveApi
  const ApproveSubmit = async () => {
    approveApi(record, id)
      .then((resp) => {
        dispatch({ type: ACTIONS.APPROVECLOSE });
        setNotify({
          isOpen: true,
          message: `Updated Successfully`,
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

  //RejectionApi
  const RejectSubmit = async () => {
    rejectionApi(record, id)
      .then((resp) => {
        dispatch({ type: ACTIONS.APPROVECLOSE });
        setNotify({
          isOpen: true,
          message: `Updated Successfully`,
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
        <h1>Payments</h1>
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
      <PaymentsTable
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
      <PaymentsModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={handleFormSubmit}
        ACTIONS={ACTIONS}
        searchContent={searchContent}
        handleSearchChange={handleSearchChange}
        RejectSubmit={RejectSubmit}
        ApproveSubmit={ApproveSubmit}
      />
      <ApprovalModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={handleFormSubmit}
        ACTIONS={ACTIONS}
        searchContent={searchContent}
        handleSearchChange={handleSearchChange}
        RejectSubmit={RejectSubmit}
        ApproveSubmit={ApproveSubmit}
        //getData={getData}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default Payments;
