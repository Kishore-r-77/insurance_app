import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../../utilities/modal/CustomModal";
import { useState } from "react";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

function DeathRejection({
  open,
  companyName,
  handleClose,
  id,
  policyId,
  companyId,
  getData,
  setNotify,
}: any) {
  const title = "Death Rejection";
  const size = "lg";
  const [reasonDescription, setReasonDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const deathRejectionSubmit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/rejectdeath/${id}`,
        {
          CompanyID: companyId,
          policyId,
          ReasonDescription: moment(requestedDate)
            .format("YYYYMMDD")
            .toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        
        handleClose();
        setNotify({
          isOpen: true,
          message: `Death has been Rejected Successfully`,
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
        handleFormSubmit={deathRejectionSubmit}
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
              name="ReasonDescription"
              fullWidth
              value={reasonDescription}
              onChange={(e) => setReasonDescription(e.target.value)}
              placeholder="ReasonDescription"
              label="ReasonDescription"
            />
          </Grid2>
          <Grid2 lg={6} xs={12}>
            <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="RequestedDate"
                  inputFormat="DD/MM/YYYY"
                  value={requestedDate}
                  onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                    setRequestedDate(date)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid2>
        </Grid2>
      </CustomModal>
    </div>
  );
}

export default DeathRejection;
