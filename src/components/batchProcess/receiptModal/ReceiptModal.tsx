import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { BatchModalType } from "../../../reducerUtilities/types/batch/batchTypes";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useBusinessDate } from "../../contexts/BusinessDateContext";
import { ReceiptBankbydateapi } from "../receiptBatchApis/receiptBatchApis";
import styles from "./receiptModal.module.css";

function ReceiptModal({ state, dispatch, ACTIONS }: BatchModalType) {
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
    return ReceiptBankbydateapi(state, companyId)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `Created Successfully`,
          type: "success",
        });
        setreceiptData("");
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
    state.effectiveDate = businessDate;
    return () => {};
  }, [state.receiptOpen]);

  return (
    <div className={styles.modal}>
      <CustomModal
        open={state.receiptOpen}
        handleClose={
          state.receiptOpen
            ? () => dispatch({ type: ACTIONS.RECEIPTCLOSE })
            : null
        }
        title={state.receiptOpen ? "Receipt Create By Bank" : null}
        ACTIONS={ACTIONS}
        handleFormSubmit={state.receiptOpen ? () => handleFormSubmit() : null}
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
                        payload: date?.$d,
                        fieldName: "RevBonusDate",
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
export default ReceiptModal;
