import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/admin/companies/companiesActions";
import { CompaniesStateType } from "../../../reducerUtilities/types/admin/companies/companiesTypes";
import CustomPagination from "../../../utilities/Pagination/CustomPagination";
import CustomTable from "../../../utilities/Table/CustomTable";
import styles from "./companies.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
  getAllCurrencyApi,
  getAllCompStatusApi,
} from "./companiesApis/companiesApis";
import CompaniesModal from "./companiesModal/CompaniesModal";
import Notification from "../../../utilities/Notification/Notification";

function Companies({ userORGroupFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);
  const [currencydata, setcurrencyData] = useState([]);
  const [cmpStatusdata, setcmpStatusData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Function for Conversion of Base64
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: CompaniesStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        if (action.fieldName === "CompanyLogo") {
          convertBase64(action.payload).then((resp) => {
            console.log(resp, "Logo");
            return {
              ...state,
              CompanyLogo: resp,
            };
          });
        } else
          return {
            ...state,
            [action.fieldName]: action.payload,
          };

        return {
          ...state,
          addOpen: true,
        };

      case ACTIONS.EDITCHANGE:
        if (action.fieldName === "CompanyLogo") {
          convertBase64(action.payload).then((base64) => {
            setRecord((prev: any) => ({
              ...prev,
              [action.fieldName]: base64,
            }));
          });
        } else
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
        setData(resp.data["All Companies"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Companies"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  //Get Currency all Api
  const getCurrencyData = () => {
    return getAllCurrencyApi()
      .then((resp) => {
        setcurrencyData(resp.data["currencies"]);
      })
      .catch((err) => console.log(err.message));
  };

  //Get CompanyStatus all Api
  const getCompStatusData = () => {
    return getAllCompStatusApi()
      .then((resp) => {
        setcmpStatusData(resp.data["All Status"]);
      })
      .catch((err) => console.log(err.message));
  };

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created: ${resp?.data?.Result}`,
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

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `Updated:${resp.data?.outputs?.ID}`,
          type: "success",
        });
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

  useEffect(() => {
    getCurrencyData();
    getCompStatusData();
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

        <h1>Companies</h1>
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
        userORGroupFunc={userORGroupFunc}
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
      <CompaniesModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
        currencydata={currencydata}
        cmpStatusdata={cmpStatusdata}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Companies;
