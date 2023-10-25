import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0067.css";
import P0067Enq  from "./p0067Enq";

const P0067 = forwardRef((props: any, ref) => {
  


  const taxSectionRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.taxSection = taxSectionRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0067.html`)
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
          id="taxSection"
          name="taxSection"
          inputRef={taxSectionRef}
          placeholder="Tax Section"
          label="Tax Section"
          defaultValue={inputdata.taxSection}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0067Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0067;

