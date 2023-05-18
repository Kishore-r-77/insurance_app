import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import  "./q0025.css";

const Q0025 = forwardRef((props: any, ref) => {
  


  const biYrIntervalRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.biYrInterval = biYrIntervalRef.current.value;

      return inputdata;
    },
  }));

  return (
    <>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="biYrInterval"
          name="biYrInterval"
          inputRef={biYrIntervalRef}
          placeholder="BI Yearly Interval"
          label="BI Yearly Interval"
          defaultValue={inputdata.biYrInterval}
          fullWidth
          margin="dense"
        />
        </Grid2>


    </>
  );
});

export default Q0025;

