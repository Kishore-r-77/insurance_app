import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useReducer, useState } from "react";
import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/validatepolicy/policyValidateActions";
import { PolicyValidateStateType } from "../../../reducerUtilities/types/validatepolicy/policyValidateTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import PolicyValidateTable from "./PolicyValidateTable";
import styles from "./policyValidate.module.css";

function PolicyValidate({ data, summaryData, modalFunc }: any) {
  //data from getall api
  // const [data, setData] = useState([]);
  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: PolicyValidateStateType, action: any) => {
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
      case ACTIONS.BENEFITSOPEN:
        return {
          ...state,
          benefitsOpen: true,
        };
      case ACTIONS.BENEFITSCLOSE:
        return {
          ...state,
          benefitsOpen: false,
        };

      default:
        return initialValues;
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(5);

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

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
    return () => {};
  }, [pageNum, pageSize, state.sortAsc, state.sortDesc]);

  return (
    <div>
      <header className={styles.flexStyle}>
        <h1>Payable Amount</h1>
      </header>
      <PolicyValidateTable
        data={data}
        modalFunc={modalFunc}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      />
      <hr className={`${styles.adjamount} ${styles.line}`} />
      {summaryData?.map((val: any) => (
        <div className={styles.adjamount}>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
                value={val["PolicyCurrency"]}
                placeholder="Policy Currency"
                label="Policy Currency"
                fullWidth
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
                value={val.CumulativePrem}
                placeholder="Cumulative Premium"
                label="Cumulative Premium"
                fullWidth
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
                value={val.PolicyDeposit}
                placeholder="Policy Deposit"
                label="Policy Deposit"
                fullWidth
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                value={val["PolicyDeposit After Adjustment"]}
                placeholder="Policy Deposit After Adjustment"
                label="Policy Deposit After Adjustment"
                fullWidth
              />
            </Grid2>
          </Grid2>
        </div>
      ))}
    </div>
  );
}
export default PolicyValidate;
