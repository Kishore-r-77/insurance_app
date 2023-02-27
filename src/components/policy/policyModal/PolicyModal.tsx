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
import styles from "./policyModal.module.css";
import { PolicyModalType } from "../../../reducerUtilities/types/policy/policyTypes";

import CustomModal from "../../../utilities/modal/CustomModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import { useAppSelector } from "../../../redux/app/hooks";
import Client from "../../client/Client";
import { p0018, p0023, p0024, q0005, q0009 } from "../policyApis/policyApis";

function PolicyModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: PolicyModalType) {
  const addTitle: string = "Policy Add";
  const editTitle: string = "Policy Edit";
  const infoTitle: string = "Policy Info";

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [q0005Data, setq0005Data] = useState([]);

  const getQ0005 = () => {
    return q0005(companyId, languageId)
      .then((resp) => {
        setq0005Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };
  const [q0009Data, setq0009Data] = useState([]);

  const getQ0009 = () => {
    return q0009(companyId, languageId)
      .then((resp) => {
        setq0009Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };
  const [p0018Data, setp0018Data] = useState([]);

  const getQ0018 = () => {
    return p0018(companyId, languageId)
      .then((resp) => {
        setp0018Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };
  const [p0023Data, setp0023Data] = useState([]);

  const getQ0023 = () => {
    return p0023(companyId, languageId)
      .then((resp) => {
        setp0023Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  const [p0024Data, setp0024Data] = useState([]);

  const getQ0024 = () => {
    return p0024(companyId, languageId)
      .then((resp) => {
        setp0024Data(resp.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getCompanyData(companyId);
    getQ0005();
    getQ0009();
    getQ0018();
    getQ0023();
    getQ0024();

    return () => {};
  }, []);

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

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
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          {state.clientOpen ? (
            <Client modalFunc={clientOpenFunc} />
          ) : (
            <>
              <Grid2 container spacing={2}>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    disabled
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company"
                    label="Company"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: state.addOpen
                    //       ? ACTIONS.ONCHANGE
                    //       : ACTIONS.EDITCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "CompanyID",
                    //   })
                    // }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Proposal Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.PRCD : record.PRCD}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "PRCD",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PProduct"
                    name="PProduct"
                    value={state.addOpen ? state.PProduct : record.PProduct}
                    placeholder="Product"
                    label="Product"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PProduct",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {q0005Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PFreq"
                    name="PFreq"
                    value={state.addOpen ? state.PFreq : record.PFreq}
                    placeholder="Frequency"
                    label="Frequency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PFreq",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {q0009Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PContractCurr"
                    name="PContractCurr"
                    value={
                      state.addOpen ? state.PContractCurr : record.PContractCurr
                    }
                    placeholder="Contract Currency"
                    label="Contract Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PContractCurr",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {p0023Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="PBillCurr"
                    name="PBillCurr"
                    value={state.addOpen ? state.PBillCurr : record.PBillCurr}
                    placeholder="Bill Currency"
                    label="Bill Currency"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PBillCurr",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {p0023Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="POffice"
                    name="POffice"
                    value={state.addOpen ? state.POffice : record.POffice}
                    placeholder="Office"
                    label="Office"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "POffice",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {p0018Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  {/* <select name="PolStatus" id="" defaultValue="PA">
                    {p0024Data.map((val: any) => (
                      <option key={val.item} value={val.item}>
                        {val.longdesc}
                      </option>
                    ))}
                  </select> */}
                  <TextField
                    select
                    disabled
                    id="PolStatus"
                    name="PolStatus"
                    value={state.addOpen ? state.PolStatus : record.PolStatus}
                    placeholder="Policy Status"
                    label="Policy Status"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PolStatus",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {p0024Data.map((val: any) => (
                      <MenuItem key={val.item} value={val.item}>
                        {val.longdesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="Received Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.PReceivedDate
                            : record.PReceivedDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date.$d,
                            fieldName: "PReceivedDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    disabled
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    id="ClientID"
                    name="ClientID"
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    placeholder="Owner Id"
                    label="Owner Id"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </>
          )}
        </form>
      </CustomModal>
    </div>
  );
}

export default PolicyModal;
