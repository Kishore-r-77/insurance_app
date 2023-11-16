import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomFuneralApproval from "./CustomFuneralApproval";

function FuneralApprovalModel({
  open,
  criticalbenefit,
  funeralapprovalClose,
  aprrovefexr,
}: any) {
  const infoTitle: string = "Approval Confirmation";
  const size: string = "xl";
  return (
    <div>
      <CustomFuneralApproval
        size={size}
        open={open}
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
                value={criticalbenefit.CompanyID}
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
                value={criticalbenefit.PolicyID}
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
                value={criticalbenefit.BenefitID}
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
                value={criticalbenefit.CriticalType}
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
                value={criticalbenefit.BSumAssured}
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
                value={criticalbenefit.EffectiveDate}
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
                value={criticalbenefit.IncidentDate}
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
                value={criticalbenefit.ReceivedDate}
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
                value={criticalbenefit.PaidToDate}
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
                value={criticalbenefit.BStatusCode}
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
                value={criticalbenefit.ApprovalFlag}
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
                value={criticalbenefit.ClaimAmount}
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
                value={criticalbenefit.Percentage}
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
                value={criticalbenefit.ClientID}
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
