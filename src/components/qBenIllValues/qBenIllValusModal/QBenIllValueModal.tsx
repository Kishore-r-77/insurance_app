import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import styles from "./qBenIllValuesModal.module.css";

import { QBenIllValueModalType } from "../../../reducerUtilities/types/qBenIllValues/qBenIllValueTypes";
import { paramItem } from "../qBenIllValuesApis/qBenIllValueApis";
function QBenIllValuesModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: QBenIllValueModalType) {
  const infoTitle: string = "QBenIllValues Info";
  const size: string = "xl";

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

  const [qDetailData, setQDetailIDData] = useState<any>({});

  const [qCoverageData, setQCoverageData] = useState([]);
  const getQCoverage = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp: any) => {
        setQCoverageData(resp.data.data);
        return resp.data.data;
      })
      .catch((err: any) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    // getQDetailIDData(qDetailId);
    getQCoverage(companyId, "Q0006", languageId);

    return () => {};
  }, []);

  return (
    <div className={styles.modal}>
      <CustomModal
        size={size}
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
        title={infoTitle}
        ACTIONS={ACTIONS}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="Company"
                label="Company"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="QDetailID"
                name="QDetailID"
                // Attention: *** Check the value details  ***
                value={record.QDetailID}
                placeholder="QDetailID"
                label="QDetailID"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="QCoverage"
                name="QCoverage"
                value={state.addOpen ? state.QCoverage : record.QCoverage}
                placeholder="Coverage"
                label="Coverage"
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
                id="QPolicyYear"
                name="QPolicyYear"
                value={state.addOpen ? state.QPolicyYear : record.QPolicyYear}
                placeholder="Policy Year"
                label="Policy Year"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QPolicyYear",
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
                id="QLifeAssuredAge"
                name="QLifeAssuredAge"
                value={
                  state.addOpen ? state.QLifeAssuredAge : record.QLifeAssuredAge
                }
                placeholder="Life Assured Age"
                label="Life Assured Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QLifeAssuredAge",
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
                    label="Pol. Anniversary Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.QPolAnnivDate : record.QPolAnnivDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date?.$d,
                        fieldName: "QPolAnnivDate",
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
                id="QTotalPremPaid"
                name="QTotalPremPaid"
                value={
                  state.addOpen ? state.QTotalPremPaid : record.QTotalPremPaid
                }
                placeholder="Total Premium Paid"
                label="Total Premium Paid"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QTotalPremPaid",
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
                id="QRevBonusAmt"
                name="QRevBonusAmt"
                value={state.addOpen ? state.QRevBonusAmt : record.QRevBonusAmt}
                placeholder="Reversionary Bonus"
                label="Reversionary Bonus"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QRevBonusAmt",
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
                id="QTerBonusAmt"
                name="QTerBonusAmt"
                value={state.addOpen ? state.QTerBonusAmt : record.QTerBonusAmt}
                placeholder="Terminal Bonus"
                label="Terminal Bonus"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QTerBonusAmt",
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
                id="QAntiSurBenAmt"
                name="QAntiSurBenAmt"
                value={
                  state.addOpen ? state.QAntiSurBenAmt : record.QAntiSurBenAmt
                }
                placeholder="Survival Benefit Amount"
                label="Survival Benefit Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QAntiSurBenAmt",
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
                id="QGuarAdditions"
                name="QGuarAdditions"
                value={
                  state.addOpen ? state.QGuarAdditions : record.QGuarAdditions
                }
                placeholder="Guaranteed Additions"
                label="Guaranteed Additions"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QGuarAdditions",
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
                id="QLoyaltyAdditions"
                name="QLoyaltyAdditions"
                value={
                  state.addOpen
                    ? state.QLoyaltyAdditions
                    : record.QLoyaltyAdditions
                }
                placeholder="Loyalty Bonus"
                label="Loyalty Bonus"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QLoyaltyAdditions",
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
                id="QDeathBenefitAmt"
                name="QDeathBenefitAmt"
                value={
                  state.addOpen
                    ? state.QDeathBenefitAmt
                    : record.QDeathBenefitAmt
                }
                placeholder="Death Benefit Amount"
                label="Death Benefit Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QDeathBenefitAmt",
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
                id="QGuarSurrValue"
                name="QGuarSurrValue"
                value={
                  state.addOpen ? state.QGuarSurrValue : record.QGuarSurrValue
                }
                placeholder="Guaranteed SV"
                label="Guaranteed SV"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QGuarSurrValue",
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
                id="QSplSurrValue"
                name="QSplSurrValue"
                value={
                  state.addOpen ? state.QSplSurrValue : record.QSplSurrValue
                }
                placeholder="Special SV"
                label="Special SV"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QSplSurrValue",
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
                id="QBonusSurValue"
                name="QBonusSurValue"
                value={
                  state.addOpen ? state.QBonusSurValue : record.QBonusSurValue
                }
                placeholder="Bonus SV"
                label="Bonus SV"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QBonusSurValue",
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
                id="QAccuDividend"
                name="QAccuDividend"
                value={
                  state.addOpen ? state.QAccuDividend : record.QAccuDividend
                }
                placeholder="Accumulated Dividend"
                label="Accumulated Dividend"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QAccuDividend",
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
                id="QAccuDivInterest"
                name="QAccuDivInterest"
                value={
                  state.addOpen
                    ? state.QAccuDivInterest
                    : record.QAccuDivInterest
                }
                placeholder="Acc Dividend Interest"
                label="Acc Dividend Interest"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QAccuDivInterest",
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
                id="QallocatedAmt"
                name="QallocatedAmt"
                value={
                  state.addOpen ? state.QallocatedAmt : record.QallocatedAmt
                }
                placeholder="Allocated Amount"
                label="Allocated Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QallocatedAmt",
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
                id="QUnallocedAmt"
                name="QUnallocedAmt"
                value={
                  state.addOpen ? state.QUnallocedAmt : record.QUnallocedAmt
                }
                placeholder="Unallocated Amount"
                label="Unallocated Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QUnallocedAmt",
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
                id="QPesValamt"
                name="QPesValamt"
                value={state.addOpen ? state.QPesValamt : record.QPesValamt}
                placeholder="Pessimistic Value"
                label="Pessimistic Value"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QPesValamt",
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
                id="QNorValamt"
                name="QNorValamt"
                value={state.addOpen ? state.QNorValamt : record.QNorValamt}
                placeholder="Normal Value"
                label="Normal Value"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QNorValamt",
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
                id="QOptValamt"
                name="QOptValamt"
                value={state.addOpen ? state.QOptValamt : record.QOptValamt}
                placeholder="Optimistic Value"
                label="Optimistic Value"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QOptValamt",
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
                    label="Maturity Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.QMaturityDate : record.QMaturityDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date?.$d,
                        fieldName: "QMaturityDate",
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
                id="QMaturityAmt"
                name="QMaturityAmt"
                value={state.addOpen ? state.QMaturityAmt : record.QMaturityAmt}
                placeholder="Maturity Amount"
                label="Maturity Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "QMaturityAmt",
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
export default QBenIllValuesModal;
