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

import "./q0005.css";

const Q0005 = forwardRef((props: any, ref) => {
  const {
    sendRequest: sendP0046Request,
    status: getP0046ResponseStatus,
    data: getP0046Response,
    error: getP0046ResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendFreqRequest,
    status: getFreqResponseStatus,
    data: getFreqResponse,
    error: getFreqResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendBcurRequest,
    status: getBcurResponseStatus,
    data: getBcurResponse,
    error: getBcurResponseError,
  } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "Q0050";

    getDataParams.item = "FREQ";
    sendFreqRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.item = "BCUR";
    sendBcurRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.name = "P0046";
    sendP0046Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });
  }, []);

  const freeLookDaysRef: any = useRef();
  const maxLivesRef: any = useRef();
  const minLivesRef: any = useRef();
  const minSurrMonthsRef: any = useRef();
  const productFamilyRef: any = useRef();
  const reinstatementMonthRef: any = useRef();
  const renewableRef: any = useRef();
  const singleRef: any = useRef();
  const frequenciesRef: any = useRef();
  const contractCurrRef: any = useRef();
  const billingCurrRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.freeLookDays = freeLookDaysRef.current.value;
      inputdata.maxLives = maxLivesRef.current.value;
      inputdata.minLives = minLivesRef.current.value;
      inputdata.minSurrMonths = minSurrMonthsRef.current.value;
      inputdata.productFamily = productFamilyRef.current.value;
      inputdata.reinstatementMonth = reinstatementMonthRef.current.value;
      inputdata.renewable = renewableRef.current.value;
      inputdata.single = singleRef.current.value;
      inputdata.frequencies = frequenciesRef.current.value;
      inputdata.contractCurr = contractCurrRef.current.value;
      inputdata.billingCurr = billingCurrRef.current.value;

      return inputdata;
    },
  }));

  return (
    <>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          type="number"
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="freeLookDays"
          name="freeLookDays"
          inputRef={freeLookDaysRef}
          placeholder="Free look Days"
          label="Free look Days"
          defaultValue={inputdata.freeLookDays}
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
          id="maxLives"
          name="maxLives"
          inputRef={maxLivesRef}
          placeholder="Maximum Lives"
          label="Maximum Lives"
          defaultValue={inputdata.maxLives}
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
          id="minLives"
          name="minLives"
          inputRef={minLivesRef}
          placeholder="Minimum Lives"
          label="Minimum Lives"
          defaultValue={inputdata.minLives}
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
          id="minSurrMonths"
          name="minSurrMonths"
          inputRef={minSurrMonthsRef}
          placeholder="Min.period for Surrender (in months)"
          label="Min.period for Surrender (in months)"
          defaultValue={inputdata.minSurrMonths}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="productFamily"
          name="productFamily"
          inputRef={productFamilyRef}
          placeholder="Product  Family"
          label="Product  Family"
          defaultValue={inputdata.productFamily}
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
          id="reinstatementMonth"
          name="reinstatementMonth"
          inputRef={reinstatementMonthRef}
          placeholder="Reinstatement from PTD (in months)"
          label="Reinstatement from PTD (in months)"
          defaultValue={inputdata.reinstatementMonth}
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
          id="renewable"
          name="renewable"
          inputRef={renewableRef}
          placeholder="Renewable  "
          label="Renewable  "
          defaultValue={inputdata.renewable}
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
          id="single"
          name="single"
          inputRef={singleRef}
          placeholder="Single "
          label="Single "
          defaultValue={inputdata.single}
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
          id="frequencies"
          name="frequencies"
          inputRef={frequenciesRef}
          placeholder="Allowable Frequencies"
          label="Allowable Frequencies"
          defaultValue={inputdata.frequencies}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getFreqResponse?.param.data.dataPairs.map((value: any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.description}
              // {value.code}
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
          id="contractCurr"
          name="contractCurr"
          inputRef={contractCurrRef}
          placeholder="Contract Currency"
          label="Contract Currency"
          defaultValue={inputdata.contractCurr}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getBcurResponse?.param.data.dataPairs.map((value: any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.description}
              // {value.code}
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
          id="billingCurr"
          name="billingCurr"
          inputRef={billingCurrRef}
          placeholder="Billing Currency"
          label="Billing Currency"
          defaultValue={inputdata.billingCurr}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getBcurResponse?.param.data.dataPairs.map((value: any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.description}
              // {value.code}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
    </>
  );
});

export default Q0005;
