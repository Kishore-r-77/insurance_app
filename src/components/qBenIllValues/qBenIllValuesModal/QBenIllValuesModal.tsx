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

import styles from "./qBenIllValuesModal.module.css";

//Attention: Check the path below
import { QBenIllValuesModalType } from "../../../reducerUtilities/types/qBenIllValues/qBenIllValuesTypes";
import { paramItem } from "../qBenIllValuesApis/qBenIllValuesApis";
function QBenIllValuesModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: QBenIllValuesModalType) {
  const addTitle: string = "QBenIllValues Add";
  const editTitle: string = "QBenIllValues Edit";
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
  // const getQDetailIDData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setQDetailIDData(resp.data["QDetailID"]);
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
                placeholder="Company "
                label="Company "
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
                value={qDetailData?.QDetailIDName}
                placeholder="q_detail_id"
                label="q_detail_id"
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
                placeholder="q_coverage"
                label="q_coverage"
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
                id="QPolicyYear"
                name="QPolicyYear"
                value={state.addOpen ? state.QPolicyYear : record.QPolicyYear}
                placeholder="q_policy_year"
                label="q_policy_year"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QLifeAssuredAge"
                name="QLifeAssuredAge"
                value={
                  state.addOpen ? state.QLifeAssuredAge : record.QLifeAssuredAge
                }
                placeholder="q_life_assured_age"
                label="q_life_assured_age"
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
                    label="q_pol_anniv_date"
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
                        payload: date,
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QTotalPremPaid"
                name="QTotalPremPaid"
                value={
                  state.addOpen ? state.QTotalPremPaid : record.QTotalPremPaid
                }
                placeholder="q_total_prem_paid"
                label="q_total_prem_paid"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QSumAssured"
                name="QSumAssured"
                value={state.addOpen ? state.QSumAssured : record.QSumAssured}
                placeholder="q_sum_assured"
                label="q_sum_assured"
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
                id="QRevBonusAmt"
                name="QRevBonusAmt"
                value={state.addOpen ? state.QRevBonusAmt : record.QRevBonusAmt}
                placeholder="q_rev_bonus_amt"
                label="q_rev_bonus_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QTerBonusAmt"
                name="QTerBonusAmt"
                value={state.addOpen ? state.QTerBonusAmt : record.QTerBonusAmt}
                placeholder="q_ter_bonus_amt"
                label="q_ter_bonus_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QAntiSurBenAmt"
                name="QAntiSurBenAmt"
                value={
                  state.addOpen ? state.QAntiSurBenAmt : record.QAntiSurBenAmt
                }
                placeholder="q_anti_sur_ben_amt"
                label="q_anti_sur_ben_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QGuarAdditions"
                name="QGuarAdditions"
                value={
                  state.addOpen ? state.QGuarAdditions : record.QGuarAdditions
                }
                placeholder="q_guar_additions"
                label="q_guar_additions"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QLoyaltyAdditions"
                name="QLoyaltyAdditions"
                value={
                  state.addOpen
                    ? state.QLoyaltyAdditions
                    : record.QLoyaltyAdditions
                }
                placeholder="q_loyalty_additions"
                label="q_loyalty_additions"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QDeathBenefitAmt"
                name="QDeathBenefitAmt"
                value={
                  state.addOpen
                    ? state.QDeathBenefitAmt
                    : record.QDeathBenefitAmt
                }
                placeholder="q_death_benefit_amt"
                label="q_death_benefit_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QGuarSurrValue"
                name="QGuarSurrValue"
                value={
                  state.addOpen ? state.QGuarSurrValue : record.QGuarSurrValue
                }
                placeholder="q_guar_surr_value"
                label="q_guar_surr_value"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QSplSurrValue"
                name="QSplSurrValue"
                value={
                  state.addOpen ? state.QSplSurrValue : record.QSplSurrValue
                }
                placeholder="q_spl_surr_value"
                label="q_spl_surr_value"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QBonusSurValue"
                name="QBonusSurValue"
                value={
                  state.addOpen ? state.QBonusSurValue : record.QBonusSurValue
                }
                placeholder="q_bonus_sur_value"
                label="q_bonus_sur_value"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QAccuDividend"
                name="QAccuDividend"
                value={
                  state.addOpen ? state.QAccuDividend : record.QAccuDividend
                }
                placeholder="q_accu_dividend"
                label="q_accu_dividend"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QAccuDivInterest"
                name="QAccuDivInterest"
                value={
                  state.addOpen
                    ? state.QAccuDivInterest
                    : record.QAccuDivInterest
                }
                placeholder="q_accu_div_interest"
                label="q_accu_div_interest"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QallocatedAmt"
                name="QallocatedAmt"
                value={
                  state.addOpen ? state.QallocatedAmt : record.QallocatedAmt
                }
                placeholder="qallocated_amt"
                label="qallocated_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QUnallocedAmt"
                name="QUnallocedAmt"
                value={
                  state.addOpen ? state.QUnallocedAmt : record.QUnallocedAmt
                }
                placeholder="q_unalloced_amt"
                label="q_unalloced_amt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QPesValamt"
                name="QPesValamt"
                value={state.addOpen ? state.QPesValamt : record.QPesValamt}
                placeholder="q_pes_valamt"
                label="q_pes_valamt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QNorValamt"
                name="QNorValamt"
                value={state.addOpen ? state.QNorValamt : record.QNorValamt}
                placeholder="q_nor_valamt"
                label="q_nor_valamt"
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QOptValamt"
                name="QOptValamt"
                value={state.addOpen ? state.QOptValamt : record.QOptValamt}
                placeholder="q_opt_valamt"
                label="q_opt_valamt"
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
                    label="q_maturity_date"
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
                        payload: date,
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
                //InputProps={{
                //startAdornment: (
                //<InputAdornment position="start">+91</InputAdornment>
                // ),
                //}}
                id="QMaturityAmt"
                name="QMaturityAmt"
                value={state.addOpen ? state.QMaturityAmt : record.QMaturityAmt}
                placeholder="q_maturity_amt"
                label="q_maturity_amt"
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
