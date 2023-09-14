import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0063.css";
import P0063Enq  from "./p0063Enq";

const P0063 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendSimpleorcompoundRequest , status: getSimpleorcompoundResponseStatus ,  data: getSimpleorcompoundResponse , error:getSimpleorcompoundResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "SIMPLEORCOMPOUND";
        sendSimpleorcompoundRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const flatAmountRef: any = useRef();
  const fundValPercentageRef: any = useRef();
  const percentageRef: any = useRef();
  const simpleOrCompoundRef: any = useRef();
  const capAmountRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.flatAmount = Number(flatAmountRef.current.value);
      inputdata.fundValPercentage = Number(fundValPercentageRef.current.value);
      inputdata.percentage = Number(percentageRef.current.value);
      inputdata.simpleOrCompound = simpleOrCompoundRef.current.value;
      inputdata.capAmount = Number(capAmountRef.current.value);

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0063.html`)
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
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="flatAmount"
          name="flatAmount"
          inputRef={flatAmountRef}
          placeholder="Flat Amount Per Year"
          label="Flat Amount Per Year"
          defaultValue={inputdata.flatAmount}
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
          id="fundValPercentage"
          name="fundValPercentage"
          inputRef={fundValPercentageRef}
          placeholder="Fund Value Percentage"
          label="Fund Value Percentage"
          defaultValue={inputdata.fundValPercentage}
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
          id="percentage"
          name="percentage"
          inputRef={percentageRef}
          placeholder="Percentage"
          label="Percentage"
          defaultValue={inputdata.percentage}
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
          id="simpleOrCompound"
          name="simpleOrCompound"
          inputRef={simpleOrCompoundRef}
          placeholder="Simple Or Compound"
          label="Simple Or Compound"
          defaultValue={inputdata.simpleOrCompound}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSimpleorcompoundResponse?.param.data.dataPairs.map((value:any) => (
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
          id="capAmount"
          name="capAmount"
          inputRef={capAmountRef}
          placeholder="Cap Amount Per Year"
          label="Cap Amount Per Year"
          defaultValue={inputdata.capAmount}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0063Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0063;

