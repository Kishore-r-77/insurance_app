import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import CustomCIapprove from "./CustomCIapprove";

function AprroveCI({
  open,
  handleClose,
  handleFormSubmit,
  handleCIReceivedDate,
  handleCIIncidentDate,
  isCInext,
  criticalentry,
  Criticalcheckval,
  handleReject,
  isclick,
}: any) {
  const infoTitle: string = "Critical Approve ";
  const size: string = "xl";

  return (
    <div>
      <CustomCIapprove
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
        handleFormSubmit={handleFormSubmit}
        handleReject={handleReject}
        isclick={isclick}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={Criticalcheckval?.CompanyID}
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
                value={Criticalcheckval?.PolicyID}
                placeholder="PolicyID"
                label="PolicyID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CriticalType"
                name="CriticalType"
                value={Criticalcheckval?.CriticalType}
                placeholder="CriticalType"
                label="CriticalType"
                fullWidth
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BSumAssured"
                name="BSumAssured"
                value={Criticalcheckval?.BSumAssured}
                placeholder="BSumAssured"
                label="BSumAssured"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="EffectiveDate"
                    inputFormat="DD/MM/YYYY"
                    value={Criticalcheckval?.EffectiveDate}
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
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="IncidentDate"
                    inputFormat="DD/MM/YYYY"
                    value={Criticalcheckval?.IncidentDate}
                    onChange={(date: any) => handleCIIncidentDate(date)}
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
                    readOnly
                    label="ReceivedDate"
                    inputFormat="DD/MM/YYYY"
                    value={
                      isCInext
                        ? criticalentry.ReceivedDate
                        : Criticalcheckval?.ReceivedDate
                    }
                    onChange={(date: any) => handleCIReceivedDate(date)}
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
                    readOnly
                    label="PaidDate"
                    inputFormat="DD/MM/YYYY"
                    value={Criticalcheckval?.PaidToDate}
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

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BStatusCode"
                name="BStatusCode"
                value={Criticalcheckval?.BStatusCode}
                placeholder="BStatusCode"
                label="BStatusCode"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ApprovalFlag"
                name="ApprovalFlag"
                value={Criticalcheckval?.ApprovalFlag}
                placeholder="ApprovalFlag"
                label="ApprovalFlag"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClaimAmount"
                name="ClaimAmount"
                value={Criticalcheckval?.ClaimAmount}
                placeholder="ClaimAmount"
                label="ClaimAmount"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Percentage"
                name="Percentage"
                value={Criticalcheckval?.Percentage}
                placeholder="Percentage"
                label="Percentage"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomCIapprove>
    </div>
  );
}
export default AprroveCI;
