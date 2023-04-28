import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../../utilities/modal/CustomModal";
import { useState } from "react";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

function DeathApproval({
  open,
  companyName,
  handleClose,
  id,
  policyId,
  companyId,
  getData,
  setNotify,
}: any) {
  const title = "Death Approval";
  const size = "lg";
  const [reasonDescription, setReasonDescription] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const deathApprovalSubmit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/approvedeath/${id}`,
        {
          //   CompanyID: companyId,
          // policyId,
          // ReasonDescription: reasonDescription,
          // RequestedDate: moment(requestedDate).format("YYYYMMDD").toString(),
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        handleClose();
        setNotify({
          isOpen: true,
          message: `Death has been Approved Succesfully`,
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
        handleFormSubmit={deathApprovalSubmit}
      >
        <h3>
          Are you sure you want to Process this Record for Death Approval?
        </h3>
        {/* <Grid2 container spacing={2}>
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
        </Grid2> */}
      </CustomModal>
    </div>
  );
}

export default DeathApproval;
