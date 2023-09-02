import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0059.css";
import P0059Enq  from "./p0059Enq";

const P0059 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendCurrentorfutureRequest , status: getCurrentorfutureResponseStatus ,  data: getCurrentorfutureResponse , error:getCurrentorfutureResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "CURRENTORFUTURE";
        sendCurrentorfutureRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const currentOrFutureRef: any = useRef();
  const seqNoRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.currentOrFuture = currentOrFutureRef.current.value;
      inputdata.seqNo = Number(seqNoRef.current.value);

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
          placeholder="Sequence No"
          label="Sequence No"
          defaultValue={inputdata.seqNo}
          fullWidth
          margin="dense"
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

