import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import {
  ACTIONS,
  initialValues,
} from "../../../../reducerUtilities/actions/unitst/unitAction";
import { UnitStateType } from "../../../../reducerUtilities/types/unitst/unitType";
import { useAppSelector } from "../../../../redux/app/hooks";
import Notification from "../../../../utilities/Notification/Notification";
import { unitStatementbydateapi } from "../unitApis.ts/unitStatementbydateapi";
import styles from "./unitStModal.module.css";
import { useBusinessDate } from "../../../contexts/BusinessDateContext";
import NewBusiness from "../../../newBusiness/NewBusiness";
import { Link } from "react-router-dom";

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
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  //Add Api
  const handleFormSubmit = () => {
    return unitStatementbydateapi(unitStatementData, companyId)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `${resp?.data?.policies}-Policy Created Successfully`,
          type: "success",
        });
        setunitStatementData(initialValues);
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

  const [unitStatementData, setunitStatementData] =
    useState<UnitStateType>(initialValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setunitStatementData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFromDate = (date: any) => {
    setunitStatementData((prev) => ({ ...prev, FromDate: date }));
  };
  const handleToDate = (date: any) => {
    setunitStatementData((prev) => ({ ...prev, ToDate: date }));
  };

  useEffect(() => {
    getBusinessDate();
    setunitStatementData((prev) => ({
      ...prev,
      ToDate: businessDate,
      FromDate: businessDate,
    }));
    return () => {};
  }, []);
  const cancelfunction = () => {
    setunitStatementData(initialValues);
    setunitStatementData((prev) => ({
      ...prev,
      FromDate: businessDate,
    }));
  };

  return (
    <div className={styles.modal}>
      <form>
        <h1> UnitStatementByDate</h1>
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
                  // key={unitStatementData.FromDate}
                  label="From Date"
                  inputFormat="DD/MM/YYYY"
                  value={unitStatementData.FromDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    handleFromDate(date?.$d)
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
                  value={unitStatementData.ToDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    handleToDate(date)
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
              value={unitStatementData.FromPolicy}
              placeholder="From Policy"
              label="From Policy"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
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
              value={unitStatementData.ToPolicy}
              placeholder="To Policy"
              label="To Policy"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
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
        onClick={() => cancelfunction()}
        style={{
          position: "absolute",
          right: "150px",
        }}
      >
        Clear
      </Button>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
