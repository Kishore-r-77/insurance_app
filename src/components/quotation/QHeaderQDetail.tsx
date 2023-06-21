import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomTable from "../../utilities/Table/CustomTable";
import { useAppSelector } from "../../redux/app/hooks";

// ***  Attention : Check the import below and change it if required ***
import { QHeaderStateType } from "../../reducerUtilities/types/quotation/qHeader/qHeaderTypes";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/quotation/qHeader/qHeaderActions";
import styles from "./qHeaderqDetail.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
  getQheader,
  getAllQDetailByQheaderApi,
} from "./qHeaderApis/qHeaderApis";
// import { editClickOpen } from "./qHeaderApis/qHeaderqDetailApis";
//import QDetail from "../qDetail/QDetail";
import QHeaderTable from "./qHeaderTable/QHeaderTable";
import QHeaderQDetailModal from "./qHeaderqDetailModal/QHeaderQDetailModal";
import QHeaderQDetailEnquiry from "./QHeaderQDetailEnquiry/QHeaderQDetailEnquiry";
import axios from "axios";
//import QHeaderQDetailModal  from "./QHeaderQDetailModal/QHeaderQDetailModal";
//import QHeader FullModal from "./qHeaderFullModal/QHeaderFullModal";

function QHeaderQDetail({ modalFunc, dataIndex, setNotify }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: QHeaderStateType, action: any) => {
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

      // *** Attention: Check the Open /close ***
      // case ACTIONS.QDETAILOPEN:
      //   setRecord(action.payload);
      //   return {
      //     ...state,
      //     qDetailOpen: true,
      //   };
      // case ACTIONS.QDETAILCLOSE:
      //   return {
      //     ...state,
      //     qDetailOpen: false,
      //   };
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
      case ACTIONS.AGENCYOPEN:
        return {
          ...state,
          agencyOpen: true,
        };
      case ACTIONS.AGENCYCLOSE:
        return {
          ...state,
          agencyOpen: false,
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
    editApi(record.ID)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
      })
      .catch((err) => console.log(err.message));
  };
  console.log(record, "record");

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        console.log(resp);
        getData();
      })
      .catch((err) => console.log(err.message));
  };
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        console.log(resp);
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["All QHeaders"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All QHeaders"]?.length === 0);
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
  const [qStatusCheckData, setQStatusCheckData] = useState<any>();
  const handleForm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/quotationservices/qstatuscheck`,
        {
          CompanyID: parseInt(companyId),
          QStatus: "",
          QuoteDate: "20230402",
          TranCode: "Q0023",
        },
        { withCredentials: true }
      );
      console.log(response);
      setQStatusCheckData(initialValues);
      setNotify({
        isOpen: true,
        message: "Status Checked",
        type: "success",
      });
      return {
        response,
        status: response.status,
      };
    } catch (err: any) {
      console.log(err);
      return {
        response: err,
        status: err.response.status,
      };
    }
  };
  useEffect(() => {
    handleForm();

    return () => {};
  }, []);

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
        <h1>Quotation</h1>
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
          <AddBoxIcon onClick={() => handleForm()} />
        </Button>
      </header>{" "}
      <QHeaderTable
        data={data}
        getData={getData}
        dataIndex={dataIndex}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        hardDelete={hardDelete}
        editForm={editApi}
        initialValues={initialValues}
        record={record}
        state={state}
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
      <QHeaderQDetailModal
        state={state}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        getData={getData}
        record={record}
      />
      <QHeaderQDetailEnquiry
        state={state}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        getData={getData}
        record={record}
        getQheader={getQheader}
        getAllQDetail={getAllQDetailByQheaderApi}
      />
      {/* <CustomModal
        open={state.qDetailOpen}
        handleClose={() => dispatch({ type: ACTIONS.QDETAILCLOSE })}
      >
        <QDetail
          qDetailByQHeaderData={qDetailByQHeaderData}
          lookup={state.qDetailOpen}
        />
      </CustomModal> */}
    </div>
  );
}
export default QHeaderQDetail;
