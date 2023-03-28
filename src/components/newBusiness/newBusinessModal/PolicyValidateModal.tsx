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


import styles from "./policyValidateModal.module.css";

// Attention: Check the path below 
import { PolicyValidateModalType } from "../../../reducerUtilities/types/validatepolicy/policyValidateTypes";
import { paramItem } from "../newBusinessApis/policyValidateApis";
import Benefit from "../../nbmm/nbmmModal/benefit/Benefit";
// *** Attention: Check the path and change it if required ***

function PolicyValidateModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: PolicyValidateModalType) {
  const addTitle: string = "PolicyValidate Add"; 
  const editTitle: string = "PolicyValidate Edit";
  const infoTitle: string = "PolicyValidate Info";

  const [policyData, setPolicyIDData] = useState<any>({});
  const getPolicyIDData = (id: number) => {
    getApi(id).then((resp) => {
      setPolicyIDData(resp.data["PolicyID"]);
    });
  };

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

  const [CoverageData, setCoverageData] = useState<any>({});
  const getCoverageData = (id: number) => {
    getApi(id).then((resp) => {
      setCoverageData(resp.data["CoveragE "]);
    });
  };

  useEffect(() => {
    getCompanyData(companyId);
    getCoverageData(CoverageData );

    return () => {};
  }, []);

// *** Attention: Check the Lookup table  OPenFunc details below ***
  const benefitsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state["PolicyID"] = item.ID;
    } else record["PolicyID"] = item.ID;
    dispatch({ type: ACTIONS.POLICYCLOSE });
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
          <Grid2 container spacing={2}>
            {state.benefitsOpen ? (
              <Benefit modalFunc={benefitsOpenFunc} />
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
                onClick={() => dispatch({ type: ACTIONS.BENEFITSOPEN })}
                    value={
                      state.addOpen
                        ? state["PolicyID"]
                        : record["PolicyID"]
                    }
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
                id="Coverage "
                name="Coverage "
                // Attention: *** Check the value details  ***
                value={CoverageData?.CoverageName}
                placeholder="Coverage"
                label="Coverage"
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
                id="BPrem"
                name="BPrem"
                    value={
                      state.addOpen
                        ? state["Premium"]
                        : record["Premium"]
                    }
                placeholder="Premium "
                label="Premium "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen
                      ? ACTIONS.ONCHANGE 
                      : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Premium",
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
                id="CovrGst"
                name="CovrGst"
                    value={
                      state.addOpen
                        ? state["GST"]
                        : record["GST"]
                    }
                placeholder="GST"
                label="GST"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen
                      ? ACTIONS.ONCHANGE 
                      : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "GST",
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
                id="CovrStampduty"
                name="CovrStampduty"
                    value={
                      state.addOpen
                        ? state["StampDuty"]
                        : record["StampDuty"]
                    }
                placeholder="Stamp Duty"
                label="Stamp Duty"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen
                      ? ACTIONS.ONCHANGE 
                      : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "StampDuty",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2> 

              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default PolicyValidateModal;

