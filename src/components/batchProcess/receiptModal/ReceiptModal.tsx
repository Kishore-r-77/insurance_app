import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";

import styles from "./receiptModal.module.css";

import axios from "axios";
import {
  ACTIONS,
  initialValues,
} from "../../../reducerUtilities/actions/batch/batchAction";
import Notification from "../../../utilities/Notification/Notification";
import { ReceiptBankbydateapi } from "../receiptBatchApis/receiptBatchApis";
import { Button } from "react-bootstrap";
import { useBusinessDate } from "../../contexts/BusinessDateContext";

function ReceiptModal(BatchModalType: any) {
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
    return ReceiptBankbydateapi(receiptData, companyId)
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

  const handleEffectiveDate = (date: any) => {
    setreceiptData((prev: any) => ({ ...prev, FromDate: date }));
  };

  // const [businessDate, setBusinessDate] = useState<any>([]);
  // const getBusinessDate = () => {
  //   axios
  //     .get(
  //       `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/0/0`,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((resp) => {
  //       setBusinessDate(resp.data.BusinessDate);
  //       setreceiptData((prev: any) => ({
  //         ...prev,
  //         effectiveDate: resp.data.BusinessDate,
  //       }));
  //     })
  //     .catch((err) => err);
  // };

  useEffect(() => {
    // getBusinessDate();
    setreceiptData((prev: any) => ({
      ...prev,
      effectiveDate: businessDate,
    }));
    return () => {};
  }, []);

  return (
    <div className={styles.modal}>
      <form>
        <h1> ReceiptCreateByBank</h1>
        <br />
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
                  key={receiptData.effectiveDate}
                  label="Effective Date"
                  inputFormat="DD/MM/YYYY"
                  value={receiptData.effectiveDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    handleEffectiveDate(date)
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
        onClick={() => setreceiptData(initialValues)}
        style={{
          position: "absolute",
          right: "150px",
        }}
      >
        Cancel
      </Button>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default ReceiptModal;
