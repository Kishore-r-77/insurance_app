import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0033.css";
import P0033Enq  from "./p0033Enq";

const P0033 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});



    },[]);


  const templateNameRef: any = useRef();
  const sMSAllowedRef: any = useRef();
  const emailAllowedRef: any = useRef();
  const whatsAppAllowedRef: any = useRef();
  const agentSMSAllowedRef: any = useRef();
  const agentEmailAllowedRef: any = useRef();
  const agentWhatsAppAllowedRef: any = useRef();
  const companyEmailRef: any = useRef();
  const companyPhoneRef: any = useRef();
  const departmentNameRef: any = useRef();
  const departmentHeadRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.templateName = templateNameRef.current.value;
      inputdata.sMSAllowed = sMSAllowedRef.current.value;
      inputdata.emailAllowed = emailAllowedRef.current.value;
      inputdata.whatsAppAllowed = whatsAppAllowedRef.current.value;
      inputdata.agentSMSAllowed = agentSMSAllowedRef.current.value;
      inputdata.agentEmailAllowed = agentEmailAllowedRef.current.value;
      inputdata.agentWhatsAppAllowed = agentWhatsAppAllowedRef.current.value;
      inputdata.companyEmail = companyEmailRef.current.value;
      inputdata.companyPhone = companyPhoneRef.current.value;
      inputdata.departmentName = departmentNameRef.current.value;
      inputdata.departmentHead = departmentHeadRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0033.html`)
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
          id="templateName"
          name="templateName"
          inputRef={templateNameRef}
          placeholder="Template Name"
          label="Template Name"
          defaultValue={inputdata.templateName}
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
          id="sMSAllowed"
          name="sMSAllowed"
          inputRef={sMSAllowedRef}
          placeholder="Is SMS Allowed"
          label="Is SMS Allowed"
          defaultValue={inputdata.sMSAllowed}
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
          id="emailAllowed"
          name="emailAllowed"
          inputRef={emailAllowedRef}
          placeholder="Is Email Allowed"
          label="Is Email Allowed"
          defaultValue={inputdata.emailAllowed}
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
          id="whatsAppAllowed"
          name="whatsAppAllowed"
          inputRef={whatsAppAllowedRef}
          placeholder="Is WhatsApp Allowed"
          label="Is WhatsApp Allowed"
          defaultValue={inputdata.whatsAppAllowed}
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
          id="agentSMSAllowed"
          name="agentSMSAllowed"
          inputRef={agentSMSAllowedRef}
          placeholder="Is Agent SMS Allowed"
          label="Is Agent SMS Allowed"
          defaultValue={inputdata.agentSMSAllowed}
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
          id="agentEmailAllowed"
          name="agentEmailAllowed"
          inputRef={agentEmailAllowedRef}
          placeholder="Is Agent Email Allowed"
          label="Is Agent Email Allowed"
          defaultValue={inputdata.agentEmailAllowed}
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
          id="agentWhatsAppAllowed"
          name="agentWhatsAppAllowed"
          inputRef={agentWhatsAppAllowedRef}
          placeholder="Is Agent WhatsApp Allowed"
          label="Is Agent WhatsApp Allowed"
          defaultValue={inputdata.agentWhatsAppAllowed}
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
          id="companyEmail"
          name="companyEmail"
          inputRef={companyEmailRef}
          placeholder="Company Email"
          label="Company Email"
          defaultValue={inputdata.companyEmail}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="companyPhone"
          name="companyPhone"
          inputRef={companyPhoneRef}
          placeholder="Company Phone"
          label="Company Phone"
          defaultValue={inputdata.companyPhone}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="departmentName"
          name="departmentName"
          inputRef={departmentNameRef}
          placeholder="Department Name"
          label="Department Name"
          defaultValue={inputdata.departmentName}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="departmentHead"
          name="departmentHead"
          inputRef={departmentHeadRef}
          placeholder="Department Head"
          label="Department Head"
          defaultValue={inputdata.departmentHead}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0033Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0033;

