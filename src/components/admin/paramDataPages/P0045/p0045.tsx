import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0045.css";
import P0045Enq  from "./p0045Enq";

const P0045 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendP0001Request , status: getP0001ResponseStatus ,  data: getP0001Response , error:getP0001ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendP0045Request , status: getP0045ResponseStatus ,  data: getP0045Response , error:getP0045ResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;



        getDataParams.name = "P0001";
        sendP0001Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});

        getDataParams.name = "P0045";
        sendP0045Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});


    },[]);


  const genderRef: any = useRef();
  const relatedToRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.gender = genderRef.current.value;
      inputdata.relatedTo = relatedToRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0045.html`)
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
          id="gender"
          name="gender"
          inputRef={genderRef}
          placeholder="Gender"
          label="Gender"
          defaultValue={inputdata.gender}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0001Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
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
          id="relatedTo"
          name="relatedTo"
          inputRef={relatedToRef}
          placeholder="Related To"
          label="Related To"
          defaultValue={inputdata.relatedTo&&Array.isArray(inputdata.relatedTo)?inputdata.relatedTo:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getP0045Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
            </MenuItem>
            ))}
        </TextField>
            </Grid2> 


        <P0045Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0045;

