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
import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { BankModalType } from "../../../../reducerUtilities/types/bank/bankTypes";
import { PauthType } from "../../../../reducerUtilities/types/pa/paTypes";
  import { useAppSelector } from "../../../../redux/app/hooks";
  import CustomModal from "../../../../utilities/modal/CustomModal";
  import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
  import Client from "../../client/Client";
  import styles from "./pAuthModal.module.css";
  // import { p0050, paramItem } from "../bankApis/bankApis";
  
  function PauthModal({
    state,
    record,
    dispatch,
    ACTIONS,
    handleFormSubmit,
  }: PauthType) {
    const addTitle: string = "PA Add";
    const editTitle: string = "PA Edit";
    const infoTitle: string = "PA Info";
    const size: string = "xl";
  
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
    
  
    useEffect(() => {
      getCompanyData(companyId);
      return () => {};
    }, []);
    
    const [clientId, setClientId] = useState<any>("");
    const [payerClientId, setpayerClientId] = useState<any>("")

    const clientOpenFunc = (item: any) => {
      if (state.addOpen) {
        state.ClientID = item.ID;
        setClientId(item.ID)
      } else record.ClientID = item.ID;
      dispatch({ type: ACTIONS.CLIENTCLOSE });
      
      
    };
   
    

    // const getClientByNewAgentId = () => {
    //   axios
    //     .get(
    //       `http://localhost:3000/api/v1/basicservices/clientget/${clientId}`,
    //       {
    //         withCredentials: true,
    //       }
    //     )
    //     .then((resp) => {
    //       setpayerClientId(resp.data.Client);
    //     })
    //     .catch((err) => console.log(err.message));
    // };
  
    // useEffect(() => {
    //   // getCoverage();
    //   getClientByNewAgentId();

      
    //   return () => {};
    // }, [clientId]);
  
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
            state.clientOpen
              ? () => dispatch({ type: ACTIONS.CLIENTCLOSE })
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
              {state.clientOpen ? (
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
                      onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                      id="ClientID"
                      name="ClientID"
                      value={state.addOpen ? state.ClientID : record.ClientID}
                      placeholder="Client Id"
                      label="Client Id"
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
                  {/* <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      InputProps={{ readOnly: true }}
                      id="ClientShortName"
                      name="ClientShortName"
                      value={payerClientId?.ClientShortName}
                      placeholder="ClientName"
                      label="ClientName"
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2> */}
                 
  
                  
                </>
              )}
            </Grid2>
          </form>
        </CustomModal>
      </div>
    );
  }
  
  export default PauthModal;
  