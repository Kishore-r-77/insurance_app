import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0058.css";
import P0058Enq  from "./p0058Enq";

const P0058 = forwardRef((props: any, ref) => {
  
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


  const percentageRef: any = useRef();
  const noOfYearsRef: any = useRef();
  const adjustPayTermRef: any = useRef();
  const liabilityPostingRef: any = useRef();
  const certificateOfExistanceRequiredRef: any = useRef();
  const certficiateOfExistanceLeadDaysRef: any = useRef();
  const followBenefitRCDRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.percentage = Number(percentageRef.current.value);
      inputdata.noOfYears = Number(noOfYearsRef.current.value);
      inputdata.adjustPayTerm = adjustPayTermRef.current.value;
      inputdata.liabilityPosting = liabilityPostingRef.current.value;
      inputdata.certificateOfExistanceRequired = certificateOfExistanceRequiredRef.current.value;
      inputdata.certficiateOfExistanceLeadDays = Number(certficiateOfExistanceLeadDaysRef.current.value);
      inputdata.followBenefitRCD = followBenefitRCDRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0058.html`)
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
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="noOfYears"
          name="noOfYears"
          inputRef={noOfYearsRef}
          placeholder="No Of Years"
          label="No Of Years"
          defaultValue={inputdata.noOfYears}
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
          id="adjustPayTerm"
          name="adjustPayTerm"
          inputRef={adjustPayTermRef}
          placeholder="Adjust Pay Term"
          label="Adjust Pay Term"
          defaultValue={inputdata.adjustPayTerm}
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
          id="liabilityPosting"
          name="liabilityPosting"
          inputRef={liabilityPostingRef}
          placeholder="Liability Posting"
          label="Liability Posting"
          defaultValue={inputdata.liabilityPosting}
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
          id="certificateOfExistanceRequired"
          name="certificateOfExistanceRequired"
          inputRef={certificateOfExistanceRequiredRef}
          placeholder="Certificate Of Existance Required"
          label="Certificate Of Existance Required"
          defaultValue={inputdata.certificateOfExistanceRequired}
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
          id="certficiateOfExistanceLeadDays"
          name="certficiateOfExistanceLeadDays"
          inputRef={certficiateOfExistanceLeadDaysRef}
          placeholder="Certficiate Of Existance Lead Days"
          label="Certficiate Of Existance Lead Days"
          defaultValue={inputdata.certficiateOfExistanceLeadDays}
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
          id="followBenefitRCD"
          name="followBenefitRCD"
          inputRef={followBenefitRCDRef}
          placeholder="Follow Benefit RCD"
          label="Follow Benefit RCD"
          defaultValue={inputdata.followBenefitRCD}
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


        <P0058Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0058;

