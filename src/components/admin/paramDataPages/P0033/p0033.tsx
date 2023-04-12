import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import "./p0033.css";

const P0033 = forwardRef((props: any, ref) => {
  const {
    sendRequest: sendP0046Request,
    status: getP0046ResponseStatus,
    data: getP0046Response,
    error: getP0046ResponseError,
  } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0046";
    sendP0046Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });
  }, []);

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
          placeholder="SMSAllowed"
          label="SMSAllowed"
          defaultValue={inputdata.sMSAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
          id="emailAllowed"
          name="emailAllowed"
          inputRef={emailAllowedRef}
          placeholder="Email Allowed"
          label="Email Allowed"
          defaultValue={inputdata.emailAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
          id="whatsAppAllowed"
          name="whatsAppAllowed"
          inputRef={whatsAppAllowedRef}
          placeholder="WhatsApp Allowed"
          label="WhatsApp Allowed"
          defaultValue={inputdata.whatsAppAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
          id="agentSMSAllowed"
          name="agentSMSAllowed"
          inputRef={agentSMSAllowedRef}
          placeholder="SMS to Agent Allowed"
          label="SMS to Agent Allowed"
          defaultValue={inputdata.agentSMSAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
          id="agentEmailAllowed"
          name="agentEmailAllowed"
          inputRef={agentEmailAllowedRef}
          placeholder="Email to Agentl Allowed"
          label="Email to Agentl Allowed"
          defaultValue={inputdata.agentEmailAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
          id="agentWhatsAppAllowed"
          name="agentWhatsAppAllowed"
          inputRef={agentWhatsAppAllowedRef}
          placeholder="WhatsApp to Agent Allowed"
          label="WhatsApp to Agent Allowed"
          defaultValue={inputdata.agentWhatsAppAllowed}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value: any) => (
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
    </>
  );
});

export default P0033;
