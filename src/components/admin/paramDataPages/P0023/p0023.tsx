import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./p0023.css";
import P0023Enq  from "./p0023Enq";

const P0023 = forwardRef((props: any, ref) => {
  


  const curSymbolRef: any = useRef();
  const curBillRef: any = useRef();
  const curCoinRef: any = useRef();
  const curWordTypeRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }


  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.curSymbol = curSymbolRef.current.value;
      inputdata.curBill = curBillRef.current.value;
      inputdata.curCoin = curCoinRef.current.value;
      inputdata.curWordType = curWordTypeRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/p0023.html`)
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
          id="curSymbol"
          name="curSymbol"
          inputRef={curSymbolRef}
          placeholder="Currency Symbol"
          label="Currency Symbol"
          defaultValue={inputdata.curSymbol}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="curBill"
          name="curBill"
          inputRef={curBillRef}
          placeholder="Currency Bill"
          label="Currency Bill"
          defaultValue={inputdata.curBill}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="curCoin"
          name="curCoin"
          inputRef={curCoinRef}
          placeholder="Currency Coin"
          label="Currency Coin"
          defaultValue={inputdata.curCoin}
          fullWidth
          margin="dense"
        />
        </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="curWordType"
          name="curWordType"
          inputRef={curWordTypeRef}
          placeholder="Currency Word Type"
          label="Currency Word Type"
          defaultValue={inputdata.curWordType}
          fullWidth
          margin="dense"
        />
        </Grid2>


        <P0023Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default P0023;

