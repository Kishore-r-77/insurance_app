import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import styles from "./benefitModal.module.css";

import { BenefitModalType } from "../../../../../reducerUtilities/types/benefit/benefitTypes";
import CustomModal from "../../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../../redux/app/hooks";
import { getApi } from "../../../../admin/companies/companiesApis/companiesApis";
import { extraParamItem } from "../../../../clientDetails/client/clientApis/clientApis";
import Client from "../../../../clientDetails/client/Client";
import { extraParams } from "../../../policyApis/policyApis";
import axios from "axios";

function BenefitModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  policyRecord,
  interest,
}: BenefitModalType) {
  console.log(interest, "Interest Inside benefit modal");
  const addTitle: string = "Benefit Add";
  const editTitle: string = "Benefit Edit";
  const infoTitle: string = "Benefit Info";
  const size: string = "xl";

  const [bCoverageData, setBCoverageData] = useState([]);
  const getBCoverage = (
    companyId: number,
    name: string,
    item: string,
    date: string
  ) => {
    extraParamItem(companyId, name, item, date)
      .then((resp) => {
        setBCoverageData(resp.data["AllowedCoverages"]);
        return resp.data["AllowedCoverages"];
      })
      .catch((err) => err);
  };

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const clientOpenFunc = (item: any) => {
    console.log(item.ID, "clientId");
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;

    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  useEffect(() => {
    getCompanyData(companyId);
    getBCoverage(companyId, "Q0011", policyRecord.PProduct, "20220101");
    return () => {};
  }, []);

  const [capturedCovg, setcapturedCovg] = useState("");
  const [intrestData, setintrestData] = useState([]);

  const mrtaDropdown = () => {
    return extraParams(companyId, "Q0006", record.BCoverage, "MrtaInterest")
      .then((resp) => setintrestData(resp.data?.AllowedInterestRates))
      .catch((err) => err.message);
  };

  useEffect(() => {
    mrtaDropdown();
    return () => {};
  }, [state.addOpen ? state.addOpen : state.editOpen]);

  const [bpremData, setbPremData] = useState([]);

  const ilpExtra = () => {
    return extraParams(companyId, "Q0006", record.BCoverage, "UlAlMethod")
      .then((resp) => setbPremData(resp.data?.AllowedUlAlMethod))
      .catch((err) => err.message);
  };

  useEffect(() => {
    ilpExtra();
    return () => {};
  }, [state.addOpen ? state.addOpen : state.editOpen]);

  const [termRangeMenu, settermRangeMenu] = useState([]);
  const [pptRangeMenu, setpptRangeMenu] = useState([]);

  const termRange = () => {
    return extraParams(
      companyId,
      "Q0006",
      state.addOpen ? state.BCoverage : record.BCoverage,
      "TermRange"
    )
      .then((resp) => {
        settermRangeMenu(resp.data.AllowedTermRange);
      })
      .catch((err) => err.message);
  };
  const pptRange = () => {
    return extraParams(
      companyId,
      "Q0006",
      state.addOpen ? state.BCoverage : record.BCoverage,
      "PptRange"
    )
      .then((resp) => {
        setpptRangeMenu(resp.data.AllowedPptRange);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    termRange();
    pptRange();
    return () => {};
  }, [state.addOpen ? state.BCoverage : record.BCoverage]);

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
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          {state.clientOpen ? (
            <CustomModal
              size={size}
              open={state.clientOpen}
              handleClose={() => dispatch({ type: ACTIONS.CLIENTCLOSE })}
            >
              <Client modalFunc={clientOpenFunc} />
            </CustomModal>
          ) : null}
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
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
                id="ClientID"
                onClick={() =>
                  state.addOpen ? dispatch({ type: ACTIONS.CLIENTOPEN }) : {}
                }
                name="ClientID"
                value={state.addOpen ? state.ClientID : record.ClientID}
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "ClientID",
                  })
                }
                placeholder="client_id"
                label="client_id"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="BCoverage"
                name="BCoverage"
                value={state.addOpen ? state.BCoverage : record.BCoverage}
                placeholder="b_coverage"
                label="b_coverage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "BCoverage",
                  })
                }
                fullWidth
                margin="dense"
              >
                {bCoverageData.map((val: any) => (
                  <MenuItem key={val.Coverage} value={val.Coverage}>
                    {val.Coverage}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="BStart Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.BStartDate : record.BStartDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date?.$d,
                        fieldName: "BStartDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                    disabled={state.editOpen}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="BTerm"
                name="BTerm"
                value={state.addOpen ? state.BTerm : record.BTerm}
                placeholder="BTerm"
                label="BTerm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "BTerm",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {termRangeMenu.map((val, index) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="BPTerm"
                name="BPTerm"
                value={state.addOpen ? state.BPTerm : record.BPTerm}
                placeholder="BPTerm"
                label="BPTerm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "BPTerm",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {pptRangeMenu.map((val, index) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BSumAssured"
                name="BSumAssured"
                value={state.addOpen ? state.BSumAssured : record.BSumAssured}
                placeholder="BSumAssured"
                label="BSumAssured"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "BSumAssured",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            {state.addOpen ? (
              intrestData.length !== 0
            ) : intrestData.length !== 0 ? (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="Interest"
                  name="Interest"
                  value={state.addOpen ? state.Interest : interest}
                  placeholder="Interest"
                  label="Interest"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "Interest",
                    })
                  }
                  fullWidth
                  margin="dense"
                >
                  {intrestData?.map((val, index) => (
                    <MenuItem value={val} key={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
            ) : null}
            {state.addOpen ? (
              bpremData.length !== 0
            ) : bpremData.length !== 0 ? (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="BPrem"
                  name="BPrem"
                  value={state.addOpen ? state.BPrem : record.BPrem}
                  placeholder="Premium"
                  label="Premium"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "BPrem",
                    })
                  }
                  fullWidth
                  margin="dense"
                ></TextField>
              </Grid2>
            ) : null}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default BenefitModal;
