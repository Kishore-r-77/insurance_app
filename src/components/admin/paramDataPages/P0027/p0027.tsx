import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0027.css";
const P0027 = forwardRef((props: any, ref) => {
  const accountCodeRef: any = useRef();
  const accountAmtRef: any = useRef();
  const seqNoRef: any = useRef();
  const glSignRef: any = useRef();
  let inputdata: any = {};

  console.log(props.data.glMovements, "Kishore %%%%%%%%%%%%%%%%%%%%%");

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.accountCode = accountCodeRef.current.value;
      inputdata.accountAmt = accountAmtRef.current.value;
      inputdata.seqNo = seqNoRef.current.value;
      inputdata.glSign = glSignRef.current.value;
      return inputdata;
    },
  }));
  console.log(inputdata, "Kishore %%%%%%%%%%%%%%%%%%%%%");

  return (
    <>
      {props.data.glMovements.map(
        (data1: {
          accountCode: unknown;
          accountAmt: unknown;
          seqNo: unknown;
          glSign: unknown;
        }) => {
          return (
            <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="accountCode"
                name="accountCode"
                inputRef={accountCodeRef}
                placeholder="accountCode Proportionate"
                label="accountCode Proportionate"
                defaultValue={data1.accountCode}
                fullWidth
                margin="dense"
              />
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="accountAmt"
                name="accountAmt"
                inputRef={accountAmtRef}
                placeholder="accountAmt"
                label="accountAmt"
                defaultValue={data1.accountAmt}
                fullWidth
                margin="dense"
              />
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="seqNo"
                name="seqNo"
                inputRef={seqNoRef}
                placeholder="seqNo Proportionate"
                label="seqNo Proportionate"
                defaultValue={data1.seqNo}
                fullWidth
                margin="dense"
              />
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="glSign"
                name="glSign"
                inputRef={glSignRef}
                placeholder="glSign"
                label="glSign"
                defaultValue={data1.glSign}
                fullWidth
                margin="dense"
              />

              <hr
                style={{
                  color: "rgb(33, 70, 199)",
                  width: "100%",
                  borderBottom: "5px solid rgb(33, 70, 199)",
                }}
              />
            </Grid2>
          );
        }
      )}
    </>
  );
});

export default P0027;
