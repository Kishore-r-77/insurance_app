import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { BatchModalType } from "../../../../reducerUtilities/types/batch/batchTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import Notification from "../../../../utilities/Notification/Notification";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { useBusinessDate } from "../../../contexts/BusinessDateContext";
import { unitStatementbydateapi } from "../unitApis.ts/unitStatementbydateapi";
import styles from "./unitStModal.module.css";

export function UnitStatementModal({
  state,
  dispatch,
  ACTIONS,
}: BatchModalType) {
  const addTitle: string = "UnitStatementByDate";

  const companyId = useAppSelector(
    (state: { users: { user: { message: { companyId: any } } } }) =>
      state.users.user.message.companyId
  );

  const { businessDate, getBusinessDate } = useBusinessDate();

  //Add Api
  const handleFormSubmit = () => {
    return unitStatementbydateapi(state, companyId)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `${resp?.data?.policies}-Policy Created Successfully`,
          type: "success",
        });
        dispatch({ type: ACTIONS.UNITSTCLOSE });
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

  useEffect(() => {
    getBusinessDate();
    state.UnitStFromDate = businessDate;
    state.UnitStToDate = businessDate;
    return () => {};
  }, [state.unitStOpen]);

  return (
    <div className={styles.modal}>
      <CustomModal
        open={state.unitStOpen}
        size="lg"
        handleClose={
          state.unitStOpen
            ? () => dispatch({ type: ACTIONS.UNITSTCLOSE })
            : null
        }
        title={state.unitStOpen ? addTitle : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={state.unitStOpen ? () => handleFormSubmit() : null}
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
                    // readOnly={state.infoOpen}
                    key={state.UnitStFromDate}
                    label="From Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.UnitStFromDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.unitStOpen ? ACTIONS.ONCHANGE : null,
                        payload: date?.$d,
                        fieldName: "UnitStFromDate",
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
                    label="To Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.UnitStToDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.unitStOpen ? ACTIONS.ONCHANGE : null,
                        payload: date?.$d,
                        fieldName: "UnitStToDate",
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
                name="UnitStFromPolicy"
                value={state.UnitStFromPolicy}
                placeholder="From Policy"
                label="From Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.unitStOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "UnitStFromPolicy",
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
                name="UnitStToPolicy"
                value={state.UnitStToPolicy}
                placeholder="To Policy"
                label="To Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.unitStOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "UnitStToPolicy",
                  })
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
