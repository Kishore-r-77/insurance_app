import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomSaveBenefit from "./CustomSaveBenefit";
//import CustomFuneralFullModal from "./CustomFuneralfullModal";

function SaveIB({
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
}: any) {
  const infoTitle: string = "Income Benefit";
  const size: string = "xl";

  // useEffect(() => {
  //   return () => {};
  // }, []);
  return (
    <div>
      <CustomSaveBenefit //ls from custommodal
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
        isIBnext={isIBnext} //ls
        handleFormSubmit={handleFormSubmit}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={savebenefitobj.CompanyID}
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
                value={savebenefitobj.PolicyID}
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
                value={isIBnext ? benefitcheck.ID : savebenefitobj.BenefitID}
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
                value={savebenefitobj.BCoverage}
                placeholder="BCoverage"
                label="BCoverage"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Seqno"
                  name="Seqno"
                  value={savebenefitobj.Seqno}
                  placeholder="Seqno"
                  label="Seqno"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}

            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Percentage"
                  name="Percentage"
                  value={savebenefitobj.Percentage}
                  placeholder="Percentage"
                  label="Percentage"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BSumAssured"
                name="BSumAssured"
                value={savebenefitobj.BSumAssured}
                placeholder="BSumAssured"
                label="BSumAssured"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="EffectiveDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.EffectiveDate}
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
                      isIBnext
                        ? benefitentry.IncidentDate
                        : savebenefitobj.IncidentDate
                    }
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
                    value={
                      isIBnext
                        ? benefitentry.ReceivedDate
                        : savebenefitobj.ReceivedDate
                    }
                    onChange={(date: any) => handleIBReceivedDate(date?.$d)}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="PayFrequency"
                name="PayFrequency"
                value={
                  isIBnext
                    ? benefitentry.PayFrequency
                    : savebenefitobj.PayFrequency
                }
                placeholder="PayFrequency"
                label="PayFrequency"
                fullWidth
                margin="dense"
                onChange={(e) => handleIBenefitchange(e)}
              >
                {IBData.map((val: any, index: number) => {
                  // console.log(val.code, "code");
                  return (
                    <MenuItem value={val?.code} key={val?.code}>
                      {val?.description}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid2>
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="PaidToDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.PaidToDate}
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
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="BStatusCode"
                  name="BStatusCode"
                  value={savebenefitobj.BStatusCode}
                  placeholder="BStatusCode"
                  label="BStatusCode"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ApprovalFlag"
                  name="ApprovalFlag"
                  value={savebenefitobj.ApprovalFlag}
                  placeholder="ApprovalFlag"
                  label="ApprovalFlag"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="CertificateExistranceFlag"
                  name="CertificateExistranceFlag"
                  value={savebenefitobj.CertificateExistranceFlag}
                  placeholder="CertificateExistranceFlag"
                  label="Certificate Existrance Flag"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="CertificateExistranceDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.CertificateExistranceDate}
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
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="CertificateExistranceRevDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.CertificateExistranceRevDate}
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
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="NextPayDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.NextPayDate}
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

            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="ClaimAmount"
                  name="ClaimAmount"
                  value={savebenefitobj.ClaimAmount}
                  placeholder="ClaimAmount"
                  label="ClaimAmount"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly
                      label="BStartDate"
                      inputFormat="DD/MM/YYYY"
                      value={savebenefitobj.BStartDate}
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
            {!isIBnext && (
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="TotalAmount"
                  name="TotalAmount"
                  value={savebenefitobj.TotalAmount}
                  placeholder="TotalAmount"
                  label="TotalAmount"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>
            )}
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
      </CustomSaveBenefit>
    </div>
  );
}
export default SaveIB;
