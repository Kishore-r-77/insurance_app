import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomModal from "../../../../utilities/modal/CustomModal";

import { getApi } from "../../../admin/companies/companiesApis/companiesApis";

import styles from "./campaignsModal.module.css";

//Attention: Check the path below
import { CampaignsModalType } from "../../../../reducerUtilities/types/campaigns/campaignsTypes";
import { paramItem } from "../../../receipts/receiptsApis/receiptsApis";

function CampaignsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: CampaignsModalType) {
  const addTitle: string = "Campaigns Add";
  const editTitle: string = "Campaigns Edit";
  const infoTitle: string = "Campaigns Info";
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

  const [sourceNameData, setSourceNameData] = useState([]);
  const getSourceName = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setSourceNameData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [statusData, setStatusData] = useState([]);
  const getStatus = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setStatusData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getSourceName(companyId, "P0010", languageId);
    getStatus(companyId, "P0008", languageId);

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
                select
                id="SourceName"
                name="SourceName"
                value={state.addOpen ? state.SourceName : record.SourceName}
                placeholder="Campaign Code"
                label="Campaign Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "SourceName",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {sourceNameData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ChannelCode"
                name="ChannelCode"
                value={state.addOpen ? state.ChannelCode : record.ChannelCode}
                placeholder="Channel Code"
                label="Channel Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ChannelCode",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Province"
                name="Province"
                value={state.addOpen ? state.Province : record.Province}
                placeholder="Applicable Province "
                label="Applicable Province "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Province",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Region"
                name="Region"
                value={state.addOpen ? state.Region : record.Region}
                placeholder="Applicable Region"
                label="Applicable Region"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Region",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Office"
                name="Office"
                value={state.addOpen ? state.Office : record.Office}
                placeholder="Applicable Office"
                label="Applicable Office"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Office",
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
                id="Status"
                name="Status"
                value={state.addOpen ? state.Status : record.Status}
                placeholder="Campaign Status"
                label="Campaign Status"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "Status",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {statusData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Campaign Start Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.StartDate : record.StartDate}
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
                    label="Campaign End Date"
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
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default CampaignsModal;
