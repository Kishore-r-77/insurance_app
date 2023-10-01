import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField, Tooltip } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { IlpPricesStateType } from "../../reducerUtilities/types/ilpPrices/ilpPricesTypes";
import { useAppSelector } from "../../redux/app/hooks";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import GradingIcon from "@mui/icons-material/Grading";
import axios from "axios";
import moment from "moment";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/ilpPrices/ilpPricesActions";
import Notification from "../../utilities/Notification/Notification";
import NotificationModal from "../../utilities/modal/NotificationModal";
import IlpPricesTable from "./IlpPricesTable";
import BulkApprovalModal from "./approvalModal/BulkApprovalModal";
import styles from "./ilpPrices.module.css";
import {
  addApi,
  approveApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./ilpPricesApis/ilpPricesApis";
import IlpPricesModal from "./ilpPricesModal/IlpPricesModal";

function IlpPrices({ modalFunc }: any) {
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

  const [p0061Data, setp0061Data] = useState<any>({});
  const [effectiveDate, seteffectiveDate] = useState("");
  const [ilpPriceData, setilpPriceData] = useState([]);
  const [ilpPriceArray, setilpPriceArray] = useState<any>([]);
  const [isApprove, setisApprove] = useState(false);

  const reducer = (state: IlpPricesStateType, action: any) => {
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
      case ACTIONS.BULK_APPROVEOPEN:
        // setRecord(action.payload);
        return {
          ...state,
          bulkApproveOpen: true,
        };
      case ACTIONS.BULK_APPROVECLOSE:
        seteffectiveDate("");
        setilpPriceData([]);
        setisApprove(false);
        return {
          ...state,
          bulkApproveOpen: false,
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
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        setData(resp.data["Ilp Prices"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["Ilp Prices"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId, p0061Data)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `${resp?.data?.Result}`,
          type: "success",
        });
        dispatch({ type: ACTIONS.ADDCLOSE });
        setp0061Data({});
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

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        dispatch({ type: ACTIONS.EDITCLOSE });
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

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "error",
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

  const IlpPriceApproval = () => {
    return approveApi(
      record.FundEffDate,
      parseInt(record.FundSeqno),
      record.FundCode
    )
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `Approved Successfully: ${resp?.data?.Approved}`,
          type: "success",
        });
        dispatch({ type: ACTIONS.APPROVECLOSE });
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

  //Bulk Approval Check
  const approvalCheck = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/ilpservices/ilpPricesBulkApproval`,
        {
          Function: "Check",
          EffDate: moment(effectiveDate).format("YYYYMMDD"),
          IlpPrices: [],
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setilpPriceData(resp.data?.IlpPrices);
        setilpPriceArray(resp.data?.IlpPrices);
        setisApprove(true);
      })
      .catch((err) => err.message);
  };

  const approvalSave = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/ilpservices/ilpPricesBulkApproval`,
        {
          Function: "Approve",
          EffDate: moment(effectiveDate).format("YYYYMMDD"),
          IlpPrices: ilpPriceArray,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setisApprove(false);
        seteffectiveDate("");
        setilpPriceArray([]);
        setNotify({
          isOpen: true,
          message: resp.data.Result,
          type: "success",
        });

        getData();
        dispatch({ type: ACTIONS.BULK_APPROVECLOSE });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.response.data.error,
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
              <MenuItem key={value?.fieldName} value={value?.fieldName}>
                {value?.displayName}
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
        <h1>IlpPrices</h1>
        <Tooltip title="Bulk Approval">
          <Button
            style={{
              marginTop: "1rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
            variant="contained"
            color="success"
            onClick={() => dispatch({ type: ACTIONS.BULK_APPROVEOPEN })}
          >
            <GradingIcon />
          </Button>
        </Tooltip>
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
      <IlpPricesTable
        data={data}
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
      <IlpPricesModal
        state={state}
        record={record}
        p0061Data={p0061Data}
        setp0061Data={setp0061Data}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
      <NotificationModal
        open={state.approveOpen}
        title="Approve Confirmation"
        handleClose={() => dispatch({ type: ACTIONS.APPROVECLOSE })}
        handleFormSubmit={IlpPriceApproval}
        isCentered={false}
      >
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <h2>Are you Sure you want to Approve?</h2>
          <CheckCircleIcon color="success" fontSize="large" />
        </div>
      </NotificationModal>
      <Notification notify={notify} setNotify={setNotify} />

      {/* Calling the Bulk Approval Modal */}
      <BulkApprovalModal
        handleClose={() => dispatch({ type: ACTIONS.BULK_APPROVECLOSE })}
        open={state.bulkApproveOpen}
        getData={getData}
        effectiveDate={effectiveDate}
        ilpPriceData={ilpPriceData}
        ilpPriceArray={ilpPriceArray}
        isApprove={isApprove}
        approvalCheck={approvalCheck}
        approvalSave={approvalSave}
        setilpPriceArray={setilpPriceArray}
        seteffectiveDate={seteffectiveDate}
      />
    </div>
  );
}
export default IlpPrices;
