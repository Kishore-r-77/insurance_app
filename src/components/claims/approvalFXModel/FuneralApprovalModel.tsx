import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomSavefuneral from "../funeralModel/CustomSavefuneral";
import CustomFuneralApproval from "./CustomFuneralApproval";
import moment from "moment";

function FuneralApprovalModel({
  open,
  funeralapprovalClose,
  aprrovefexr,
  criticalchec,
  handleClose,
  rejectfexr,
  savefuneralobj,
  criticalcheckval,
}: any) {
  const infoTitle: string = "Approval Confirmation";
  const size: string = "xl";
  return (
    <div>
      <CustomFuneralApproval
        size={size}
        open={open}
        handlereject={rejectfexr}
        handleClose={funeralapprovalClose}
        title={infoTitle}
        handleFormSubmit={aprrovefexr}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyID"
                name="CompanyID"
                value={criticalcheckval?.CompanyID}
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
                value={criticalcheckval.PolicyID}
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
                value={criticalcheckval.BenefitID}
                placeholder="BenefitID"
                label="BenefitID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CriticalType"
                name="CriticalType"
                value={criticalcheckval.CriticalType}
                placeholder="CriticalType"
                label="CriticalType"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BSumAssured"
                name="BSumAssured"
                value={criticalcheckval.BSumAssured}
                placeholder="BSumAssured"
                label="BSumAssured"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="EffectiveDate"
                name="EffectiveDate"
                value={moment(criticalcheckval.EffectiveDate).format(
                  "DD-MM-YYYY"
                )}
                placeholder="EffectiveDate"
                label="EffectiveDate"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="IncidentDate"
                name="IncidentDate"
                value={moment(criticalcheckval.IncidentDate).format(
                  "DD-MM-YYYY"
                )}
                placeholder="IncidentDate"
                label="IncidentDate"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ReceivedDate"
                name="ReceivedDate"
                value={moment(criticalcheckval.ReceivedDate).format(
                  "DD-MM-YYYY"
                )}
                placeholder="ReceivedDate"
                label="ReceivedDate"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaidToDate"
                name="PaidToDate"
                value={moment(criticalcheckval.PaidToDate).format("DD-MM-YYYY")}
                placeholder="PaidToDate"
                label="PaidToDate"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="BStatusCode"
                name="BStatusCode"
                value={criticalcheckval.BStatusCode}
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
                value={criticalcheckval.ApprovalFlag}
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
                value={criticalcheckval.ClaimAmount}
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
                value={criticalcheckval.Percentage}
                placeholder="Percentage"
                label="Percentage"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientID"
                name="ClientID"
                value={criticalcheckval.ClientID}
                placeholder="ClientID"
                label="ClientID"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomFuneralApproval>
    </div>
  );
}
export default FuneralApprovalModel;
