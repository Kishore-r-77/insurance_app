import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText, Autocomplete, Box, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import axios from "axios";

import InfoIcon from "@mui/icons-material/Info";
import  "./p0059.css";
import P0059Enq  from "./p0059Enq";

const P0059 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendCurrentorfutureRequest , status: getCurrentorfutureResponseStatus ,  data: getCurrentorfutureResponse , error:getCurrentorfutureResponseError} = useHttp(getData, true); 
  const {sendRequest : sendAllocationcategoryRequest , status: getAllocationcategoryResponseStatus ,  data: getAllocationcategoryResponse , error:getAllocationcategoryResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "CURRENTORFUTURE";
        sendCurrentorfutureRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ALLOCATIONCATEGORY";
        sendAllocationcategoryRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const currentOrFutureRef: any = useRef();
  const seqNoRef: any = useRef();
  const allocationCategoryRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.currentOrFuture = currentOrFutureRef.current.value;
      inputdata.seqNo = Number(seqNoRef.current.value);
      inputdata.allocationCategory = allocationCategoryRef.current.value;
      inputdata.accountCode = accountcode1;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0059.html`)
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
  
  const [accountcodes, setaccountcodes] = useState([])

  const getAccountcodes=()=>{
    axios.get(`http://localhost:3000/api/v1/nbservices/accountcodes`,{
    withCredentials: true,
    params: {
      pageSize:0
    }})
    .then((resp)=>{
      setaccountcodes(resp.data["AccountCodes"])
      return resp.data
    })
  }
  const [accountcode1, setaccountcode1] = useState(inputdata.accountCode)


  useEffect(() => {
    getAccountcodes()

    return () => {}

    },[])

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
          id="currentOrFuture"
          name="currentOrFuture"
          inputRef={currentOrFutureRef}
          placeholder="Current Or Future"
          label="Current Or Future"
          defaultValue={inputdata.currentOrFuture}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getCurrentorfutureResponse?.param.data.dataPairs.map((value:any) => (
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
          id="seqNo"
          name="seqNo"
          inputRef={seqNoRef}
          placeholder="Sequence Nunmber"
          label="Sequence Nunmber"
          defaultValue={inputdata.seqNo}
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
          id="allocationCategory"
          name="allocationCategory"
          inputRef={allocationCategoryRef}
          placeholder="Allocation Category"
          label="Allocation Category"
          defaultValue={inputdata.allocationCategory}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getAllocationcategoryResponse?.param.data.dataPairs.map((value:any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.code} - {value.description}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
              <Autocomplete
                id="accountCode"
                options={accountcodes}
                autoHighlight
                readOnly={ props.mode === 'display' || props.mode === 'delete'}
                getOptionLabel={(option: any) => `${option.AccountCode}`}
                value={{"AccountCode":accountcode1 }}
                onChange={(_, newValue: any) => 
                setaccountcode1(newValue.AccountCode)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Account Code"
                    size="small"
                    margin="dense"
                    InputProps={{
                      ...params.InputProps,
                      readOnly: props.mode === 'display' || props.mode === 'delete',
                    }}
                  />
                )}
                fullWidth
              />
            </Grid2> 


        <P0059Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0059;

