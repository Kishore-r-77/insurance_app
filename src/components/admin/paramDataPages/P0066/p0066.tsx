import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0066.css";
import P0066Enq  from "./p0066Enq";

const P0066 = forwardRef((props: any, ref) => {
  


  const nameRef: any = useRef();
  const dialCodeRef: any = useRef();
  const codeRef: any = useRef();
  const flagRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.name = nameRef.current.value;
      inputdata.dialCode = dialCodeRef.current.value;
      inputdata.code = codeRef.current.value;
      inputdata.flag = flagRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0066.html`)
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
          id="name"
          name="name"
          inputRef={nameRef}
          placeholder="Name"
          label="Name"
          defaultValue={inputdata.name}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="dialCode"
          name="dialCode"
          inputRef={dialCodeRef}
          placeholder="Dial Code"
          label="Dial Code"
          defaultValue={inputdata.dialCode}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="code"
          name="code"
          inputRef={codeRef}
          placeholder="Code"
          label="Code"
          defaultValue={inputdata.code}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="flag"
          name="flag"
          inputRef={flagRef}
          placeholder="Flag"
          label="Flag"
          defaultValue={inputdata.flag}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0066Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0066;

