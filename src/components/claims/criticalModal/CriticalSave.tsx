import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomSaveCritical from "./CustomSaveCritical";

function SaveCI({
  open,
  handleClose,
  handleFormSubmit,
  checkResponse,
  checkbody,
  handleCIReceivedDate,
  handleCIIncidentDate,
  isCInext,
  handleadditional,
  criticalentry,
  CriticalTypeData,
  criticalData,
}: any) {
  const infoTitle: string = " Critical Save";
  const size: string = "xl";

  // useEffect(() => {
  //   return () => {};
  // }, []);
  return (
    <div>
      <CustomSaveCritical //ls from custommodal
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
        isCInext={isCInext} //ls
        handleFormSubmit={handleFormSubmit}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={checkResponse.CompanyID}
                placeholder="CompanyID"
                label="CompanyID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PolicyID"
                name="PolicyID"
                value={checkResponse.PolicyID}
                placeholder="PolicyID"
                label="PolicyID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="CriticalType"
                name="CriticalType"
                value={
                  isCInext
                    ? criticalentry.CriticalType
                    : checkResponse.CriticalType
                }
                placeholder="CriticalType"
                label="CriticalType"
                fullWidth
                margin="dense"
                onChange={(e) => handleadditional(e)}
              >
                {CriticalTypeData.map((val: any, index: number) => {
                  // console.log(val.code, "code");
                  return (
                    <MenuItem value={val?.code} key={val?.code}>
                      {val?.description}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid2>

            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="BSumAssured"
                  name="BSumAssured"
                  value={checkResponse.BSumAssured}
                  placeholder="BSumAssured"
                  label="BSumAssured"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="EffectiveDate"
                      inputFormat="DD/MM/YYYY"
                      value={checkResponse.EffectiveDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) => {}}
                      renderInput={(params) => (
                        <TextField {...params} error={false} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>
            )}
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="IncidentDate"
                    inputFormat="DD/MM/YYYY"
                    value={
                      isCInext
                        ? criticalentry.IncidentDate
                        : checkResponse.IncidentDate
                    }
                    onChange={(date: any) => handleCIIncidentDate(date?.$d)}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="ReceivedDate"
                    inputFormat="DD/MM/YYYY"
                    value={
                      isCInext
                        ? criticalentry.ReceivedDate
                        : checkResponse.ReceivedDate
                    }
                    onChange={(date: any) => handleCIReceivedDate(date?.$d)}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="PaidDate"
                      inputFormat="DD/MM/YYYY"
                      value={checkResponse.PaidToDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) => {}}
                      renderInput={(params) => (
                        <TextField {...params} error={false} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>
            )}
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="BStatusCode"
                  name="BStatusCode"
                  value={checkResponse.BStatusCode}
                  placeholder="BStatusCode"
                  label="BStatusCode"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ApprovalFlag"
                  name="ApprovalFlag"
                  value={checkResponse.ApprovalFlag}
                  placeholder="ApprovalFlag"
                  label="ApprovalFlag"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ClaimAmount"
                  name="ClaimAmount"
                  value={checkResponse.ClaimAmount}
                  placeholder="ClaimAmount"
                  label="ClaimAmount"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isCInext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Percentage"
                  name="Percentage"
                  value={checkResponse.Percentage}
                  placeholder="Percentage"
                  label="Percentage"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
          </Grid2>
        </form>
      </CustomSaveCritical>
    </div>
  );
}
export default SaveCI;
