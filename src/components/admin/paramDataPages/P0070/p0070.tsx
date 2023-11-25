import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0070.css";
import P0070Enq  from "./p0070Enq";

const P0070 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendSwitchfeebasisRequest , status: getSwitchfeebasisResponseStatus ,  data: getSwitchfeebasisResponse , error:getSwitchfeebasisResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "SWITCHFEEBASIS";
        sendSwitchfeebasisRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const switchFeeBasisRef: any = useRef();
  const freeSwitchesRef: any = useRef();
  const feeAmountRef: any = useRef();
  const feePercentageRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.switchFeeBasis = switchFeeBasisRef.current.value;
      inputdata.freeSwitches = Number(freeSwitchesRef.current.value);
      inputdata.feeAmount = Number(feeAmountRef.current.value);
      inputdata.feePercentage = Number(feePercentageRef.current.value);

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0070.html`)
      .then(response => response.text())
      .then(content => setHtmlContent(content))
      .catch(error => console.error('Error fetching HTML file:', error));
  }

  const [htmlContent, setHtmlContent] = useState('');
  
  useEffect(() => {
    getHTML();
    return () => {}
  }, [])

  const [showHtmlContent, setShowHtmlContent] = useState(false);

  const toggleHtmlContent = () => {
    getHTML();
    setShowHtmlContent(!showHtmlContent);
  };

  const [enq, setEnq] = useState(false)

  const enqOpen = () =>{
    setEnq(true)
  }

  const enqClose = () =>{
    setEnq(false)
  }
  
  return (
    <>
    <InfoIcon
        onClick={() =>enqOpen()}
      />
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="switchFeeBasis"
          name="switchFeeBasis"
          inputRef={switchFeeBasisRef}
          placeholder="Switch Fee Basis"
          label="Switch Fee Basis"
          defaultValue={inputdata.switchFeeBasis}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSwitchfeebasisResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="freeSwitches"
          name="freeSwitches"
          inputRef={freeSwitchesRef}
          placeholder="Free Switches"
          label="Free Switches"
          defaultValue={inputdata.freeSwitches}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="feeAmount"
          name="feeAmount"
          inputRef={feeAmountRef}
          placeholder="Fee Amount"
          label="Fee Amount"
          defaultValue={inputdata.feeAmount}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="feePercentage"
          name="feePercentage"
          inputRef={feePercentageRef}
          placeholder="Fee Percentage"
          label="Fee Percentage"
          defaultValue={inputdata.feePercentage}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0070Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0070;

