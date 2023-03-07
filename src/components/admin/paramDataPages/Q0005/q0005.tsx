import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./q0005.css";
const Q0005 = forwardRef((props: any, ref) => {
  const freeLookDaysRef: any = useRef();
  const maxLivesRef: any = useRef();
  const minLivesRef: any = useRef();
  const minSurrMonthsRef: any = useRef();
  const productFamilyRef: any = useRef();
  const reinstatementMonthRef: any = useRef();
  const renewableRef: any = useRef();
  const singleRef: any = useRef();
  const billcurrRef: any = useRef();
  const frequenciesRef: any = useRef();
  const contCurrRef: any = useRef();

  let inputdata: any = {};
  const currencyCodes = ["INR", "USD", "AUD", "SGD", "GBP", "EUR"];

  const freqs = [
    { code: "Y", description: "Yearly" },
    { code: "Q", description: "Quarterly" },
    { code: "H", description: "Half Yearly" },
    { code: "M", description: "Monthly" },
  ];
  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.freeLookDays = freeLookDaysRef.current.value;
      inputdata.maxLives = maxLivesRef.current.value;
      inputdata.minLives = minLivesRef.current.value;
      inputdata.minSurrMonths = minSurrMonthsRef.current.value;
      inputdata.productFamily = productFamilyRef.current.value;
      inputdata.reinstatementMonth = reinstatementMonthRef.current.value;
      inputdata.renewable = renewableRef.current.value;
      inputdata.single = singleRef.current.value;
      inputdata.billingCurr = billcurrRef.current.value;
      inputdata.contractCurr = contCurrRef.current.value;
      inputdata.frequencies = frequenciesRef.current.value;
      return inputdata;
    },
  }));

  return (
    <>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="freeLookDays"
          name="freeLookDays"
          inputRef={freeLookDaysRef}
          placeholder="Free Look Days"
          label="Free Look Days"
          defaultValue={inputdata.freeLookDays}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="maxLives"
          name="maxLives"
          inputRef={maxLivesRef}
          placeholder="Max Lives"
          label="Max Lives"
          defaultValue={inputdata.maxLives}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minLives"
          name="minLives"
          inputRef={minLivesRef}
          placeholder="Min Lives"
          label="Min Lives"
          defaultValue={inputdata.minLives}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minSurrMonths"
          name="minSurrMonths"
          inputRef={minSurrMonthsRef}
          placeholder="Min Surr Months"
          label="Min Surr Months"
          defaultValue={inputdata.minSurrMonths}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="reinstatementMonth"
          name="reinstatementMonth"
          inputRef={reinstatementMonthRef}
          placeholder="Reinstatement Month"
          label="Reinstatement Month"
          defaultValue={inputdata.reinstatementMonth}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="productFamily"
          name="productFamily"
          inputRef={productFamilyRef}
          placeholder="Product Family"
          label="Product Family"
          defaultValue={inputdata.productFamily}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          label="Renewable"
          id="Renewable"
          placeholder="Renewable"
          name="Renewable"
          defaultValue={inputdata.renewable}
          inputRef={renewableRef}
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          <MenuItem value="Y">Yes</MenuItem>
          <MenuItem value="N">No</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          label="Single"
          id="Single"
          placeholder="Single"
          name="Single"
          defaultValue={inputdata.single}
          inputRef={singleRef}
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          <MenuItem value="Y">Yes</MenuItem>
          <MenuItem value="N">No</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          label="Billing Currency"
          id="billcurr"
          placeholder="Billing Currency"
          name="billcurr"
          defaultValue={inputdata.billingCurr}
          inputRef={billcurrRef}
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {currencyCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          label="Contract Currency"
          id="contcurr"
          placeholder="Contract Currency"
          name="contcurr"
          defaultValue={inputdata.contractCurr}
          inputRef={contCurrRef}
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {currencyCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          label="Billing Frequencies"
          id="billfreq"
          placeholder="Billing Frequencies"
          name="billfreq"
          defaultValue={inputdata.frequencies}
          inputRef={frequenciesRef}
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {freqs.map((freq) => (
            <MenuItem key={freq.code} value={freq.code}>
              {freq.description}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
    </>
  );
});

export default Q0005;
