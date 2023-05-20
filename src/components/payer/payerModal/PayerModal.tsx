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

import { getAllApi } from "../payerApis/payerApis";

import styles from "./payerModal.module.css";
import { PayerModalType } from "../../../reducerUtilities/types/payer/payerTypes";
import Policy from "../../policy/Policy";
import Client from "../../clientDetails/client/Client";
import Bank from "../../clientDetails/bank/Bank";

function PayerModal({
  state,
  record,
  policyId,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: any) {
  const addTitle: string = "Payor Add";
  const editTitle: string = "Payor Edit";
  const infoTitle: string = "Payor Info";
  const size: string = "xl";

  useEffect(() => {
    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const policyOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PolicyID = item.ID;
    } else record.PolicyID = item.ID;
    dispatch({ type: ACTIONS.POLICYCLOSE });
  };

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

  const bankOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.BankID = item.ID;
    } else record.BankID = item.ID;
    dispatch({ type: ACTIONS.BANKCLOSE });
  };

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
          state.clientOpen
            ? () => dispatch({ type: ACTIONS.CLIENTCLOSE })
            : state.bankOpen
            ? () => dispatch({ type: ACTIONS.BANKCLOSE })
            : state.addOpen
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
            {state.policyOpen ? (
              <Policy modalFunc={policyOpenFunc} />
            ) : state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
            ) : state.bankOpen ? (
              <Bank modalFunc={bankOpenFunc} />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="PolicyID"
                    name="PolicyID"
                    placeholder="Policy Number"
                    label="Policy Number"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.POLICYOPEN })}
                    value={state.addOpen ? policyId : record.PolicyID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "PolicyID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    name="ClientID"
                    placeholder="Client ID"
                    label="Client ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    value={state.addOpen ? state.ClientID : record.ClientID}
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

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="BankID"
                    name="BankID"
                    placeholder="Bank ID"
                    label="Bank ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.BANKOPEN })}
                    value={state.addOpen ? state.BankID : record.BankID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "BankID",
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
                        label="From Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.FromDate : record.FromDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "FromDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        readOnly={state.infoOpen}
                        label="To Date "
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.ToDate : record.ToDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "ToDate",
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default PayerModal;
