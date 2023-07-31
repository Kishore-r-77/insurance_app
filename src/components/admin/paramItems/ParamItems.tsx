import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { getData } from "../../../services/http-service";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/admin/params/paramItemsActions";
import { ParamItemsStateType } from "../../../reducerUtilities/types/admin/params/paramItemsTypes";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./paramitems.module.css";
import ParamItemModal from "./ParamItemModal";
import CustomHeaderTable from "../../../utilities/Table/customHeaderTable";

function ParamItems() {
  //data from getall api

  const {
    sendRequest: sendScreenGetRequest,
    status: screenGetStatus,
    data: getScreenResponse,
    error: screenGetError,
  } = useHttp(getData, true);

  const [pageAndSearch, setPageAndSearch] = useState({
    pageNum: 1,
    pageSize: 15,
    searchString: "",
    searchCriteria: "item",
    sortColumn: "item",
    sortDirection: "asc",
    firstTime: true,
    getAllInstances : false,
  });

  const [tableColumns, setTableColumns] = useState(columns);

  
  const [searchparams] = useSearchParams();

  useEffect(() => {
    let getDataParams = {
      ...pageAndSearch,
      companyId: searchparams.get("companyId"),
      name: searchparams.get("name"),
      languageId: searchparams.get("languageId"),
    };

    sendScreenGetRequest({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });
  }, [sendScreenGetRequest, pageAndSearch]);

  const totalRecords =
    !screenGetError && screenGetStatus === "completed"
      ? getScreenResponse.paginationData.totalRecords
      : 0;
  const lastPage = Math.ceil(totalRecords / pageAndSearch.pageSize);
  const isLast = lastPage === pageAndSearch.pageNum;

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: ParamItemsStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.EDITCHANGE:
        console.log(action.fieldName, "fieldName");
        console.log(action.payload, "payload");
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        setRecord({
          companyId: searchparams.get("companyId"),
          name: searchparams.get("name"),
          languageId: searchparams.get("languageId"),
          type: getScreenResponse.paramType,
        });
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

      case ACTIONS.DELOPEN:
        setRecord(action.payload);
        return {
          ...state,
          deleteOpen: true,
        };

      case ACTIONS.ADDCLOSE:
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
      case ACTIONS.DELCLOSE:
        return {
          ...state,
          deleteOpen: false,
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
  const [state, dispatch] = useReducer(reducer, {
    ...initialValues,
    sortColumn: "item",
    sortAsc: true,
    sortDesc: false,
  });

  useEffect(() => {
    const sortDirec = state.sortAsc ? "asc" : state.sortDesc ? "desc" : "asc";
    if (
      sortDirec !== pageAndSearch.sortDirection ||
      state.sortColumn !== pageAndSearch.sortColumn
    ) {
      setPageAndSearch((prevState) => ({
        ...prevState,
        sortColumn: state.sortColumn,
        sortDirection: sortDirec,
      }));
    }
  }, [state.sortAsc, state.sortDesc, state.sortColumn]);

  const pageSizeChangeHandler = (value: number) => {
    setPageAndSearch((prevState) => ({ ...prevState, pageSize: value }));
  };

  const nexPage = () => {
    if (pageAndSearch.pageNum < lastPage) {
      setPageAndSearch((prevState) => ({
        ...prevState,
        pageNum: prevState.pageNum + 1,
      }));
    }
  };

  //Pagination Function to navigate to Previous page
  const prevPage = () => {
    if (pageAndSearch.pageNum > 1) {
      setPageAndSearch((prevState) => ({
        ...prevState,
        pageNum: prevState.pageNum - 1,
      }));
    } else return;
  };

  const data =
    !screenGetError && screenGetStatus === "completed"
      ? getScreenResponse.data.map((ob: any) => ({
          ...ob,
          ID:
            ob.companyId + "," + ob.name + "," + ob.item + "," + ob.languageId+","+ob.seqno,
        }))
      : [];

  const modalFunc = () => {
    console.log("modal func");
  };

  const hardDelete = (id: any) => {
    const colarray = id.split(",");
    const row = {
      companyId: colarray[0],
      name: colarray[1],
      item: colarray[2],
      languageId: colarray[3],
    };
    dispatch({ type: ACTIONS.DELOPEN, payload: row });
  };
  const handleModal = (params: any) => {
    if (params.data.mode === "create") {
      dispatch({ type: ACTIONS.ADDCLOSE });
    }

    if (params.data.mode === "update") {
      dispatch({ type: ACTIONS.EDITCLOSE });
    }

    if (params.data.mode === "delete") {
      dispatch({ type: ACTIONS.DELCLOSE });
    }

    //if data was modified in modal, rfresh the data from server
    if (params.status === "save") {
      let getDataParams = {
        ...pageAndSearch,
        companyId: searchparams.get("companyId"),
        name: searchparams.get("name"),
        languageId: searchparams.get("languageId"),
      };

      sendScreenGetRequest({
        apiUrlPathSuffix: "/basicservices/paramItems",
        getDataParams: getDataParams,
      });
    }
  };
  const navigate = useNavigate();

  const navigateToLink = (params: any) => {
    navigate({
      pathname: params.link,
      search: createSearchParams(params.searchParams).toString(),
    });
  };

  if (state.infoOpen && record.item && getScreenResponse.paramType !== "0") {
    dispatch({ type: ACTIONS.INFOCLOSE });

    navigateToLink({
      link: "/paramData",
      searchParams: {
        companyId: record.companyId,
        name: record.name,
        languageId: record.languageId,
        item: record.item,
        seqno: record.seqno
      },
    });
  }

  return (
    <div>
      <header className={styles.flexStyle}>
        <span>
          <TextField
            select
            value={pageAndSearch.searchCriteria}
            placeholder="Search Criteria"
            label="Search Criteria"
            onChange={(e) =>
              setPageAndSearch((prevState) => ({
                ...prevState,
                searchCriteria: e.target.value,
              }))
            }
            style={{ width: "12rem" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {screenGetStatus === "completed" &&
              !screenGetError &&
              getScreenResponse.fieldMapping.map((value: any) => (
                <MenuItem key={value.fieldName} value={value.fieldName}>
                  {value.displayName}
                </MenuItem>
              ))}
          </TextField>
        </span>
        <span className={styles["text-fields"]}>
          <TextField
            value={pageAndSearch.searchString}
            placeholder="Search String"
            label="Search String"
            onChange={(e) =>
              setPageAndSearch((prevState) => ({
                ...prevState,
                searchString: e.target.value,
              }))
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

        <h1>Param Items</h1>
        {getScreenResponse?.paramType === "D" &&
        <FormControlLabel
        style={{
          marginTop: ".9rem",
         
        }}
        control={
          <Checkbox
           checked = {pageAndSearch.getAllInstances}

           onChange={e => {
            setPageAndSearch((prevState) => ({ ...prevState, getAllInstances: e.target.checked }));
            if(e.target.checked)
            {
            setTableColumns((prevState) => ([ ...prevState, 
              {
                field: "startDate",
                header: "Start Date",
                dbField: "start_date",
                sortable: true,
              },
            
              {
                field: "endDate",
                header: "End Date",
                dbField: "end_date",
                sortable: true,
              },
            
              {
                field: "seqno",
                header: "Seq Num",
                dbField: "seqno",
                sortable: true,
              }
            
            ]))
            }
            else
            {

              setTableColumns((prevState) => (
                prevState.filter(
                  (value: any) => value.field !== "startDate" && value.field !== "endDate" && value.field !== "seqno"
                )

              ))
            }


          }}
           
          />
        }
        label="Show All Dates"
      />
}
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
          onClick={() => {
            navigateToLink({ link: "/params" });
          }}
        >
          <ArrowBackIcon />
        </Button>
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

      <CustomHeaderTable  data={new Array("Company: "+ searchparams.get("companyId"), "Param Name: "+ searchparams.get("name"), "Param Description: "+getScreenResponse?.paramLongDesc) } />


      {screenGetStatus === "completed" && !screenGetError && (
        <>
          <CustomTable
            data={data}
            columns={tableColumns}
            ACTIONS={ACTIONS}
            sortParam={{
              fieldName: pageAndSearch.sortColumn,
              order: pageAndSearch.sortDirection,
            }}
            dispatch={dispatch}
            modalFunc={modalFunc}
            hardDelete={hardDelete}
          />
          <CustomPagination
            pageNum={pageAndSearch.pageNum}
            setpageSize={pageSizeChangeHandler}
            // totalPages={totalPages}
            totalRecords={totalRecords}
            pageSize={pageAndSearch.pageSize}
            isLast={isLast}
            prevPage={prevPage}
            nexPage={nexPage}
          />

          <ParamItemModal
            show={state.addOpen || state.editOpen || state.deleteOpen}
            handleModal={handleModal}
            data={{
              ...record,
              mode: state.addOpen
                ? "create"
                : state.editOpen
                ? "update"
                : state.deleteOpen
                ? "delete"
                : "display",
            }}
          />
        </>
      )}

      {screenGetStatus === "pending" && (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10%" }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {screenGetError && screenGetStatus === "completed" && (
        <div
          className="alert alert-danger"
          style={{ fontSize: "95%", padding: "0rem" }}
        >
          <strong>Failed to get data!</strong>
          <span className="pl-1">{screenGetError}</span>
        </div>
      )}
    </div>
  );
}

export default ParamItems;
