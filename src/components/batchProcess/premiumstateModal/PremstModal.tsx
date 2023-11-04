import {
    FormControl,
    InputAdornment,
    MenuItem,
    TextField,
  } from "@mui/material";
  import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import React, { useEffect, useState, useReducer, useLayoutEffect } from "react";
  import CustomModal from "../../../utilities/modal/CustomModal";
  import { useAppSelector } from "../../../redux/app/hooks";
  
  //import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
  
  import styles from "./PremstModal.module.css";
  
  //Attention: Check the path below
  import { PremiumModalType, PremiumStateType } from "../../../reducerUtilities/types/premst/premiumTypes";
 
  import {  premiumstatementbydateapi } from "../premstApis/premstApis";
  
  import {
    ACTIONS,
    columns,
    initialValues,
  } from "../../../reducerUtilities/actions/Premst/premiumAction";
  import Notification from "../../../utilities/Notification/Notification";
  
  import axios from "axios";
import CustomPremstFullModal from "./PremstFullModal";
import { Button } from "react-bootstrap";
  
export function PremiumStatementModal(BatchModalType: any) {
  const addTitle: string = "PremiumStatementByDate";
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
      return premiumstatementbydateapi(premStatementData, companyId)
        .then((resp) => {
         
          setNotify({
            isOpen: true,
            message:`${resp?.data?.PremiumStatements}- Policy Created Successfully`,
            type: "success",
          });
          setpremStatementData(initialValues);
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

    const [premStatementData, setpremStatementData] =
    useState<PremiumStateType>(initialValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setpremStatementData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFromDate = (date: any) => {
    setpremStatementData((prev) => ({ ...prev, FromDate: date }));
  };
  const handleToDate = (date: any) => {
    setpremStatementData((prev) => ({ ...prev, ToDate: date }));
  };
  
    
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
        setpremStatementData((prev) => ({
          ...prev,
          ToDate: resp.data.BusinessDate,
        }));
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getBusinessDate();
    return () => {};
  }, []);
  return (
    <div className={styles.modal}>
      <form>
        <h1> PremiumStatementByDate</h1>
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
                  key={premStatementData.FromDate}
                  label="From Date"
                  inputFormat="DD/MM/YYYY"
                  value={premStatementData.FromDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    handleFromDate(date)
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
                  value={premStatementData.ToDate}
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
              value={premStatementData.FromPolicy}
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
              value={premStatementData.ToPolicy}
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
        onClick={() => setpremStatementData(initialValues)}
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
  export default PremiumStatementModal;
  