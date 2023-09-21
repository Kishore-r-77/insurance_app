import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../../utilities/modal/CustomModal";
import { useState } from "react";
import axios from "axios";

function ModifyDeath({
  open,
  companyName,
  handleClose,
  id,
  policyId,
  companyId,
  getData,
  setNotify,
}: any) {
  const title = "Modify Death";
  const size = "lg";

  const [adjustedAmount, setAdjustedAmount] = useState("");

  const modifyDeathSubmit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/deathmodify`,
        {
          CompanyID: companyId,
          ID: id,
          PolicyID: policyId,
          AdjustedAmount: parseInt(adjustedAmount),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        
        handleClose();
        setNotify({
          isOpen: true,
          message: `Updated Successfully`,
          type: "success",
        });
        getData();
      })
      .catch((err) => console.log(err));
  };
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
              placeholder="Adjusted Amount"
              label="Adjusted Amount"
            />
          </Grid2>
        </Grid2>
      </CustomModal>
    </div>
  );
}

export default ModifyDeath;
