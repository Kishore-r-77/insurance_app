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
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../redux/app/hooks";
import styles from "./businessModal.module.css";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
//Attention: Check the path below
import { BusinessDatesModalType } from "../../../../reducerUtilities/types/admin/businessDate/businessDatesTypes";
import { paramItem } from "../businessApis/businessDatesApis";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import Users from "../../users/Users";

function BusinessDatesModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  editFormSubmit,
}: any) {
  const addTitle: string = "BusinessDates Add";
  const editTitle: string = "BusinessDates Edit";
  const infoTitle: string = "BusinessDates Info";
  const size: string = "x1";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const {
    sendRequest: sendDeptRequest,
    status: getDeptResponseStatus,
    data: getDeptResponse,
    error: getDeptResponseError,
  } = useHttp(getData, true);

  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const userOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.UserID = item.Id;
    } else record.UserID = item.Id;
    dispatch({ type: ACTIONS.USERCLOSE });
  };

  useEffect(() => {
    getCompanyData(companyId);

    return () => {};
  }, []);
  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "Dept";
    sendDeptRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });
  }, []);

  return (
    <div className={styles.modal}>
      <CustomModal
        open={
          state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        size={size}
        handleClose={
          state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
        title={
          state.addOpen
            ? addTitle
            : state.editOpen
            ? editTitle
            : state.infoOpen
            ? infoTitle
            : null
        }
        ACTIONS={ACTIONS}
        handleFormSubmit={
          state.addOpen
            ? () => handleFormSubmit()
            : state.editOpen
            ? () => editFormSubmit()
            : null
        }
      >
        <form>
          {state.userOpen ? (
            <CustomModal
              open={state.userOpen}
              handleClose={() => dispatch({ type: ACTIONS.USERCLOSE })}
              size="xl"
            >
              <Users modalFunc={userOpenFunc} />
            </CustomModal>
          ) : null}
          <Grid2
            container
            spacing={2}
            style={{ width: "95%", margin: "0px auto" }}
          >
            <Grid2 xs={9} md={8}>
              <TextField
                InputProps={{ readOnly: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="company_id"
                label="company_id"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={9} md={8}>
              <TextField
                select
                id="Department"
                name="Department"
                value={state.addOpen ? state.Department : record.Department}
                placeholder="Department"
                label="Department"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Department",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {getDeptResponse?.param.data.dataPairs.map((value: any) => (
                  <MenuItem key={value.code} value={value.code}>
                    {value.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6}>
              <TextField
                id="UserID"
                onClick={() => dispatch({ type: ACTIONS.USEROPEN })}
                name="UserID"
                value={state.addOpen ? state.UserID : record?.UserID}
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "UserID",
                  })
                }
                placeholder="User ID"
                label="User ID"
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Business Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.Date : record.Date}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
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
    </div>
  );
}
export default BusinessDatesModal;
