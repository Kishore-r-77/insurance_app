import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/policy/policyActions";
import { PolicyStateType } from "../../reducerUtilities/types/policy/policyTypes";
import { useAppSelector } from "../../redux/app/hooks";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomTable from "../../utilities/Table/CustomTable";
import styles from "./newBusiness.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./newBusinessApis/newBusinessApis";
import PolicyModal from "./newBusinessModal/NewBusinessModal";
import NewBussinessTable from "./NewBussinessTable";
import axios from "axios";
import NotificationModal from "../../utilities/modal/NotificationModal";
import CustomModal from "../../utilities/modal/CustomModal";
import PolicyValidate from "./policyValidate/PolicyValidate";

function NewBusiness({ modalFunc }: any) {
  //data from getall api
  const [data, setData] = useState([]);

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PolicyStateType, action: any) => {
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
      case ACTIONS.BENEFITOPEN:
        return {
          ...state,
          benefitOpen: true,
        };
      case ACTIONS.BENEFITCLOSE:
        return {
          ...state,
          benefitOpen: false,
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
  const [isConfirm, setisConfirm] = useState(false);
  const [policyId, setPolicyId] = useState(0);
  const [validateData, setvalidateData] = useState([]);
  const [summaryData, setsummaryData] = useState([]);
  const [isPolicyValidate, setisPolicyValidate] = useState(false);
  const [isIssue, setisIssue] = useState(false);
  const [issueData, setissueData] = useState({});

  const policyvalidateOpen = () => {
    setisPolicyValidate(true);
  };

  const policyvalidateClose = () => {
    setisPolicyValidate(false);
  };

  const confirmOpen = (id: number) => {
    setPolicyId(id);
    setisConfirm(true);
  };

  const confirmClose = () => {
    setisConfirm(false);
  };

  const issueOpen = (id: number) => {
    setPolicyId(id);
    setisIssue(true);
  };

  const issueClose = () => {
    setisIssue(false);
  };

  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        console.log(resp);
        setData(resp.data["All Policys"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Policys"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api
  const handleFormSubmit = async () => {
    try {
      const response = await addApi(state, companyId);
      getData();
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

  const validatePolicy = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/policyvalidate/${policyId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setvalidateData(resp.data["Payable Amount"]);
        setsummaryData(resp.data["Summary"]);
        setisConfirm(false);
        policyvalidateOpen();
      });
  };

  const issuePolicy = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/policyissue/${policyId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setissueData(resp.data);
        console.log(resp.data, "Issue Data");
      });
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
      <CustomModal open={isPolicyValidate} handleClose={policyvalidateClose}>
        <PolicyValidate data={validateData} summaryData={summaryData} />
      </CustomModal>
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

        <h1>New Business Enquiry</h1>
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
      <NewBussinessTable
        data={data}
        issueOpen={issueOpen}
        confirmOpen={confirmOpen}
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

      <PolicyModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />

      <NotificationModal
        open={isConfirm}
        handleClose={confirmClose}
        handleFormSubmit={validatePolicy}
      >
        <h4>Are you sure you want to validate policy?</h4>
      </NotificationModal>
      <NotificationModal
        open={isIssue}
        handleClose={issueClose}
        handleFormSubmit={issuePolicy}
      >
        <h4>Are you sure you want to issue policy?</h4>
      </NotificationModal>
    </div>
  );
}

export default NewBusiness;
