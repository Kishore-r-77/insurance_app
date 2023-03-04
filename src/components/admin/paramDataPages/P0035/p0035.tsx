import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0035.css";
const P0035 = forwardRef((props: any, ref) => {
  const premPropRef: any = useRef();
  const commRecovPercetageRef: any = useRef();
  const medicalFeeRecoveryRef: any = useRef();
  const gstRecoveryRef: any = useRef();
  const stampDutyRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.premProp = premPropRef.current.value;
      inputdata.commRecovPercetage = commRecovPercetageRef.current.value;
      inputdata.medicalFeeRecovery = medicalFeeRecoveryRef.current.value;
      inputdata.gstRecovery = gstRecoveryRef.current.value;
      inputdata.stampDuty = stampDutyRef.current.value;
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
          id="premProp"
          name="premProp"
          inputRef={premPropRef}
          placeholder="Premium Recovery Proportionate"
          label="Premium Recovery Proportionate"
          defaultValue={inputdata.premProp}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="commRecovPercetage"
          name="commRecovPercetage"
          inputRef={commRecovPercetageRef}
          placeholder="Commission Recovery Percentage"
          label="Commission Recovery Percentage"
          defaultValue={inputdata.commRecovPercetage}
          fullWidth
          margin="dense"
          type="number"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="medicalFeeRecovery"
          name="medicalFeeRecovery"
          inputRef={medicalFeeRecoveryRef}
          placeholder="Medical Fee Recovery"
          label="Medical Fee Recovery "
          defaultValue={inputdata.medicalFeeRecovery}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="gstRecovery"
          name="gstRecovery"
          inputRef={gstRecoveryRef}
          placeholder="GST To Be Recovered "
          label="GST To Be Recovered"
          defaultValue={inputdata.gstRecovery}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="stampDuty"
          name="stampDuty"
          inputRef={stampDutyRef}
          placeholder="Stamp Duty To Be Recovered"
          label="Stamp Duty To Be Recovered"
          defaultValue={inputdata.stampDuty}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default P0035;
