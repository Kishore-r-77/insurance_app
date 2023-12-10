import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import styles from "./batchModal.module.css";
import { BatchModalType } from "../../../reducerUtilities/types/batch/batchTypes";
import { addApi, getBusinessDateApi } from "../BatchApis/batchApis";
import Notification from "../../../utilities/Notification/Notification";
import { useBusinessDate } from "../../contexts/BusinessDateContext";
import CustomModal from "../../../utilities/modal/CustomModal";

function BatchModal({ state, dispatch, ACTIONS }: BatchModalType) {
  const addTitle: string = "AllocateRevBonusByDate";
  const size: string = "lg";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();
  const userId = useAppSelector((state) => state.users.user.message.id);
  const [businessData, setBusinessData] = useState<any>({});
  const getBusinessDate1 = (companyId: number, userId: number) => {
    return getBusinessDateApi(companyId, userId)
      .then((resp) => {
        setBusinessData(resp.data);
      })
      .catch((err) => err.message);
  };

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId)
      .then((resp) => {
        dispatch({ type: ACTIONS.BATCHCLOSE });
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

  useEffect(() => {
    getBusinessDate1(companyId, userId);
    state.RevBonusDate = businessDate;
    return () => {};
  }, []);
  return (
    <div className={styles.modal}>
      <CustomModal
        open={state.batchOpen}
        size={size}
        handleClose={
          state.batchOpen ? () => dispatch({ type: ACTIONS.BATCHCLOSE }) : null
        }
        title={state.batchOpen ? addTitle : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={state.batchOpen ? () => handleFormSubmit() : null}
      >
        <form>
          <Grid2
            container
            spacing={4}
            style={{ width: "95%", margin: "0px auto" }}
          >
            <Grid2 xs={8} md={6}>
              <TextField
                type="number"
                id="FromPolicy"
                name="FromPolicy"
                value={state.batchOpen ? state.FromPolicy : null}
                placeholder="From Policy"
                label="From Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.batchOpen ? ACTIONS.ONCHANGE : null,
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
                value={state.batchOpen ? state.ToPolicy : null}
                placeholder="To Policy"
                label="To Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.batchOpen ? ACTIONS.ONCHANGE : null,
                    payload: e.target.value,
                    fieldName: "ToPolicy",
                  })
                }
                fullWidth
                //inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    //readOnly={state.infoOpen}
                    label="Effective Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.batchOpen ? state.RevBonusDate : null}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.batchOpen ? ACTIONS.ONCHANGE : null,
                        payload: date?.$d,
                        fieldName: "RevBonusDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.batchOpen}
                    label="Business Date"
                    inputFormat="DD/MM/YYYY"
                    value={businessDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.batchOpen ? ACTIONS.ONCHANGE : null,
                        payload: date.$d,
                        fieldName: "Date",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default BatchModal;
