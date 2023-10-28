import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/clientDetails/client/clientActions";
import { ClientStateType } from "../../../reducerUtilities/types/client/clientTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import Address from "../address/Address";
import styles from "./client.module.css";
import { addApi, deleteApi, editApi, getAllApi } from "./clientApis/clientApis";
import { getAddressByClient } from "./clientApis/clientAddressApis";
import ClientFullModal from "./clientFullModal/ClientFullModal";
import ClientModal from "./clientModal/ClientModal";
import ClientTable from "./clientTable/ClientTable";
import Notification from "../../../utilities/Notification/Notification";

function Client({ modalFunc, dataIndex, lookup, getByTable }: any) {
  //data from getall api
  const [data, setData] = useState([]);

  const size = "xl";

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: ClientStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        console.log(action.payload, "Payloaddddd");
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
      case ACTIONS.ADDRESSOPEN:
        setRecord(action.payload);
        return {
          ...state,
          addressOpen: true,
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

  const [clientType, setclientType] = useState(record.ClientType);
  const handleradiochange = (event: any) => {
    setclientType(event.target.value);
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
        setData(resp.data["All Clients"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Clients"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api
  const handleFormSubmit = async () => {
    const resp = addApi(state, companyId);

    try {
      dispatch({ type: ACTIONS.ADDCLOSE });
      getData();
      return resp;
    } catch (err: any) {
      err.message;
    }
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
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

  const [addressByClientData, setaddressByClientData] = useState([]);

  const getAddressByClnt = (clientId: number) => {
    getAddressByClient(clientId)
      .then((resp) => {
        setaddressByClientData(resp.data?.AddressByClientID);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getAddressByClnt(record.ID);
    return () => {};
  }, [state.addressOpen]);

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

        <h1>Clients</h1>
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
      <ClientTable
        data={lookup ? getByTable : data}
        dataIndex={dataIndex}
        modalFunc={modalFunc}
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
      <ClientModal
        state={state}
        record={record}
        setRecord={setRecord}
        dispatch={dispatch}
        handleFormSubmit={editFormSubmit}
        clientType={clientType}
        handleradiochange={handleradiochange}
        ACTIONS={ACTIONS}
      />
      <ClientFullModal
        state={state}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
        getData={getData}
        notify={notify}
        setNotify={setNotify}
      />
      <CustomModal
        open={state.addressOpen}
        size={size}
        handleClose={() => dispatch({ type: ACTIONS.ADDRESSCLOSE })}
      >
        <Address
          addressByClientData={addressByClientData}
          lookup={state.addressOpen}
        />
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Client;
