import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomSavefuneral from "./CustomSavefuneral";

function SaveFuneral({
  open,
  handleClose,
  savefuneralobj,
  handleFormSubmit,
  handlefuneralchange,
  funeralentry,
  isnext,
  criticaltypeData,
  handleIncidentDate,
  handleReceivedDate,
  funeralcheck,
}: any) {
  const infoTitle: string = "Funeral Reason";
  const size: string = "xl";

  return (
    <div>
      <CustomSavefuneral
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
        isnext={isnext}
        handleFormSubmit={handleFormSubmit}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={savefuneralobj.CompanyID}
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
                value={savefuneralobj.PolicyID}
                placeholder="PolicyID"
                label="PolicyID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BenefitID"
                name="BenefitID"
                value={isnext ? funeralcheck.ID : savefuneralobj.BenefitID}
                placeholder="BenefitID"
                label="BenefitID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="IncidentDate"
                    inputFormat="DD/MM/YYYY"
                    value={
                      isnext
                        ? funeralentry.IncidentDate
                        : savefuneralobj.IncidentDate
                    }
                    onChange={(date: any) => handleIncidentDate(date?.$d)}
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
                      isnext
                        ? funeralentry.ReceivedDate
                        : savefuneralobj.ReceivedDate
                    }
                    onChange={(date: any) => handleReceivedDate(date?.$d)}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CriticalType"
                select
                name="CriticalType"
                value={
                  isnext
                    ? funeralentry.CriticalType
                    : savefuneralobj.CriticalType
                }
                placeholder="CriticalType"
                label="CriticalType"
                fullWidth
                margin="dense"
                onChange={(e) => handlefuneralchange(e)}
              >
                {criticaltypeData.map((val: any, index: number) => {
                  return (
                    <MenuItem value={val?.code} key={val?.code}>
                      {val?.description}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid2>
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="PaidToDate"
                      inputFormat="DD/MM/YYYY"
                      value={savefuneralobj.PaidToDate}
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
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="BStatusCode"
                  name="BStatusCode"
                  value={savefuneralobj.BStatusCode}
                  placeholder="BStatusCode"
                  label="BStatusCode"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ApprovalFlag"
                  name="ApprovalFlag"
                  value={savefuneralobj.ApprovalFlag}
                  placeholder="ApprovalFlag"
                  label="ApprovalFlag"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ClaimAmount"
                  name="ClaimAmount"
                  value={savefuneralobj.ClaimAmount}
                  placeholder="ClaimAmount"
                  label="ClaimAmount"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Percentage"
                  name="Percentage"
                  value={savefuneralobj.Percentage}
                  placeholder="Percentage"
                  label="Percentage"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ClientID"
                  name="ClientID"
                  value={savefuneralobj.ClientID}
                  placeholder="ClientID"
                  label="ClientID"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
          </Grid2>
        </form>
      </CustomSavefuneral>
    </div>
  );
}
export default SaveFuneral;
