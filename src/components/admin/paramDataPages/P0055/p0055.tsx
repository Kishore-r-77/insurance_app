import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0055.css";
import P0055Enq  from "./p0055Enq";

const P0055 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 
  const {sendRequest : sendCaldaysRequest , status: getCaldaysResponseStatus ,  data: getCaldaysResponse , error:getCaldaysResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "CALDAYS";
        sendCaldaysRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const bankRequiredRef: any = useRef();
  const bankExtractionRef: any = useRef();
  const extractionDatesRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.bankRequired = bankRequiredRef.current.value;
      inputdata.bankExtraction = bankExtractionRef.current.value;
      inputdata.extractionDates = extractionDatesRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0055.html`)
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
          id="bankRequired"
          name="bankRequired"
          inputRef={bankRequiredRef}
          placeholder="Bank Required"
          label="Bank Required"
          defaultValue={inputdata.bankRequired}
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
          id="bankExtraction"
          name="bankExtraction"
          inputRef={bankExtractionRef}
          placeholder="Bank Extraction"
          label="Bank Extraction"
          defaultValue={inputdata.bankExtraction}
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
          id="extractionDates"
          name="extractionDates"
          inputRef={extractionDatesRef}
          placeholder="Extraction Dates"
          label="Extraction Dates"
          defaultValue={inputdata.extractionDates&&Array.isArray(inputdata.extractionDates)?inputdata.extractionDates:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getCaldaysResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 


        <P0055Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0055;
