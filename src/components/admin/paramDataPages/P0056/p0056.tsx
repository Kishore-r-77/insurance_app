import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0056.css";
import P0056Enq  from "./p0056Enq";

const P0056 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendP0056Request , status: getP0056ResponseStatus ,  data: getP0056Response , error:getP0056ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


        getDataParams.name = "P0056";
        sendP0056Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});


    },[]);


  const noOfDishoursRef: any = useRef();
  const processFlagRef: any = useRef();
  const extractionDatesRef: any = useRef();
  const netCollectionRef: any = useRef();
  const collectionFeeRef: any = useRef();
  const collectionPercentageRef: any = useRef();
  const accountEntryRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.noOfDishours = Number(noOfDishoursRef.current.value);
      inputdata.processFlag = processFlagRef.current.value;
      inputdata.extractionDates = extractionDatesRef.current.value;
      inputdata.netCollection = netCollectionRef.current.value;
      inputdata.collectionFee = Number(collectionFeeRef.current.value);
      inputdata.collectionPercentage = Number(collectionPercentageRef.current.value);
      inputdata.accountEntry = accountEntryRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0056.html`)
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
          id="noOfDishours"
          name="noOfDishours"
          inputRef={noOfDishoursRef}
          placeholder="No Of Dishours"
          label="No Of Dishours"
          defaultValue={inputdata.noOfDishours}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="processFlag"
          name="processFlag"
          inputRef={processFlagRef}
          placeholder="Process Flag"
          label="Process Flag"
          defaultValue={inputdata.processFlag}
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
        >
          {getP0056Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="netCollection"
          name="netCollection"
          inputRef={netCollectionRef}
          placeholder="Net Collection"
          label="Net Collection"
          defaultValue={inputdata.netCollection}
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
          id="collectionFee"
          name="collectionFee"
          inputRef={collectionFeeRef}
          placeholder="Collection Fee"
          label="Collection Fee"
          defaultValue={inputdata.collectionFee}
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
          id="collectionPercentage"
          name="collectionPercentage"
          inputRef={collectionPercentageRef}
          placeholder="Collection Percentage"
          label="Collection Percentage"
          defaultValue={inputdata.collectionPercentage}
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
          id="accountEntry"
          name="accountEntry"
          inputRef={accountEntryRef}
          placeholder="Account Entry"
          label="Account Entry"
          defaultValue={inputdata.accountEntry}
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


        <P0056Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0056;

