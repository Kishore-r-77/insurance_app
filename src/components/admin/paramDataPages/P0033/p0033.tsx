import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./p0033.css";
import UserGroup from "../../usergroup/UserGroup";
const P0033 = forwardRef((props: any, ref) => {
  const templateNameRef: any = useRef();
  const smsAllowedRef: any = useRef();
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
      inputdata.smsAllowed = smsAllowedRef.current.value;
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


  return (
    <>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="templateName"
          name="templateName"
          inputRef={templateNameRef}
          placeholder="templateName Proportionate"
          label="templateName Proportionate"
          defaultValue={inputdata.templateName}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="smsAllowed"
          name="smsAllowed"
          inputRef={smsAllowedRef}
          placeholder="smsAllowed"
          label="smsAllowed"
          defaultValue={inputdata.smsAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="emailAllowed"
          name="emailAllowed"
          inputRef={emailAllowedRef}
          placeholder="emailAllowed"
          label="emailAllowed"
          defaultValue={inputdata.emailAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="whatsAppAllowed"
          name="whatsAppAllowed"
          inputRef={whatsAppAllowedRef}
          placeholder="whatsAppAllowed"
          label="whatsAppAllowed"
          defaultValue={inputdata.whatsAppAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="agentSMSAllowed"
          name="agentSMSAllowed"
          inputRef={agentSMSAllowedRef}
          placeholder="agentSMSAllowed"
          label="agentSMSAllowed"
          defaultValue={inputdata.agentSMSAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="agentEmailAllowed"
          name="agentEmailAllowed"
          inputRef={agentEmailAllowedRef}
          placeholder="agentEmailAllowed"
          label="agentEmailAllowed"
          defaultValue={inputdata.agentEmailAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="agentWhatsAppAllowed"
          name="agentWhatsAppAllowed"
          inputRef={agentWhatsAppAllowedRef}
          placeholder="agentWhatsAppAllowed"
          label="agentWhatsAppAllowed"
          defaultValue={inputdata.agentWhatsAppAllowed}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="companyEmail"
          name="companyEmail"
          inputRef={companyEmailRef}
          placeholder="companyEmail"
          label="companyEmail"
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
          placeholder="companyPhone"
          label="companyPhone"
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
          placeholder="departmentName Proportionate"
          label="departmentName Proportionate"
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
          placeholder="departmentHead"
          label="departmentHead"
          defaultValue={inputdata.departmentHead}
          fullWidth
          margin="dense"
        />
      </Grid2>


    </>
  );
});

export default P0033;



