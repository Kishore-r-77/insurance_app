import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import styles from "./ilpPricesModal.module.css";
import axios from "axios";
import useHttp from "../../../hooks/use-http";
import { IlpPricesModalType } from "../../../reducerUtilities/types/ilpPrices/ilpPricesTypes";
import { getData } from "../../../services/http-service";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
function IlpPricesModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  p0061Data,
  setp0061Data,
}: IlpPricesModalType) {
  const addTitle: string = "IlpPrices Add";
  const editTitle: string = "IlpPrices Edit";
  const infoTitle: string = "IlpPrices Info";
  const size: string = "xl";

  const {
    sendRequest: sendUlpfundsRequest,
    status: getUlpfundsResponseStatus,
    data: getUlpfundsResponse,
    error: getUlpfundsResponseError,
  } = useHttp(getData, true);
  const { sendRequest: sendFundtypeRequest } = useHttp(getData, true);
  const { sendRequest: sendFcurRequest } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "FUNDCODE";
    sendUlpfundsRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.item = "FundType";
    sendFundtypeRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.item = "FUNDCURR";
    sendFcurRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });
  }, []);

  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const getP0061 = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "P0061",
          date: "20230101",
          company_id: companyId,
          item: state.FundCode,
          function: "P0061",
        },
      })
      .then((resp) => {
        setp0061Data(resp.data.P0061[0]);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getP0061();
    return () => {};
  }, [state.FundCode]);

  useEffect(() => {
    getCompanyData(companyId);

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
                InputLabelProps={{ shrink: true }}
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
                select
                id="FundCode"
                InputLabelProps={{ shrink: true }}
                name="FundCode"
                value={state.addOpen ? state.FundCode : record.FundCode}
                placeholder="Fund Code"
                label="Fund Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FundCode",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              >
                {getUlpfundsResponse?.param.data.dataPairs.map((value: any) => (
                  <MenuItem key={value.code} value={value.code}>
                    {value.code} - {value.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                // select
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
                id="FundType"
                name="FundType"
                value={state.addOpen ? p0061Data?.FundType : record.FundType}
                placeholder="Fund Type"
                label="Fund Type"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FundType",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              ></TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Fund Date Date"
                    inputFormat="DD/MM/YYYY"
                    value={state.addOpen ? state.FundDate : record.FundDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "FundDate",
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
                    label="Fund Eff Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen ? state.FundEffDate : record.FundEffDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "FundEffDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                // select
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="FundCurr"
                name="FundCurr"
                value={state.addOpen ? p0061Data.FundCurr : record.FundCurr}
                placeholder="Fund Currency"
                label="Fund Currency"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FundCurr",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                SelectProps={{
                  multiple: false,
                }}
              ></TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                id="FundBidPrice"
                name="FundBidPrice"
                InputLabelProps={{ shrink: true }}
                value={state.addOpen ? state.FundBidPrice : record.FundBidPrice}
                placeholder="Fund Bid Price"
                label="Fund Bid Price"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FundBidPrice",
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
                id="FundOfferPrice"
                name="FundOfferPrice"
                InputLabelProps={{ shrink: true }}
                value={
                  state.addOpen ? state.FundOfferPrice : record.FundOfferPrice
                }
                placeholder="Fund Offer Price"
                label="Fund Offer Price"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FundOfferPrice",
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
export default IlpPricesModal;
