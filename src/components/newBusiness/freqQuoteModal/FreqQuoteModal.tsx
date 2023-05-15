import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";
import axios from "axios";

function FreqQuoteModal({ open, handleClose, policyId, companyId }: any) {
  const title: string = "Frequency Quote";
  const size: string = "xl";
  const [record, setRecord] = useState<any>("");
  const [error, setError] = useState("");
  const getFreqQuote = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/quotefrequencies/${policyId}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setRecord(resp.data?.Frequencies);
      })
      .catch((err) => {
        console.log(err.message);
        setRecord("");
      });
  };
  useEffect(() => {
    getFreqQuote();
    return () => {};
  }, [open]);
  console.log(record, "REcord");

  return (
    <div>
      <CustomModal
        open={open}
        handleClose={handleClose}
        size={size}
        title={title}
      >
        {record !== "" ? (
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="HalfYearly"
                name="HalfYearly"
                value={record["HalfYearly "]}
                placeholder="HalfYearly"
                label="HalfYearly"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Monthly"
                name="Monthly"
                value={record["Monthly "]}
                placeholder="Monthly"
                label="Monthly"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Quarterly"
                name="Quarterly"
                value={record.Quarterly}
                placeholder="Quarterly"
                label="Quarterly"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Yearly"
                name="Yearly"
                value={record.Yearly}
                placeholder="Yearly"
                label="Yearly"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              ></TextField>
            </Grid2>
          </Grid2>
        ) : (
          <h1>No Record</h1>
        )}
      </CustomModal>
    </div>
  );
}

export default FreqQuoteModal;
