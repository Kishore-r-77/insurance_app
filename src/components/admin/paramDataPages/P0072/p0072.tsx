import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText, Autocomplete, Box, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import axios from "axios";

import InfoIcon from "@mui/icons-material/Info";
import  "./p0072.css";
import P0072Enq  from "./p0072Enq";

const P0072 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendSimpleorcompoundRequest , status: getSimpleorcompoundResponseStatus ,  data: getSimpleorcompoundResponse , error:getSimpleorcompoundResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFreqRequest , status: getFreqResponseStatus ,  data: getFreqResponse , error:getFreqResponseError} = useHttp(getData, true); 
  const {sendRequest : sendLoancapRequest , status: getLoancapResponseStatus ,  data: getLoancapResponse , error:getLoancapResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "SIMPLEORCOMPOUND";
        sendSimpleorcompoundRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FREQ";
        sendFreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "LoanCapitalization";
        sendLoancapRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

    },[]);


  const minLoanAmountRef: any = useRef();
  const maxLoanPercentageRef: any = useRef();
  const loanInterestTypeRef: any = useRef();
  const intPayableFreqRef: any = useRef();
  const rateOfInterestRef: any = useRef();
  const stampDutyRateRef: any = useRef();
  const loanCapitalizationRef: any = useRef();
  const capitalizationFrequencyRef: any = useRef();
  const toleranceAmountRef: any = useRef();
  const prevLoanToBeClosedRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.minLoanAmount = minLoanAmountRef.current.value;
      inputdata.maxLoanPercentage = Number(maxLoanPercentageRef.current.value);
      inputdata.loanInterestType = loanInterestTypeRef.current.value;
      inputdata.intPayableFreq = intPayableFreqRef.current.value;
      inputdata.rateOfInterest = rateOfInterestRef.current.value;
      inputdata.stampDutyRate = stampDutyRateRef.current.value;
      inputdata.loanCapitalization = loanCapitalizationRef.current.value;
      inputdata.capitalizationFrequency = capitalizationFrequencyRef.current.value;
      inputdata.toleranceAmount = Number(toleranceAmountRef.current.value);
      inputdata.prevLoanToBeClosed = prevLoanToBeClosedRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0072.html`)
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
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minLoanAmount"
          name="minLoanAmount"
          inputRef={minLoanAmountRef}
          placeholder="Minimum Loan Amount"
          label="Minimum Loan Amount"
          defaultValue={inputdata.minLoanAmount}
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
          id="maxLoanPercentage"
          name="maxLoanPercentage"
          inputRef={maxLoanPercentageRef}
          placeholder="Max.Loan Percentage"
          label="Max.Loan Percentage"
          defaultValue={inputdata.maxLoanPercentage}
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
          id="loanInterestType"
          name="loanInterestType"
          inputRef={loanInterestTypeRef}
          placeholder="Loan Interest Type"
          label="Loan Interest Type"
          defaultValue={inputdata.loanInterestType}
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
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="intPayableFreq"
          name="intPayableFreq"
          inputRef={intPayableFreqRef}
          placeholder="Interest Payable Frequency"
          label="Interest Payable Frequency"
          defaultValue={inputdata.intPayableFreq}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFreqResponse?.param.data.dataPairs.map((value:any) => (
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
          id="rateOfInterest"
          name="rateOfInterest"
          inputRef={rateOfInterestRef}
          placeholder="Rate of Interest"
          label="Rate of Interest"
          defaultValue={inputdata.rateOfInterest}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="stampDutyRate"
          name="stampDutyRate"
          inputRef={stampDutyRateRef}
          placeholder="StampDutyRate"
          label="StampDutyRate"
          defaultValue={inputdata.stampDutyRate}
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
          id="loanCapitalization"
          name="loanCapitalization"
          inputRef={loanCapitalizationRef}
          placeholder="Loan Capitalization  "
          label="Loan Capitalization  "
          defaultValue={inputdata.loanCapitalization}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getLoancapResponse?.param.data.dataPairs.map((value:any) => (
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
          id="capitalizationFrequency"
          name="capitalizationFrequency"
          inputRef={capitalizationFrequencyRef}
          placeholder="CapitalizationFrequency"
          label="CapitalizationFrequency"
          defaultValue={inputdata.capitalizationFrequency}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFreqResponse?.param.data.dataPairs.map((value:any) => (
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
          id="toleranceAmount"
          name="toleranceAmount"
          inputRef={toleranceAmountRef}
          placeholder="ToleranceAmount"
          label="ToleranceAmount"
          defaultValue={inputdata.toleranceAmount}
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
          id="prevLoanToBeClosed"
          name="prevLoanToBeClosed"
          inputRef={prevLoanToBeClosedRef}
          placeholder="Is previous loan to be closed"
          label="Is previous loan to be closed"
          defaultValue={inputdata.prevLoanToBeClosed}
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


        <P0072Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0072;

