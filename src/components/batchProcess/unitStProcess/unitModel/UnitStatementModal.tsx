import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState, useReducer } from "react";
import styles from "./unitStModal.module.css";
// import {
//   ACTIONS,
//   initialValues,
// } from "../../../reducerUtilities/actions/unitst/unitAction";
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
  return (
    <div className={styles.modal}>
      <CustomUnitstFullModal
        open={state.addOpen}
        size={size}
        handleClose={
          state.addOpen ? () => dispatch({ type: ACTIONS.ADDCLOSE }) : null
        }
        title={state.addOpen ? addTitle : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={state.addOpen ? () => handleFormSubmit() : null}
      >
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
                    value={state.addOpen ? state.FromDate : null}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen ? ACTIONS.ONCHANGE : null,
                        payload: date?.$d,
                        fieldName: "FromDate",
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
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
                    value={state.addOpen ? state.ToDate : null}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen ? ACTIONS.ONCHANGE : null,
                        payload: date?.$d,
                        fieldName: "ToDate",
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
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
                value={state.addOpen ? state.FromPolicy : null}
                placeholder="From Policy"
                label="From Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "FromPolicy",
                  })
                }
                fullWidth
                //inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6}>
              <TextField
                type="number"
                id="ToPolicy"
                name="ToPolicy"
                value={state.addOpen ? state.ToPolicy : null}
                placeholder="To Policy"
                label="To Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "ToPolicy",
                  })
                }
                fullWidth
                //inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomUnitstFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
