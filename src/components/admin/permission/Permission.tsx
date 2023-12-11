import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/admin/permissions/permissionActions";
import { PermissionStateType } from "../../../reducerUtilities/types/admin/permissions/permissionTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./permission.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./permissionApis/permissionApis";
import PermissionModal from "./permissionModal/PermissionModal";

function Permission() {
  //data from getall api
  const [data, setData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  const [userData, setUserData] = useState<any>("");
  const [userGroupData, setUserGroupData] = useState<any>("");
  const [userOrGroup, setUserOrGroup] = useState(
    record.UserID?.Valid ? "user" : record.UserGroupID?.Valid ? "userGroup" : ""
  );

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PermissionStateType, action: any) => {
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
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        setUserGroupData("");
        setUserData("");
        setUserOrGroup("");
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
      case ACTIONS.TRANSACTIONOPEN:
        return {
          ...state,
          transactionOpen: true,
        };
      case ACTIONS.TRANSACTIONCLOSE:
        return {
          ...state,
          transactionOpen: false,
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
      case ACTIONS.USEROPEN:
        return {
          ...state,
          userOpen: true,
        };
      case ACTIONS.USERCLOSE:
        return {
          ...state,
          userOpen: false,
        };
      case ACTIONS.USERGROUPOPEN:
        return {
          ...state,
          userGroupOpen: true,
        };
      case ACTIONS.USERGROUPCLOSE:
        return {
          ...state,
          userGroupOpen: false,
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
    getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        setData(resp.data["All Permissions"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Permissions"].length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const userBody = {
    CompanyID: companyId,
    ModelName: state.ModelName,
    Method: state.Method,
    TransactionID: state.TransactionID,
    UserID: {
      Int64: state.UserID,
      Valid: true,
    },
    UserGroupID: {
      Int64: 0,
      Valid: false,
    },
  };

  const userGroupBody = {
    CompanyID: companyId,
    ModelName: state.ModelName,
    Method: state.Method,
    TransactionID: state.TransactionID,
    UserID: {
      Int64: 0,
      Valid: false,
    },
    UserGroupID: {
      Int64: state.UserGroupID,
      Valid: true,
    },
    // Users: null,
    // Permissions: null,
  };

  const userBodyEdit = {
    ID: record.ID,
    CompanyID: companyId,
    ModelName: record.ModelName,
    Method: record.Method,
    TransactionID: record.TransactionID,
    UserID: {
      Int64: record.UserID?.Int64,
      Valid: true,
    },
    UserGroupID: {
      Int64: 0,
      Valid: false,
    },
  };

  const userGroupBodyEdit = {
    ID: record.ID,
    CompanyID: companyId,
    ModelName: record.ModelName,
    Method: record.Method,
    TransactionID: record.TransactionID,
    UserID: {
      Int64: 0,
      Valid: false,
    },
    UserGroupID: {
      Int64: record.UserGroupID?.Int64,
      Valid: true,
    },
    // Users: null,
    // Permissions: null,
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Add Api
  const handleFormSubmit = () => {
    if (state.userOrGroup === "user") {
      addApi(userBody)
        .then((resp) => {
          dispatch({ type: ACTIONS.ADDCLOSE });
          getData();
          setNotify({
            isOpen: true,
            message: "Created",
            type: "success",
          });
        })
        //.catch((err) => console.log(err.message));
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err?.response?.data?.error,
            type: "error",
          });
        });
    } else if (state.userOrGroup === "userGroup") {
      addApi(userGroupBody)
        .then((resp) => {
          dispatch({ type: ACTIONS.ADDCLOSE });
          getData();
          setNotify({
            isOpen: true,
            message: "Created",
            type: "success",
          });
        })
        //.catch((err) => console.log(err.message));
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err?.response?.data?.error,
            type: "error",
          });
        });
    }
  };

  //Edit Api
  const editFormSubmit = async () => {
    if (state.userOrGroup === "user") {
      editApi(userBodyEdit)
        .then((resp) => {
          dispatch({ type: ACTIONS.EDITCLOSE });
          getData();
          setNotify({
            isOpen: true,
            message: "Modified",
            type: "success",
          });
        })
        //.catch((err) => console.log(err.message));
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err?.response?.data?.error,
            type: "error",
          });
        });
    } else if (state.userOrGroup === "userGroup") {
      editApi(userGroupBodyEdit)
        .then((resp) => {
          dispatch({ type: ACTIONS.EDITCLOSE });
          getData();
          setNotify({
            isOpen: true,
            message: "Updated",
            type: "success",
          });
        })
        //.catch((err) => console.log(err.message));
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err?.response?.data?.error,
            type: "error",
          });
        });
    }
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        getData();
        setNotify({
          isOpen: true,
          message: "Deleted",
          type: "success",
        });
      })
      //.catch((err) => console.log(err.message));
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

        <h1>Permissions</h1>
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
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
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
      <PermissionModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
        userData={userData}
        setUserData={setUserData}
        userGroupData={userGroupData}
        setUserGroupData={setUserGroupData}
        userOrGroup={userOrGroup}
        setUserOrGroup={setUserOrGroup}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Permission;
