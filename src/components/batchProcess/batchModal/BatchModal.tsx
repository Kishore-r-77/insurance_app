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
import React, { useEffect, useState, useReducer } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

//import { getApi } from "../../../admin/companies/companiesApis/companiesApis";

import styles from "./batchModal.module.css";

//Attention: Check the path below
import { BatchModalType } from "../../../reducerUtilities/types/batch/batchTypes";
import { BatchStateType } from "../../../reducerUtilities/types/batch/batchTypes";
import { addApi } from "../BatchApis/batchApis";

import {
  ACTIONS,
  columns,
  initialValues,
} from "../../../reducerUtilities/actions/batch/batchAction";
import Notification from "../../../utilities/Notification/Notification";
import CustomBatchFullModal from "./BatchFullModal";
import axios from "axios";

function BatchModal(BatchModalType: any) {
  const addTitle: string = "AllocateRevBonusByDate";
  const size: string = "xl";

  //   const companyId = useAppSelector(
  //     (state) => state.users.user.message.companyId
  //   );

  // const [companyData, setCompanyData] = useState<any>({});
  // const getCompanyData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setCompanyData(resp.data["Company"]);
  //   });
  // };

  // useEffect(() => {
  //   getCompanyData(companyId);

  //   return () => {};
  // }, []);
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, companyId)
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

  const reducer = (state: BatchStateType, action: any) => {
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
  const [state, dispatch] = useReducer(reducer, initialValues);

  const [businessDate, setBusinessDate] = useState<any>([]);
  const getBusinessDate = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/businessdateget/1`, {
        withCredentials: true,
      })
      .then((resp) => {
        setBusinessDate(resp.data["BusinessDate"]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBusinessDate();
    console.log(businessDate.Date, "========");
    return () => {};
  }, []);

  return (
    <div className={styles.modal}>
      <CustomBatchFullModal
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
            <Grid2 xs={8} md={6}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    //readOnly={state.infoOpen}
                    label="Effective Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.RevBonusDate : null}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen ? ACTIONS.ONCHANGE : null,
                        payload: date.$d,
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
                    readOnly={state.addOpen}
                    label="Business Date"
                    inputFormat="DD/MM/YYYY"
                    value={businessDate?.Date}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen ? ACTIONS.ONCHANGE : null,
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
      </CustomBatchFullModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default BatchModal;
