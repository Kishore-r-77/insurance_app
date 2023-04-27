import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../../utilities/modal/CustomModal";

function ModifyDeath({
  open,
  companyName,
  handleClose,
  id,
  policyId,
  adjustedAmount,
  modifyDeathSubmit,
  setAdjustedAmount,
}: any) {
  const title = "Modify Death";
  const size = "lg";
  return (
    <div>
      <CustomModal
        title={title}
        size={size}
        open={open}
        handleClose={handleClose}
        handleFormSubmit={modifyDeathSubmit}
      >
        <Grid2 container spacing={2}>
          <Grid2 lg={6} xs={12}>
            <TextField
              name="CompanyID"
              fullWidth
              value={companyName}
              placeholder="CompanyID"
              label="CompanyID"
              inputProps={{ readOnly: true }}
            />
          </Grid2>
          <Grid2 lg={6} xs={12}>
            <TextField
              name="DeathID"
              fullWidth
              value={id}
              placeholder="DeathID"
              label="DeathID"
              inputProps={{ readOnly: true }}
            />
          </Grid2>

          <Grid2 lg={6} xs={12}>
            <TextField
              name="PolicyID"
              fullWidth
              value={policyId}
              placeholder="PolicyID"
              label="PolicyID"
              inputProps={{ readOnly: true }}
            />
          </Grid2>
          <Grid2 lg={6} xs={12}>
            <TextField
              name="AdjustedAmount"
              fullWidth
              value={adjustedAmount}
              onChange={(e) => setAdjustedAmount(e.target.value)}
              placeholder="AdjustedAmount"
              label="AdjustedAmount"
            />
          </Grid2>
        </Grid2>
      </CustomModal>
    </div>
  );
}

export default ModifyDeath;
