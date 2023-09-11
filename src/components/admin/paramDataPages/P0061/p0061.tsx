import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0061.css";
import P0061Enq  from "./p0061Enq";

const P0061 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendFundcodeRequest , status: getFundcodeResponseStatus ,  data: getFundcodeResponse , error:getFundcodeResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFundtypeRequest , status: getFundtypeResponseStatus ,  data: getFundtypeResponse , error:getFundtypeResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFundcategoryRequest , status: getFundcategoryResponseStatus ,  data: getFundcategoryResponse , error:getFundcategoryResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFundcurrRequest , status: getFundcurrResponseStatus ,  data: getFundcurrResponse , error:getFundcurrResponseError} = useHttp(getData, true); 
  const {sendRequest : sendFundchargemethodRequest , status: getFundchargemethodResponseStatus ,  data: getFundchargemethodResponse , error:getFundchargemethodResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "FUNDCODE";
        sendFundcodeRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FUNDTYPE";
        sendFundtypeRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FUNDCATEGORY";
        sendFundcategoryRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FUNDCURR";
        sendFundcurrRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "FUNDCHARGEMETHOD";
        sendFundchargemethodRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const fundCodeRef: any = useRef();
  const fundTypeRef: any = useRef();
  const fundCategoryRef: any = useRef();
  const fundCurrRef: any = useRef();
  const fundMinUnitsRef: any = useRef();
  const fundMaxUnitsRef: any = useRef();
  const fundChargeMethodRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.fundCode = fundCodeRef.current.value;
      inputdata.fundType = fundTypeRef.current.value;
      inputdata.fundCategory = fundCategoryRef.current.value;
      inputdata.fundCurr = fundCurrRef.current.value;
      inputdata.fundMinUnits = fundMinUnitsRef.current.value;
      inputdata.fundMaxUnits = fundMaxUnitsRef.current.value;
      inputdata.fundChargeMethod = fundChargeMethodRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0061.html`)
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
          id="fundCode"
          name="fundCode"
          inputRef={fundCodeRef}
          placeholder="Fund Code"
          label="Fund Code"
          defaultValue={inputdata.fundCode}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFundcodeResponse?.param.data.dataPairs.map((value:any) => (
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
          id="fundType"
          name="fundType"
          inputRef={fundTypeRef}
          placeholder="Fund Type"
          label="Fund Type"
          defaultValue={inputdata.fundType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFundtypeResponse?.param.data.dataPairs.map((value:any) => (
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
          id="fundCategory"
          name="fundCategory"
          inputRef={fundCategoryRef}
          placeholder="Fund Category"
          label="Fund Category"
          defaultValue={inputdata.fundCategory}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFundcategoryResponse?.param.data.dataPairs.map((value:any) => (
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
          id="fundCurr"
          name="fundCurr"
          inputRef={fundCurrRef}
          placeholder="Fund Currency"
          label="Fund Currency"
          defaultValue={inputdata.fundCurr}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFundcurrResponse?.param.data.dataPairs.map((value:any) => (
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
          id="fundMinUnits"
          name="fundMinUnits"
          inputRef={fundMinUnitsRef}
          placeholder="Fund Minimum Units"
          label="Fund Minimum Units"
          defaultValue={inputdata.fundMinUnits}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="fundMaxUnits"
          name="fundMaxUnits"
          inputRef={fundMaxUnitsRef}
          placeholder="Fund Maximum Units"
          label="Fund Maximum Units"
          defaultValue={inputdata.fundMaxUnits}
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
          id="fundChargeMethod"
          name="fundChargeMethod"
          inputRef={fundChargeMethodRef}
          placeholder="Fund Charge Method"
          label="Fund Charge Method"
          defaultValue={inputdata.fundChargeMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getFundchargemethodResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 


        <P0061Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0061;

