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
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import styles from "./qDetailsModal.module.css";

//Attention: Check the path below
import { QDetailsModalType } from "../../../reducerUtilities/types/qDetails/qDetailsTypes";
import { paramItem } from "../qDetailsApis/qDetailsApis";
function QDetailsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: QDetailsModalType) {
  const addTitle: string = "QDetails Add";
  const editTitle: string = "QDetails Edit";
  const infoTitle: string = "QDetails Info";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [qHeaderData, setQHeaderIDData] = useState<any>({});
  // const getQHeaderIDData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setQHeaderIDData(resp.data["QHeaderID"]);
  //   });
  // };

  const [qCoverageData, setQCoverageData] = useState([]);
  const getQCoverage = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setQCoverageData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    //getQHeaderIDData(qHeaderId);
    getQCoverage(companyId, "Q0006", languageId);

    return () => {};
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
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="Company ID"
                label="Company ID"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="QHeaderID"
                name="QHeaderID"
                // Attention: *** Check the value details  ***
                value={qHeaderData?.QHeaderIDName}
                placeholder="Header ID"
                label="Header ID"
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
                    label="Quotation Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.QDate : record.QDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "QDate",
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
                id="QCoverage"
                name="QCoverage"
                value={state.addOpen ? state.QCoverage : record.QCoverage}
                placeholder="Coverage Code"
                label="Coverage Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QCoverage",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {qCoverageData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QRiskSeqNo"
                name="QRiskSeqNo"
                value={state.addOpen ? state.QRiskSeqNo : record.QRiskSeqNo}
                placeholder="Cover Seq No"
                label="Cover Seq No"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QRiskSeqNo",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QAge"
                name="QAge"
                value={state.addOpen ? state.QAge : record.QAge}
                placeholder="Life Assured Age"
                label="Life Assured Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QAge",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QEmrRating"
                name="QEmrRating"
                value={state.addOpen ? state.QEmrRating : record.QEmrRating}
                placeholder="EMR Rating"
                label="EMR Rating"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QEmrRating",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QSumAssured"
                name="QSumAssured"
                value={state.addOpen ? state.QSumAssured : record.QSumAssured}
                placeholder="Sum Assured"
                label="Sum Assured"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QSumAssured",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QRiskCessAge"
                name="QRiskCessAge"
                value={state.addOpen ? state.QRiskCessAge : record.QRiskCessAge}
                placeholder="Risk Cess Age"
                label="Risk Cess Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QRiskCessAge",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QRiskCessTerm"
                name="QRiskCessTerm"
                value={
                  state.addOpen ? state.QRiskCessTerm : record.QRiskCessTerm
                }
                placeholder="Risk Cess Term"
                label="Risk Cess Term"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QRiskCessTerm",
                  })
                }
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
                    label="Risk Cess Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.QRiskCessDate : record.QRiskCessDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "QRiskCessDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QPremCessAge"
                name="QPremCessAge"
                value={state.addOpen ? state.QPremCessAge : record.QPremCessAge}
                placeholder="Prem Cess Age"
                label="Prem Cess Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QPremCessAge",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QPremCessTerm"
                name="QPremCessTerm"
                value={
                  state.addOpen ? state.QPremCessTerm : record.QPremCessTerm
                }
                placeholder="Prem Cess Term"
                label="Prem Cess Term"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QPremCessTerm",
                  })
                }
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
                    label="Prem Cess Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.QPremCessDate : record.QPremCessDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "QPremCessDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QBeneCessAge"
                name="QBeneCessAge"
                value={state.addOpen ? state.QBeneCessAge : record.QBeneCessAge}
                placeholder="Benefit Cess Age"
                label="Benefit Cess Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QBeneCessAge",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QBeneCessTerm"
                name="QBeneCessTerm"
                value={
                  state.addOpen ? state.QBeneCessTerm : record.QBeneCessTerm
                }
                placeholder="Benefit Cess Term"
                label="Benefit Cess Term"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QBeneCessTerm",
                  })
                }
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
                    label="Benefit Cess Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.QBeneCessDate : record.QBeneCessDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "QBeneCessDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QAnnualPremium"
                name="QAnnualPremium"
                value={
                  state.addOpen ? state.QAnnualPremium : record.QAnnualPremium
                }
                placeholder="Annual Premium"
                label="Annual Premium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QAnnualPremium",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QHlyPrem"
                name="QHlyPrem"
                value={state.addOpen ? state.QHlyPrem : record.QHlyPrem}
                placeholder="HLY Premium"
                label="HLY Premium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QHlyPrem",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QQlyPrem"
                name="QQlyPrem"
                value={state.addOpen ? state.QQlyPrem : record.QQlyPrem}
                placeholder="QLY Premium"
                label="QLY Premium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QQlyPrem",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QMlyPrem"
                name="QMlyPrem"
                value={state.addOpen ? state.QMlyPrem : record.QMlyPrem}
                placeholder="MLY Premium"
                label="MLY Premium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QMlyPrem",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default QDetailsModal;
