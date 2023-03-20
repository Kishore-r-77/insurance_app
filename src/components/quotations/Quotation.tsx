import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomTable from "../../utilities/Table/CustomTable";
import { useAppSelector } from "../../redux/app/hooks";
// ***  Attention : Check the import below and change it if required ***
import { QuotationStateType } from "../../reducerUtilities/types/quotations/quotationTypes";
import QuotationModal from "./quotationsModal/QuotationModal";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/quotations/quotationActions";
import styles from "./quotations.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./quationsApis/quotationApis";

function Quotation({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: QuotationStateType, action: any) => {
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
      case ACTIONS.QHEADERSOPEN:
        return {
          ...state,
          qHeadersOpen: true,
        };
      case ACTIONS.QHEADERSCLOSE:
        return {
          ...state,
          qHeadersOpen: false,
        };

      // *** Attention: Check the Lookup Open /close ***
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

      // *** Attention: Check the Lookup Open /close ***
      case ACTIONS.QDETAILSOPEN:
        return {
          ...state,
          qDetailsOpen: true,
        };
      case ACTIONS.QDETAILSCLOSE:
        return {
          ...state,
          qDetailsOpen: false,
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
        console.log(resp);
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["All Quotations"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Quotations"]?.length === 0);
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
        console.log(resp);
        dispatch({ type: ACTIONS.ADDCLOSE });
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
      })
      .catch((err) => console.log(err.message));
  };

  //Hard Delete Api
  const hardDelete = async (id: number) => {
    deleteApi(id)
      .then((resp) => {
        console.log(resp);
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
        <h1>Quotations</h1>
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
      <QuotationModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
    </div>
  );
}
export default Quotation;
