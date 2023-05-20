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

import { getApi } from "../../../admin/companies/companiesApis/companiesApis";

import styles from "./campaignCompsModal.module.css";

//Attention: Check the path below
import { CampaignCompsModalType } from "../../../../reducerUtilities/types/campaignComps/campaignCompsTypes";
import { paramItem } from "../campaignCompsApis/campaignCompsApis";

import Campaigns from "../../campaigns/Campaigns";
function CampaignCompsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: CampaignCompsModalType) {
  const addTitle: string = "CampaignComps Add";
  const editTitle: string = "CampaignComps Edit";
  const infoTitle: string = "CampaignComps Info";
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

  const [campaignData, setCampaignIDData] = useState<any>({});
  const getCampaignIDData = (id: number) => {
    getApi(id).then((resp) => {
      setCampaignIDData(resp.data["CampaignID"]);
    });
  };

  const [basisData, setBasisData] = useState([]);
  const getBasis = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setBasisData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    // getCampaignIDData(campaignId);
    getBasis(companyId, "P0011", languageId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const campaignsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.CampaignID = item.ID;
    } else record.CampaignID = item.ID;
    dispatch({ type: ACTIONS.CAMPAIGNSCLOSE });
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
          <Grid2 container spacing={2}>
            // *** Attention: Check the below Lookup modal function details ***
            {state.campaignsOpen ? (
              <Campaigns modalFunc={campaignsOpenFunc} />
            ) : (
              <>
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
                    id="CampaignID"
                    name="CampaignID"
                    placeholder="Campaign ID"
                    label="Campaign ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.CAMPAIGNSOPEN })}
                    value={state.addOpen ? state.CampaignID : record.CampaignID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "CampaignID",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="CampaignCode"
                    name="CampaignCode"
                    value={
                      state.addOpen ? state.CampaignCode : record.CampaignCode
                    }
                    placeholder="Campaign Description"
                    label="Campaign Description"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "CampaignCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="Fee"
                    name="Fee"
                    value={state.addOpen ? state.Fee : record.Fee}
                    placeholder="Fees"
                    label="Fees"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Fee",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="Basis"
                    name="Basis"
                    value={state.addOpen ? state.Basis : record.Basis}
                    placeholder="Basis"
                    label="Basis"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "Basis",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {basisData.map((val: any) => (
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
                    id="MinLead"
                    name="MinLead"
                    value={state.addOpen ? state.MinLead : record.MinLead}
                    placeholder="Min.Number of Leads"
                    label="Min.Number of Leads"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "MinLead",
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
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen ? state.StartDate : record.StartDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "StartDate",
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
                        label="End Date"
                        inputFormat="DD/MM/YYYY"
                        value={state.addOpen ? state.EndDate : record.EndDate}
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload:date?.$d,
                            fieldName: "EndDate",
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
export default CampaignCompsModal;
