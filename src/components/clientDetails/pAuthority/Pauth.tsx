import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { BankStateType } from "../../../reducerUtilities/types/bank/bankTypes";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./pAuth.module.css";
import { addApi, deleteApi, editApi, getAllApi } from "./pauthApis/pAuthApis";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/clientDetails/pa/paAction";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import { pAStateType } from "../../../reducerUtilities/types/pa/paTypes";
import PauthModal from "./pAuthModal/pAuthModal";
import ReceiptPaAuth from "./receipt/ReceiptPaAuth";
import PauthTable from "./pAuthTable/PauthTable";

function PAuth({
  bankClntData,
  lookup,
  payauthLookup,
  modalFunc,
  getByTable,
  getByFunction,
  searchContent,
  handleSearchChange,
  payauthFieldMap,
}: any) {
  //data from getall api
  const [data, setData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: pAStateType, action: any) => {
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
      case ACTIONS.RECEIPTOPEN:
        setRecord(action.payload);
        return {
          ...state,
          receiptOpen: true,
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
      case ACTIONS.RECEIPTCLOSE:
        return {
          ...state,
          receiptOpen: false,
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
      case ACTIONS.ADDRESSOPEN:
        return {
          ...state,
          addressOpen: true,
        };
      case ACTIONS.ADDRESSCLOSE:
        return {
          ...state,
          addressOpen: false,
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

  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [totalRecords, settotalRecords] = useState(0);
  const [isLast, setisLast] = useState(false);
  const [fieldMap, setfieldMap] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        setData(resp.data["All PAs"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All PAs"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        getData();
        setNotify({
          isOpen: true,
          message: `Created:Record ${resp?.data?.Result}`,
          type: "success",
        });
      })

      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        getData();
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
    if (payauthLookup) {
      getByFunction(pageNum, pageSize, searchContent);
    } else {
      getData();
    }
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  return (
    <div>
      <header className={styles.flexStyle}>
        <span>
          <TextField
            select
            value={
              payauthLookup
                ? searchContent.searchCriteria
                : state.searchCriteria
            }
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={
              payauthLookup
                ? (e) => handleSearchChange(e)
                : (e) =>
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
            {payauthLookup
              ? payauthFieldMap?.map((value: any) => (
                  <MenuItem key={value.fieldName} value={value.fieldName}>
                    {value.displayName}
                  </MenuItem>
                ))
              : fieldMap.map((value: any) => (
                  <MenuItem key={value.fieldName} value={value.fieldName}>
                    {value.displayName}
                  </MenuItem>
                ))}
          </TextField>
        </span>
        <span className={styles["text-fields"]}>
          <TextField
            value={
              payauthLookup ? searchContent.searchCriteria : state.searchString
            }
            placeholder="Search String"
            label="Search String"
            onChange={
              payauthLookup
                ? (e) => handleSearchChange(e)
                : (e) =>
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
            onClick={
              payauthLookup
                ? () => getByFunction(pageNum, pageSize, searchContent)
                : getData
            }
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

        <h1>PayingAuthority</h1>
        {payauthLookup ? null : (
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
        )}
      </header>
      <PauthTable
        data={payauthLookup ? getByTable : data}
        payauthLookup={payauthLookup}
        dataIndex={data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
        showReceipt={true}
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
      <PauthModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
      <ReceiptPaAuth
        state={state}
        record={record}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
        handleFormSubmit={handleFormSubmit}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default PAuth;
