import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import styles from "./PremstModal.module.css";
import { premiumstatementbydateapi } from "../premstApis/premstApis";
import Notification from "../../../utilities/Notification/Notification";
import { BatchModalType } from "../../../reducerUtilities/types/batch/batchTypes";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useBusinessDate } from "../../contexts/BusinessDateContext";

export function PremiumStatementModal({
  state,
  dispatch,
  ACTIONS,
}: BatchModalType) {
  const addTitle: string = "PremiumStatementByDate";
  const size: string = "lg";

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
    return premiumstatementbydateapi(state, companyId)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `${resp?.data?.PremiumStatements}- Policy Created Successfully`,
          type: "success",
        });
        dispatch({ type: ACTIONS.PTCLOSE });
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

  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  useEffect(() => {
    getBusinessDate();
    state.ToDate = businessDate;
    return () => {};
  }, []);
  return (
    <div className={styles.modal}>
      <CustomModal
        open={state.premStOpen}
        size={size}
        handleClose={
          state.premStOpen ? () => dispatch({ type: ACTIONS.PTCLOSE }) : null
        }
        title={state.premStOpen ? addTitle : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={state.premStOpen ? () => handleFormSubmit() : null}
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
                    //key={premStatementData.FromDate}
                    label="From Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.FromDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.premStOpen ? ACTIONS.ONCHANGE : null,
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
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.premStOpen ? ACTIONS.ONCHANGE : null,
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
                name="PtFromPolicy"
                value={state.PtFromPolicy}
                placeholder="From Policy"
                label="From Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.premStOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "PtFromPolicy",
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
                name="PtToPolicy"
                value={state.PtToPolicy}
                placeholder="To Policy"
                label="To Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.premStOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "PtToPolicy",
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
      </CustomModal>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default PremiumStatementModal;
