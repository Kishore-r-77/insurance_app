import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState, useReducer, useRef } from "react";
import styles from "./unitStModal.module.css";
import axios from "axios";
import { unitStatementbydateapi } from "../unitApis.ts/unitStatementbydateapi";
import CustomUnitstFullModal from "./UnitStFullModal";
import { UnitStateType } from "../../../../reducerUtilities/types/unitst/unitType";
import { useAppSelector } from "../../../../redux/app/hooks";
import {
  ACTIONS,
  initialValues,
} from "../../../../reducerUtilities/actions/unitst/unitAction";
import Notification from "../../../../utilities/Notification/Notification";
import { Button } from "react-bootstrap";
import { useHref } from "react-router-dom";

export function UnitStatementModal(BatchModalType: any) {
  const addTitle: string = "UnitStatementByDate";
  const size: string = "xl";

  const companyId = useAppSelector(
    (state: { users: { user: { message: { companyId: any } } } }) =>
      state.users.user.message.companyId
  );

  const userId = useAppSelector(
    (state: { users: { user: { message: { id: any } } } }) =>
      state.users.user.message.id
  );

  //Add Api
  const handleFormSubmit = () => {
    return unitStatementbydateapi(state, companyId)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });

        setNotify({
          isOpen: true,
          message: `Created Successfully`,
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const reducer = (state: UnitStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          addOpen: true,
        };
      case ACTIONS.ADDCLOSE:
        state = initialValues;
        return {
          ...state,
          FromDate: "",
          addOpen: false,
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

  let [state, dispatch] = useReducer(reducer, initialValues);

  const [businessDate, setBusinessDate] = useState<any>([]);
  const getBusinessDate = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/0/0`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setBusinessDate(resp.data.BusinessDate);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getBusinessDate();
    state.ToDate = businessDate.BusinessDate;
    return () => {};
  }, []);

  console.log(state.FromDate, "FromDate:fromdate");
  return (
    <div className={styles.modal}>
      <form>
        <Grid2
          container
          spacing={4}
          style={{ width: "95%", margin: "0px auto" }}
        >
          <Grid2 xs={8} md={6}>
            <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  //readOnly={state.infoOpen}
                  label="From Date"
                  inputFormat="DD/MM/YYYY"
                  value={state.addOpen ? state.FromDate : ""}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    dispatch({
                      type: ACTIONS.ONCHANGE,
                      payload: date?.$d,
                      fieldName: "FromDate",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={false}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid2>
          <Grid2 xs={8} md={6}>
            <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  //readOnly={state.infoOpen}
                  label="To Date"
                  inputFormat="DD/MM/YYYY"
                  value={state.ToDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    dispatch({
                      type: ACTIONS.ONCHANGE,
                      payload: date?.$d,
                      fieldName: "ToDate",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={false}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid2>
          <Grid2 xs={8} md={6}>
            <TextField
              type="number"
              id="FromPolicy"
              name="FromPolicy"
              value={state.addOpen ? state.FromPolicy : ""}
              placeholder="From Policy"
              label="From Policy"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: ACTIONS.ONCHANGE,
                  payload: e.target.value,
                  fieldName: "FromPolicy",
                })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="dense"
            />
          </Grid2>

          <Grid2 xs={8} md={6}>
            <TextField
              type="number"
              id="ToPolicy"
              name="ToPolicy"
              value={state.addOpen ? state.ToPolicy : ""}
              placeholder="To Policy"
              label="To Policy"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: state.addOpen ? ACTIONS.ONCHANGE : null,
                  payload: e.target.value,
                  fieldName: "ToPolicy",
                })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
              //inputProps={{ readOnly: state.infoOpen }}
              margin="dense"
            />
          </Grid2>
        </Grid2>
      </form>
      <Button
        variant="primary"
        color="primary"
        onClick={handleFormSubmit}
        style={{
          position: "absolute",
          right: "60px",
        }}
      >
        Submit
      </Button>
      <Button
        variant="secondary"
        color="primary"
        onClick={() => dispatch({ type: ACTIONS.ADDCLOSE })}
        style={{
          position: "absolute",
          right: "150px",
        }}
      >
        Cancel
      </Button>

      {/* </CustomUnitstFullModal> */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
