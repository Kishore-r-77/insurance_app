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
            <Grid2 lg={4}>
              <TextField
                id="No Of Dues"
                name="No Of Dues"
                value={record?.NoOfDues}
                placeholder="No Of Dues"
                label="No Of Dues"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 lg={4}>
              <TextField
                id="Total Premium"
                name="Total Premium"
                value={record?.TotalPrem}
                placeholder="Total Premium"
                label="Total Premium"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 lg={4}>
              <TextField
                id="GST"
                name="GST"
                value={record?.TotalGST}
                placeholder="GST"
                label="GST"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 lg={4}>
              <TextField
                id="Total Amount"
                name="Total Amount"
                value={record?.TotalAmount}
                placeholder="Total Amount"
                label="Total Amount"
                fullWidth
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                margin="dense"
              ></TextField>
            </Grid2>
          </Grid2>
        )}
      </CustomModal>
    </div>
  );
}

export default ResultModal;
