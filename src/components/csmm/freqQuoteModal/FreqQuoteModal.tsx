import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";

function FreqQuoteModal({ open, handleClose, policyId }: any) {
  const title: string = "Frequency Quote";
  const size: string = "xl";
  const [record, setRecord] = useState<any>("");
  const getFreqQuote = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/customerservice/quotefrequencies/${policyId}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setRecord(resp.data?.Frequencies);
      })
      .catch((err) => {
        setRecord("");
      });
  };
  useEffect(() => {
    getFreqQuote();
    return () => {};
  }, [open]);

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
            <Grid2 lg={3}>
              <TextField
                id="Yearly"
                name="Yearly"
                value={record["01.Yearly"]}
                placeholder="Yearly"
                label="Yearly"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 lg={3}>
              <TextField
                id="HalfYearly"
                name="HalfYearly"
                value={record["02.HalfYearly"]}
                placeholder="HalfYearly"
                label="HalfYearly"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 lg={3}>
              <TextField
                id="Quarterly"
                name="Quarterly"
                value={record["03.Quarterly"]}
                placeholder="Quarterly"
                label="Quarterly"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 lg={3}>
              <TextField
                id="Monthly"
                name="Monthly"
                value={record["04.Monthly"]}
                placeholder="Monthly"
                label="Monthly"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
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
