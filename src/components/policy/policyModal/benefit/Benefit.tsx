import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../../reducerUtilities/actions/benefit/benefitActions";
import { BenefitStateType } from "../../../../reducerUtilities/types/benefit/benefitTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomPagination from "../../../../utilities/Pagination/CustomPagination";
import styles from "./benefit.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
} from "./benefitApis/benefitApis";
import BenefitTable from "./BenefitTable/BenefitTable";
import CustomModal from "../../../../utilities/modal/CustomModal";
import Extra from "../../../extra/Extra";
import BenefitModal from "./benefitModal/BenefitModal";
import Notification from "../../../../utilities/Notification/Notification";

function Benefit({
  modalFunc,
  benefitsByPoliciesData,
  lookup,
  getBenefitsByPolicies1,
  getPolicies,
  policyRecord,
}: any) {
  //data from getall api
  const [data, setData] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: BenefitStateType, action: any) => {
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
      case ACTIONS.EXTRAOPEN:
        setRecord(action.payload);
        return {
          ...state,
          extraOpen: true,
        };
      case ACTIONS.EXTRACLOSE:
        return {
          ...state,
          extraOpen: false,
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
        setData(resp.data["All Benefits"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        setisLast(resp.data["All Benefits"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  //Add Api

  const handleFormSubmit = () => {
    return addApi(state, companyId, policyRecord)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created:${resp.data?.Created}`,
          type: "success",
        });
        if (lookup) {
          getBenefitsByPolicies1(policyRecord.ID);
        }
        setNotify({
          isOpen: true,
          message: `Created Successfully`,
          type: "success",
        });
        getData();
        getPolicies();
      })
      .catch((err) => {
        console.log(err.message);
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
        console.log(resp);
        dispatch({ type: ACTIONS.EDITCLOSE });
        setNotify({
          isOpen: true,
          message: `Updated  Successfully`,
          type: "success",
        });
        getData();
        getPolicies();
        if (lookup) {
          getBenefitsByPolicies1(policyRecord.ID);
        }
      })
      .catch((err) => {
        console.log(err);
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
        console.log(resp);
        setNotify({
          isOpen: true,
          message: `Deleted  Successfully`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        console.log(err.message);
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };
  //Hard Delete Api

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
    <div style={{ width: "100%" }}>
      <header className={styles.flexStyle}>
        {lookup ? null : (
          <>
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
          </>
        )}

        <h1 style={lookup ? { textAlign: "center" } : {}}>Benefit</h1>

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
      <BenefitTable
        data={lookup ? benefitsByPoliciesData : data}
        modalFunc={modalFunc}
        policyRecord={policyRecord}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
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
      <BenefitModal
        state={state}
        record={record}
        policyRecord={policyRecord}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
      <CustomModal
        open={state.extraOpen}
        size="xl"
        handleClose={() => dispatch({ type: ACTIONS.EXTRACLOSE })}
      >
        <Extra benefitState={record} lookup={state.extraOpen} />
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Benefit;
