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

import styles from "./leadDetailsModal.module.css";

//Attention: Check the path below
import { paramItem } from "../leadDetailsApis/leadDetailsApis";

import LeadChannels from "../../leadChannels/LeadChannels";
import Client from "../../../clientDetails/client/Client";
import { LeadDetailsModalType } from "../../../../reducerUtilities/types/lead/leadDetails/leadDetailsTypes";
function LeadDetailsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: LeadDetailsModalType) {
  const addTitle: string = "LeadDetails Add";
  const editTitle: string = "LeadDetails Edit";
  const infoTitle: string = "LeadDetails Info";
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

  const [leadChannelData, setLeadChannelIDData] = useState<any>({});
  const getLeadChannelIDData = (id: number) => {
    getApi(id).then((resp) => {
      setLeadChannelIDData(resp.data["LeadChannelID"]);
    });
  };

  const [officeCodeData, setOfficeCodeData] = useState([]);
  const getOfficeCode = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setOfficeCodeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [clientData, setClientIDData] = useState<any>({});
  const getClientIDData = (id: number) => {
    getApi(id).then((resp) => {
      setClientIDData(resp.data["ClientID"]);
    });
  };

  const [campaignCodeData, setCampaignCodeData] = useState([]);
  const getCampaignCode = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setCampaignCodeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [productTypeData, setProductTypeData] = useState([]);
  const getProductType = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setProductTypeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [productCodeData, setProductCodeData] = useState([]);
  const getProductCode = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setProductCodeData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    //getLeadChannelData(leadChannelId);
    getOfficeCode(companyId, "P0018", languageId);
    //getClientData(clientId);
    getCampaignCode(companyId, "P0010", languageId);
    getProductType(companyId, "Q0005", languageId);
    getProductCode(companyId, "Q0006", languageId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const leadChannelsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.LeadChannelID = item.ID;
    } else record.LeadChannelID = item.ID;
    dispatch({ type: ACTIONS.LEADCHANNELSCLOSE });
  };

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
        size={size}
        handleClose={
          state.leadChannelsOpen
            ? () => dispatch({ type: ACTIONS.LEADCHANNELSCLOSE })
            : state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : state.editOpen
            ? () => dispatch({ type: ACTIONS.LEADCHANNELSCLOSE })
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
            {state.leadChannelsOpen ? (
              <LeadChannels modalFunc={leadChannelsOpenFunc} />
            ) : state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
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
                    id="LeadChannelID"
                    name="LeadChannelID"
                    placeholder="Lead Channel"
                    label="Lead Channel"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.LEADCHANNELSOPEN })}
                    value={
                      state.addOpen ? state.LeadChannelID : record.LeadChannelID
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "LeadChannelID",
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
                    id="OfficeCode"
                    name="OfficeCode"
                    value={state.addOpen ? state.OfficeCode : record.OfficeCode}
                    placeholder="Office"
                    label="Office"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "OfficeCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {officeCodeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ProviderName"
                    name="ProviderName"
                    value={
                      state.addOpen ? state.ProviderName : record.ProviderName
                    }
                    placeholder="Provider"
                    label="Provider"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProviderName",
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
                    placeholder="Client"
                    label="Client"
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
                    id="ClientName"
                    name="ClientName"
                    value={state.addOpen ? state.ClientName : record.ClientName}
                    placeholder="Client Name"
                    label="Client Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ClientName",
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
                        label="Lead Received Date"
                        inputFormat="DD/MM/YYYY"
                        value={
                          state.addOpen
                            ? state.ReceivedDate
                            : record.ReceivedDate
                        }
                        onChange={(
                          date: React.ChangeEvent<HTMLInputElement> | any
                        ) =>
                          dispatch({
                            type: state.addOpen
                              ? ACTIONS.ONCHANGE
                              : ACTIONS.EDITCHANGE,
                            payload: date?.$d,
                            fieldName: "ReceivedDate",
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
                    id="CampaignCode"
                    name="CampaignCode"
                    value={
                      state.addOpen ? state.CampaignCode : record.CampaignCode
                    }
                    placeholder="Lead Campaign Code"
                    label="Lead Campaign Code"
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
                  >
                    {campaignCodeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ProductType"
                    name="ProductType"
                    value={
                      state.addOpen ? state.ProductType : record.ProductType
                    }
                    placeholder="Product Type"
                    label="Product Type"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProductType",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {productTypeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="ProductCode"
                    name="ProductCode"
                    value={
                      state.addOpen ? state.ProductCode : record.ProductCode
                    }
                    placeholder="Product Code"
                    label="Product Code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "ProductCode",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {productCodeData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default LeadDetailsModal;
