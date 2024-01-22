import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

import styles from "./extractionModal.module.css";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../redux/app/hooks";
import { BatchModalType } from "../../../../reducerUtilities/types/batch/batchTypes";
import { useBusinessDate } from "../../../contexts/BusinessDateContext";
import { Extractionbydateapi } from "../extractioApis/extractModalApi";
import Notification from "../../../../utilities/Notification/Notification";

function ExtractionModal({ state, dispatch, ACTIONS }: BatchModalType) {
  const companyId = useAppSelector(
    (state: { users: { user: { message: { companyId: any } } } }) =>
      state.users.user.message.companyId
  );
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();
  const userId = useAppSelector(
    (state: { users: { user: { message: { id: any } } } }) =>
      state.users.user.message.id
  );

  const [receiptData, setreceiptData] = useState<any>("");
  //Add Api
  const handleFormSubmit = () => {
    return Extractionbydateapi(state, companyId)
      .then((resp: any) => {
        setNotify({
          isOpen: true,
          message: `Created Successfully :${resp?.data?.Total} `,
          type: "success",
        });
        setreceiptData("");
      })
      .catch((err: { response: { data: { error: any } } }) => {
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
    state.effectiveDate = businessDate;
    return () => {};
  }, [state.extractionOpen]);

  return (
    <div className={styles.modal}>
      <CustomModal
        open={state.extractionOpen}
        handleClose={
          state.extractionOpen
            ? () => dispatch({ type: ACTIONS.EXTRACTCLOSE })
            : null
        }
        title={state.extractionOpen ? "SSI Extraction" : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={
          state.extractionOpen ? () => handleFormSubmit() : null
        }
      >
        <form>
          <Grid2
            container
            spacing={4}
            style={{ width: "95%", margin: "0px auto" }}
          >
            <Grid2 lg={16}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    key={state.effectiveDate}
                    label="Effective Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.effectiveDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.batchOpen ? ACTIONS.ONCHANGE : null,
                        // payload: date?.$d,
                        // fieldName: "RevBonusDate",
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
          </Grid2>
        </form>
      </CustomModal>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default ExtractionModal;
