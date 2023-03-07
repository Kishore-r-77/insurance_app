import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0030.css";
const P0030 = forwardRef((props: any, ref) => {
  const bankAccountRef: any = useRef();
  const glAccountRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.bankAccount = bankAccountRef.current.value;
      inputdata.glAccount = glAccountRef.current.value;
      return inputdata;
    },
  }));
  console.log(inputdata, "Kishore %%%%%%%%%%%%%%%%%%%%%");

  return (
    <>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="bankAccount"
          name="bankAccount"
          inputRef={bankAccountRef}
          placeholder="bankAccount Proportionate"
          label="bankAccount Proportionate"
          defaultValue={inputdata.bankAccount}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="glAccount"
          name="glAccount"
          inputRef={glAccountRef}
          placeholder="glAccount"
          label="glAccount"
          defaultValue={inputdata.glAccount}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default P0030;
