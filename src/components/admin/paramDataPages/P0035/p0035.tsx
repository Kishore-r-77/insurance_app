import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import  "./p0035.css";

const P0035 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true);

  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});
    },[]);


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

  return (
    <>
            <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premProp"
          name="premProp"
          inputRef={premPropRef}
          placeholder="Medical Fee Recovery"
          label="Medical Fee Recovery"
          defaultValue={inputdata.premProp}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="commRecovPercetage"
          name="commRecovPercetage"
          inputRef={commRecovPercetageRef}
          placeholder="Commencement Recovery Percentage"
          label="Commencement Recovery Percentage"
          defaultValue={inputdata.commRecovPercetage}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="medicalFeeRecovery"
          name="medicalFeeRecovery"
          inputRef={medicalFeeRecoveryRef}
          placeholder="Medical Fee Recovery"
          label="Medical Fee Recovery"
          defaultValue={inputdata.medicalFeeRecovery}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="gstRecovery"
          name="gstRecovery"
          inputRef={gstRecoveryRef}
          placeholder="Gst Recovery"
          label="Gst Recovery"
          defaultValue={inputdata.gstRecovery}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="stampDuty"
          name="stampDuty"
          inputRef={stampDutyRef}
          placeholder="Stamp Duty"
          label="Stamp Duty"
          defaultValue={inputdata.stampDuty}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getYesnoResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 


    </>
  );
});

export default P0035;

