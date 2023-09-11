import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomApproveBenefit from "./CustomApproveBenefit";
import CustomSaveBenefit from "./CustomSaveBenefit";
//import CustomFuneralFullModal from "./CustomFuneralfullModal";

function ApprovIB({
  open,
  handleClose,
  handleFormSubmit,
  savebenefitobj,
  // saveibenefitOpen,
  // saveibenefitClose,
  // IBenefitData,
  IBData,
  benefitentry,
  handleIBenefitchange,
  isIBnext,
  handleIBIncidentDate,
  handleIBReceivedDate,
  benefitcheck,
  IBapprovebenefit,
  IBvalcheck,
  apBenefits,
  handleFormReject,
}: //apBenefits,
any) {
  const infoTitle: string = "Income Benefit";
  const size: string = "xl";

  // useEffect(() => {
  //   return () => {};
  // }, []);
  return (
    <div>
      <CustomApproveBenefit //ls from custommodal
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
        handleFormSubmit={handleFormSubmit}
        handleFormReject={handleFormReject}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={IBvalcheck?.CompanyID}
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
                value={IBvalcheck?.PolicyID}
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
                value={IBvalcheck?.BenefitID}
                placeholder="BenefitID"
                label="BenefitID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BCoverage"
                name="BCoverage"
                value={IBvalcheck?.BCoverage}
                placeholder="BCoverage"
                label="BCoverage"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Seqno"
                name="Seqno"
                value={IBvalcheck?.Seqno}
                placeholder="Seqno"
                label="Seqno"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Percentage"
                name="Percentage"
                value={IBvalcheck?.Percentage}
                placeholder="Percentage"
                label="Percentage"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BSumAssured"
                name="BSumAssured"
                value={IBvalcheck?.BSumAssured}
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
                    value={IBvalcheck?.EffectiveDate}
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
                    label="IncidentDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.IncidentDate}
                    onChange={(date: any) => handleIBIncidentDate(date?.$d)}
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
                    value={IBvalcheck?.ReceivedDate}
                    onChange={(date: any) => handleIBReceivedDate()}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PayFrequency"
                name="PayFrequency"
                value={IBvalcheck?.PayFrequency}
                placeholder="PayFrequency"
                label="PayFrequency"
                fullWidth
                margin="dense"
              ></TextField>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="PaidToDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.PaidToDate}
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
                value={IBvalcheck?.BStatusCode}
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
                value={IBvalcheck?.ApprovalFlag}
                placeholder="ApprovalFlag"
                label="ApprovalFlag"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CertificateExistranceFlag"
                name="CertificateExistranceFlag"
                value={IBvalcheck?.CertificateExistranceFlag}
                placeholder="CertificateExistranceFlag"
                label="Certificate Existrance Flag"
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
                    label="CertificateExistranceDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.CertificateExistranceDate}
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
                    label="CertificateExistranceRevDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.CertificateExistranceRevDate}
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
                    label="NextPayDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.NextPayDate}
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
                id="ClaimAmount"
                name="ClaimAmount"
                value={IBvalcheck?.ClaimAmount}
                placeholder="ClaimAmount"
                label="ClaimAmount"
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
                    label="BStartDate"
                    inputFormat="DD/MM/YYYY"
                    value={IBvalcheck?.BStartDate}
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
                id="TotalAmount"
                name="TotalAmount"
                value={IBvalcheck?.TotalAmount}
                placeholder="TotalAmount"
                label="TotalAmount"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            {/* {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="PaidDate"
                  name="PaidDate"
                  value={savebenefitobj.PaidDate}
                  placeholder="PaidDate"
                  label="PaidDate"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )} */}
            {/* <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="PaidDate"
                    inputFormat="DD/MM/YYYY"
                    value={savebenefitobj.PaidDate}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) => {}}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2> */}
          </Grid2>
        </form>
      </CustomApproveBenefit>
    </div>
  );
}
export default ApprovIB;
