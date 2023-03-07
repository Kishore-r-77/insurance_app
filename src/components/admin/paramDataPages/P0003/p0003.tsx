import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0003.css";
const P0003 = forwardRef((props: any, ref) => {
  const ConvertibleRef: any = useRef();
  const LimitedPeriodRef: any = useRef();
  const ProdcutFamilyRef: any = useRef();
  const RidersAllowedRef: any = useRef();
  const SavingsRef: any = useRef();
  const UINRef: any = useRef();
  const MaturityRef: any = useRef();
  const CommissionMethodRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.Convertible = ConvertibleRef.current.value;
      inputdata.LimitedPeriod = LimitedPeriodRef.current.value;
      inputdata.ProdcutFamily = ProdcutFamilyRef.current.value;
      inputdata.RidersAllowed = RidersAllowedRef.current.value;
      inputdata.Savings = SavingsRef.current.value;
      inputdata.UIN = UINRef.current.value;
      inputdata.Maturity = MaturityRef.current.value;
      inputdata.CommissionMethod = CommissionMethodRef.current.value;
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
          id="Convertible"
          name="Convertible"
          inputRef={ConvertibleRef}
          placeholder="Convertible Proportionate"
          label="Convertible Proportionate"
          defaultValue={inputdata.Convertible}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="LimitedPeriod"
          name="LimitedPeriod"
          inputRef={LimitedPeriodRef}
          placeholder="LimitedPeriod"
          label="LimitedPeriod"
          defaultValue={inputdata.LimitedPeriod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ProdcutFamily"
          name="ProdcutFamily"
          inputRef={ProdcutFamilyRef}
          placeholder="Prodcut Family"
          label="Prodcut Family"
          defaultValue={inputdata.ProdcutFamily}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="RidersAllowed"
          name="RidersAllowed"
          inputRef={RidersAllowedRef}
          placeholder="Riders Allowed"
          label="Riders Allowed"
          defaultValue={inputdata.RidersAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="Savings"
          name="Savings"
          inputRef={SavingsRef}
          placeholder="Savings"
          label="Savings"
          defaultValue={inputdata.Savings}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="UIN"
          name="UIN"
          inputRef={UINRef}
          placeholder="UIN"
          label="UIN"
          defaultValue={inputdata.UIN}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="Maturity"
          name="Maturity"
          inputRef={MaturityRef}
          placeholder="Maturity"
          label="Maturity"
          defaultValue={inputdata.Maturity}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="CommissionMethod"
          name="CommissionMethod"
          inputRef={CommissionMethodRef}
          placeholder="CommissionMethod"
          label="CommissionMethod"
          defaultValue={inputdata.CommissionMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default P0003;
