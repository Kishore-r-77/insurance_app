import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import CustomPagination from "../../utilities/Pagination/CustomPagination";
import CustomTable from "../../utilities/Table/CustomTable";
import { useAppSelector } from "../../redux/app/hooks";
// ***  Attention : Check the import below and change it if required ***
import { PolicyStateType } from "../../reducerUtilities/types/policy/policyTypes";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../reducerUtilities/actions/policy/policyActions";
import styles from "./policy.module.css";
import {
  addApi,
  deleteApi,
  editApi,
  getAllApi,
  getBenefitsByPolicies,
} from "./policyApis/policyApis";
import PolicyModal from "./policyModal/PolicyModal";
import { getAddressByClient } from "../clientDetails/client/clientApis/clientAddressApis";
import Benefit from "./policyModal/benefit/Benefit";
import PolicyTable from "./policyTable/PolicyTable";
import CustomModal from "../../utilities/modal/CustomModal";
import PolicyEnquiry from "./policyModal/PolicyEnquiry";

function Policy({ modalFunc, dataIndex, lookup, getByTable }: any) {
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

      // *** Attention: Check the Open /close ***
      case ACTIONS.BENEFITOPEN:
        setRecord(action.payload);
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
  //Get all Api
  const getData = () => {
    return getAllApi(pageNum, pageSize, state)
      .then((resp) => {
        console.log(resp);
        // ***  Attention : Check the API and modify it, if required  ***
        setData(resp.data["All Policies"]);
        settotalRecords(resp.data.paginationData.totalRecords);
        // ***  Attention : Check the API and modify it, if required   ***
        setisLast(resp.data["All Policies"]?.length === 0);
        setfieldMap(resp.data["Field Map"]);
      })
      .catch((err) => console.log(err.message));
  };

  // *** Attention: Check the Lookup Open /close ***
  const [benefitsByPoliciesData, setbenefitsByPoliciesData] = useState([]);

  const getBenefitsByPolicies1 = (policyId: number) => {
    getBenefitsByPolicies(policyId)
      .then((resp) => {
        setbenefitsByPoliciesData(resp.data?.Benefit);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    getBenefitsByPolicies1(record.ID);
    return () => {};
  }, [state.benefitOpen]);

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

  return (
    <div style={{ width: "100%" }}>
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
        <h1>Policies</h1>
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
      </header>{" "}
      <PolicyTable
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
      <PolicyEnquiry
        state={state}
        record={record}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        handleFormSubmit={editFormSubmit}
      />
      <PolicyModal
        state={state}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        getData={getData}
      />
      <CustomModal
        open={state.benefitOpen}
        handleClose={() => dispatch({ type: ACTIONS.BENEFITCLOSE })}
      >
        <Benefit
          benefitsByPoliciesData={benefitsByPoliciesData}
          lookup={state.benefitOpen}
        />
      </CustomModal>
    </div>
  );
}
export default Policy;
