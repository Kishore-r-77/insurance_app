import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0040.css";
const P0040 = forwardRef((props: any, ref) => {
  const medicalFeeRef: any = useRef();
  const medicalCurrRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.medicalFee = medicalFeeRef.current.value;
      inputdata.medicalCurr = medicalCurrRef.current.value;

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
          id="medicalFee"
          name="medicalFee"
          inputRef={medicalFeeRef}
          placeholder="Medical Fee Amount Maximum"
          label="Medical Fee Amount Maximum"
          defaultValue={inputdata.medicalFee}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="medicalCurr"
          name="medicalCurr"
          inputRef={medicalCurrRef}
          placeholder="Currency Code"
          label="Currency Code"
          defaultValue={inputdata.medicalCurr}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default P0040;
