import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./q0005.css";
import Q0005Enq  from "./q0005Enq";

const Q0005 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendQ0004Request , status: getQ0004ResponseStatus ,  data: getQ0004Response , error:getQ0004ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFreqRequest , status: getFreqResponseStatus ,  data: getFreqResponse , error:getFreqResponseError} = useHttp(getData, true); 
  const {sendRequest : sendCcurRequest , status: getCcurResponseStatus ,  data: getCcurResponse , error:getCcurResponseError} = useHttp(getData, true); 
  const {sendRequest : sendBcurRequest , status: getBcurResponseStatus ,  data: getBcurResponse , error:getBcurResponseError} = useHttp(getData, true); 
  const {sendRequest : sendAgencychannelRequest , status: getAgencychannelResponseStatus ,  data: getAgencychannelResponse , error:getAgencychannelResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FREQ";
        sendFreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "CCUR";
        sendCcurRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "BCUR";
        sendBcurRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "AGENCYCHANNEL";
        sendAgencychannelRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


        getDataParams.name = "Q0004";
        sendQ0004Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});


    },[]);


  const freeLookDaysRef: any = useRef();
  const maxLivesRef: any = useRef();
  const minLivesRef: any = useRef();
  const minSurrMonthsRef: any = useRef();
  const productFamilyRef: any = useRef();
  const reinstatementMonthRef: any = useRef();
  const renewableRef: any = useRef();
  const singleRef: any = useRef();
  const frequenciesRef: any = useRef();
  const contractCurrRef: any = useRef();
  const billingCurrRef: any = useRef();
  const componentAddAtAnyTimeRef: any = useRef();
  const futurePremAdjRef: any = useRef();
  const futurePremAdjYrsRef: any = useRef();
  const lapsedDaysRef: any = useRef();
  const billingLeadDaysRef: any = useRef();
  const lapseInterestRef: any = useRef();
  const agencyChannelRef: any = useRef();
  const backDateAllowedRef: any = useRef();
  const noLapseGuaranteeRef: any = useRef();
  const noLapseGuaranteeMonthsRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.freeLookDays = Number(freeLookDaysRef.current.value);
      inputdata.maxLives = Number(maxLivesRef.current.value);
      inputdata.minLives = Number(minLivesRef.current.value);
      inputdata.minSurrMonths = Number(minSurrMonthsRef.current.value);
      inputdata.productFamily = productFamilyRef.current.value;
      inputdata.reinstatementMonth = Number(reinstatementMonthRef.current.value);
      inputdata.renewable = renewableRef.current.value;
      inputdata.single = singleRef.current.value;
      inputdata.frequencies = frequenciesRef.current.value;
      inputdata.contractCurr = contractCurrRef.current.value;
      inputdata.billingCurr = billingCurrRef.current.value;
      inputdata.componentAddAtAnyTime = componentAddAtAnyTimeRef.current.value;
      inputdata.futurePremAdj = futurePremAdjRef.current.value;
      inputdata.futurePremAdjYrs = Number(futurePremAdjYrsRef.current.value);
      inputdata.lapsedDays = Number(lapsedDaysRef.current.value);
      inputdata.billingLeadDays = Number(billingLeadDaysRef.current.value);
      inputdata.lapseInterest = Number(lapseInterestRef.current.value);
      inputdata.agencyChannel = agencyChannelRef.current.value;
      inputdata.backDateAllowed = backDateAllowedRef.current.value;
      inputdata.noLapseGuarantee = noLapseGuaranteeRef.current.value;
      inputdata.noLapseGuaranteeMonths = Number(noLapseGuaranteeMonthsRef.current.value);

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/q0005.html`)
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
          id="freeLookDays"
          name="freeLookDays"
          inputRef={freeLookDaysRef}
          placeholder="Free look Days"
          label="Free look Days"
          defaultValue={inputdata.freeLookDays}
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
          id="maxLives"
          name="maxLives"
          inputRef={maxLivesRef}
          placeholder="Maximum Lives"
          label="Maximum Lives"
          defaultValue={inputdata.maxLives}
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
          id="minLives"
          name="minLives"
          inputRef={minLivesRef}
          placeholder="Minimum Lives"
          label="Minimum Lives"
          defaultValue={inputdata.minLives}
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
          id="minSurrMonths"
          name="minSurrMonths"
          inputRef={minSurrMonthsRef}
          placeholder="Min.period for Surrender (in months)"
          label="Min.period for Surrender (in months)"
          defaultValue={inputdata.minSurrMonths}
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
          id="productFamily"
          name="productFamily"
          inputRef={productFamilyRef}
          placeholder="Product  Family"
          label="Product  Family"
          defaultValue={inputdata.productFamily}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getQ0004Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
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
          id="reinstatementMonth"
          name="reinstatementMonth"
          inputRef={reinstatementMonthRef}
          placeholder="Reinstatement from PTD (in months)"
          label="Reinstatement from PTD (in months)"
          defaultValue={inputdata.reinstatementMonth}
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
          id="renewable"
          name="renewable"
          inputRef={renewableRef}
          placeholder="Renewable  "
          label="Renewable  "
          defaultValue={inputdata.renewable}
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
          id="single"
          name="single"
          inputRef={singleRef}
          placeholder="Single life"
          label="Single life"
          defaultValue={inputdata.single}
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
          id="frequencies"
          name="frequencies"
          inputRef={frequenciesRef}
          placeholder="Allowable Frequencies"
          label="Allowable Frequencies"
          defaultValue={inputdata.frequencies}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
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
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="contractCurr"
          name="contractCurr"
          inputRef={contractCurrRef}
          placeholder="Contract Currency"
          label="Contract Currency"
          defaultValue={inputdata.contractCurr&&Array.isArray(inputdata.contractCurr)?inputdata.contractCurr:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getCcurResponse?.param.data.dataPairs.map((value:any) => (
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
          id="billingCurr"
          name="billingCurr"
          inputRef={billingCurrRef}
          placeholder="Billing Currency"
          label="Billing Currency"
          defaultValue={inputdata.billingCurr&&Array.isArray(inputdata.billingCurr)?inputdata.billingCurr:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getBcurResponse?.param.data.dataPairs.map((value:any) => (
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
          id="componentAddAtAnyTime"
          name="componentAddAtAnyTime"
          inputRef={componentAddAtAnyTimeRef}
          placeholder="Component Add At AnyTime flag"
          label="Component Add At AnyTime flag"
          defaultValue={inputdata.componentAddAtAnyTime}
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
          id="futurePremAdj"
          name="futurePremAdj"
          inputRef={futurePremAdjRef}
          placeholder="FuturePremAdj         "
          label="FuturePremAdj         "
          defaultValue={inputdata.futurePremAdj}
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
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="futurePremAdjYrs"
          name="futurePremAdjYrs"
          inputRef={futurePremAdjYrsRef}
          placeholder="Future Premium Adj (in years)"
          label="Future Premium Adj (in years)"
          defaultValue={inputdata.futurePremAdjYrs}
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
          id="lapsedDays"
          name="lapsedDays"
          inputRef={lapsedDaysRef}
          placeholder="Grace period (in Days) "
          label="Grace period (in Days) "
          defaultValue={inputdata.lapsedDays}
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
          id="billingLeadDays"
          name="billingLeadDays"
          inputRef={billingLeadDaysRef}
          placeholder="Billing Lead Days (Before Due date)"
          label="Billing Lead Days (Before Due date)"
          defaultValue={inputdata.billingLeadDays}
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
          id="lapseInterest"
          name="lapseInterest"
          inputRef={lapseInterestRef}
          placeholder="Lapse Interest"
          label="Lapse Interest"
          defaultValue={inputdata.lapseInterest}
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
          id="agencyChannel"
          name="agencyChannel"
          inputRef={agencyChannelRef}
          placeholder="Agency Channel"
          label="Agency Channel"
          defaultValue={inputdata.agencyChannel&&Array.isArray(inputdata.agencyChannel)?inputdata.agencyChannel:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getAgencychannelResponse?.param.data.dataPairs.map((value:any) => (
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
          id="backDateAllowed"
          name="backDateAllowed"
          inputRef={backDateAllowedRef}
          placeholder="Back Date Allowed"
          label="Back Date Allowed"
          defaultValue={inputdata.backDateAllowed}
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
          id="noLapseGuarantee"
          name="noLapseGuarantee"
          inputRef={noLapseGuaranteeRef}
          placeholder="No Lapse Guarantee"
          label="No Lapse Guarantee"
          defaultValue={inputdata.noLapseGuarantee}
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
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="noLapseGuaranteeMonths"
          name="noLapseGuaranteeMonths"
          inputRef={noLapseGuaranteeMonthsRef}
          placeholder="No Lapse Guarantee Months"
          label="No Lapse Guarantee Months"
          defaultValue={inputdata.noLapseGuaranteeMonths}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <Q0005Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default Q0005;

