import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../utilities/modal/CustomModal";

function ResultModal({ open, handleClose, record, completed }: any) {
  const size: string = "";
  const title: string = "Result";
  return (
    <div>
      <CustomModal
        open={open}
        handleClose={handleClose}
        size={size}
        title={title}
      >
        {completed ? (
          "Success"
        ) : (
          <Grid2 container spacing={2}>
            <Grid2 lg={6}>
              <TextField
                id="Frequency"
                name="Frequency"
                value={record?.Frequency}
                placeholder="Frequency"
                label="Frequency"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 lg={6}>
              <TextField
                id="Function"
                name="Function"
                value={record?.Function}
                placeholder="Function"
                label="Function"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 lg={6}>
              <TextField
                id="PolicyID"
                name="PolicyID"
                value={record?.PolicyID}
                placeholder="PolicyID"
                label="PolicyID"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 lg={6}>
              <TextField
                id="Premium"
                name="Premium"
                value={record?.Premium}
                placeholder="Premium"
                label="Premium"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        )}
      </CustomModal>
    </div>
  );
}

export default ResultModal;
