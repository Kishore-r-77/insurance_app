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

import "./q0006.css";

const Q0006 = forwardRef((props: any, ref) => {
  const {
    sendRequest: sendMrtlRequest,
    status: getMrtlResponseStatus,
    data: getMrtlResponse,
    error: getMrtlResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendQ0018Request,
    status: getQ0018ResponseStatus,
    data: getQ0018Response,
    error: getQ0018ResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendQ0019Request,
    status: getQ0019ResponseStatus,
    data: getQ0019Response,
    error: getQ0019ResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendQ0020Request,
    status: getQ0020ResponseStatus,
    data: getQ0020Response,
    error: getQ0020ResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendQ0021Request,
    status: getQ0021ResponseStatus,
    data: getQ0021Response,
    error: getQ0021ResponseError,
  } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "MRTL";
    sendMrtlRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.name = "Q0018";
    sendQ0018Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });

    getDataParams.name = "Q0019";
    sendQ0019Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });

    getDataParams.name = "Q0020";
    sendQ0020Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });

    getDataParams.name = "Q0021";
    sendQ0021Request({
      apiUrlPathSuffix: "/basicservices/paramItems",
      getDataParams: getDataParams,
    });
  }, []);

  const ageCalcMethodRef: any = useRef();
  const annMethodRef: any = useRef();
  const annuityMethodRef: any = useRef();
  const commMethodRef: any = useRef();
  const deathTypeRef: any = useRef();
  const deathMethodRef: any = useRef();
  const gBonusRef: any = useRef();
  const iBonusRef: any = useRef();
  const loanMethodRef: any = useRef();
  const loyaltyBonusRef: any = useRef();
  const matMethodRef: any = useRef();
  const maxAgeRef: any = useRef();
  const maxPptRef: any = useRef();
  const maxSARef: any = useRef();
  const maxTermRef: any = useRef();
  const minAgeRef: any = useRef();
  const minPptRef: any = useRef();
  const minSARef: any = useRef();
  const minTermRef: any = useRef();
  const nFOMethodRef: any = useRef();
  const partSurrMethodRef: any = useRef();
  const premIncRef: any = useRef();
  const premIncYrsRef: any = useRef();
  const premiumMethodRef: any = useRef();
  const revBonusRef: any = useRef();
  const sBTypeRef: any = useRef();
  const sBMethodRef: any = useRef();
  const surrMethodRef: any = useRef();
  const tBonusRef: any = useRef();
  const uLDeductFrequencyRef: any = useRef();
  const gSVMethodRef: any = useRef();
  const sSVMethodRef: any = useRef();
  const bSVMethodRef: any = useRef();
  const divMethodRef: any = useRef();
  const divIMethodRef: any = useRef();
  const mortalitiesRef: any = useRef();
  const premCalcTypeRef: any = useRef();
  const discTypeRef: any = useRef();
  const discMethodRef: any = useRef();
  const frqMethodRef: any = useRef();
  const waivMethodRef: any = useRef();
  const uLALMethodRef: any = useRef();
  const uLMortFreqRef: any = useRef();
  const uLMortCalcTypeRef: any = useRef();
  const uLMortDeductMethodRef: any = useRef();
  const uLFeeFreqRef: any = useRef();
  const uLFeeTypeRef: any = useRef();
  const uLFeeMethodRef: any = useRef();
  const uLFundRulesRef: any = useRef();

  let inputdata: any = {};

  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.ageCalcMethod = ageCalcMethodRef.current.value;
      inputdata.annMethod = annMethodRef.current.value;
      inputdata.annuityMethod = annuityMethodRef.current.value;
      inputdata.commMethod = commMethodRef.current.value;
      inputdata.deathType = deathTypeRef.current.value;
      inputdata.deathMethod = deathMethodRef.current.value;
      inputdata.gBonus = gBonusRef.current.value;
      inputdata.iBonus = iBonusRef.current.value;
      inputdata.loanMethod = loanMethodRef.current.value;
      inputdata.loyaltyBonus = loyaltyBonusRef.current.value;
      inputdata.matMethod = matMethodRef.current.value;
      inputdata.maxAge = maxAgeRef.current.value;
      inputdata.maxPpt = maxPptRef.current.value;
      inputdata.maxSA = maxSARef.current.value;
      inputdata.maxTerm = maxTermRef.current.value;
      inputdata.minAge = minAgeRef.current.value;
      inputdata.minPpt = minPptRef.current.value;
      inputdata.minSA = minSARef.current.value;
      inputdata.minTerm = minTermRef.current.value;
      inputdata.nFOMethod = nFOMethodRef.current.value;
      inputdata.partSurrMethod = partSurrMethodRef.current.value;
      inputdata.premInc = premIncRef.current.value;
      inputdata.premIncYrs = premIncYrsRef.current.value;
      inputdata.premiumMethod = premiumMethodRef.current.value;
      inputdata.revBonus = revBonusRef.current.value;
      inputdata.sBType = sBTypeRef.current.value;
      inputdata.sBMethod = sBMethodRef.current.value;
      inputdata.surrMethod = surrMethodRef.current.value;
      inputdata.tBonus = tBonusRef.current.value;
      inputdata.uLDeductFrequency = uLDeductFrequencyRef.current.value;
      inputdata.gSVMethod = gSVMethodRef.current.value;
      inputdata.sSVMethod = sSVMethodRef.current.value;
      inputdata.bSVMethod = bSVMethodRef.current.value;
      inputdata.divMethod = divMethodRef.current.value;
      inputdata.divIMethod = divIMethodRef.current.value;
      inputdata.mortalities = mortalitiesRef.current.value;
      inputdata.premCalcType = premCalcTypeRef.current.value;
      inputdata.discType = discTypeRef.current.value;
      inputdata.discMethod = discMethodRef.current.value;
      inputdata.frqMethod = frqMethodRef.current.value;
      inputdata.waivMethod = waivMethodRef.current.value;
      inputdata.uLALMethod = uLALMethodRef.current.value;
      inputdata.uLMortFreq = uLMortFreqRef.current.value;
      inputdata.uLMortCalcType = uLMortCalcTypeRef.current.value;
      inputdata.uLMortDeductMethod = uLMortDeductMethodRef.current.value;
      inputdata.uLFeeFreq = uLFeeFreqRef.current.value;
      inputdata.uLFeeType = uLFeeTypeRef.current.value;
      inputdata.uLFeeMethod = uLFeeMethodRef.current.value;
      inputdata.uLFundRules = uLFundRulesRef.current.value;

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
          id="ageCalcMethod"
          name="ageCalcMethod"
          inputRef={ageCalcMethodRef}
          placeholder="Age Calc Method"
          label="Age Calc Method"
          defaultValue={inputdata.ageCalcMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="annMethod"
          name="annMethod"
          inputRef={annMethodRef}
          placeholder="Anniversay Method"
          label="Anniversay Method"
          defaultValue={inputdata.annMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="annuityMethod"
          name="annuityMethod"
          inputRef={annuityMethodRef}
          placeholder="Annuity Method"
          label="Annuity Method"
          defaultValue={inputdata.annuityMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="commMethod"
          name="commMethod"
          inputRef={commMethodRef}
          placeholder="Commission Method"
          label="Commission Method"
          defaultValue={inputdata.commMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="deathType"
          name="deathType"
          inputRef={deathTypeRef}
          placeholder="Death Type"
          label="Death Type"
          defaultValue={inputdata.deathType}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="deathMethod"
          name="deathMethod"
          inputRef={deathMethodRef}
          placeholder="Death Method"
          label="Death Method"
          defaultValue={inputdata.deathMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="gBonus"
          name="gBonus"
          inputRef={gBonusRef}
          placeholder="Guaranteed Bonus"
          label="Guaranteed Bonus"
          defaultValue={inputdata.gBonus}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="iBonus"
          name="iBonus"
          inputRef={iBonusRef}
          placeholder="Interim Bonus"
          label="Interim Bonus"
          defaultValue={inputdata.iBonus}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="loanMethod"
          name="loanMethod"
          inputRef={loanMethodRef}
          placeholder="Loan Method"
          label="Loan Method"
          defaultValue={inputdata.loanMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="loyaltyBonus"
          name="loyaltyBonus"
          inputRef={loyaltyBonusRef}
          placeholder="Loyalty Bonus"
          label="Loyalty Bonus"
          defaultValue={inputdata.loyaltyBonus}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="matMethod"
          name="matMethod"
          inputRef={matMethodRef}
          placeholder="Maturity Method"
          label="Maturity Method"
          defaultValue={inputdata.matMethod}
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
          id="maxAge"
          name="maxAge"
          inputRef={maxAgeRef}
          placeholder="Max.Age"
          label="Max.Age"
          defaultValue={inputdata.maxAge}
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
          id="maxPpt"
          name="maxPpt"
          inputRef={maxPptRef}
          placeholder="Max. PPT"
          label="Max. PPT"
          defaultValue={inputdata.maxPpt}
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
          id="maxSA"
          name="maxSA"
          inputRef={maxSARef}
          placeholder="Max. Sum Assured"
          label="Max. Sum Assured"
          defaultValue={inputdata.maxSA}
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
          id="maxTerm"
          name="maxTerm"
          inputRef={maxTermRef}
          placeholder="Max.Term"
          label="Max.Term"
          defaultValue={inputdata.maxTerm}
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
          id="minAge"
          name="minAge"
          inputRef={minAgeRef}
          placeholder="Min.Age"
          label="Min.Age"
          defaultValue={inputdata.minAge}
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
          id="minPpt"
          name="minPpt"
          inputRef={minPptRef}
          placeholder="Min.PPT"
          label="Min.PPT"
          defaultValue={inputdata.minPpt}
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
          id="minSA"
          name="minSA"
          inputRef={minSARef}
          placeholder="Min. Sum Assured"
          label="Min. Sum Assured"
          defaultValue={inputdata.minSA}
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
          id="minTerm"
          name="minTerm"
          inputRef={minTermRef}
          placeholder="Min.Term"
          label="Min.Term"
          defaultValue={inputdata.minTerm}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="nFOMethod"
          name="nFOMethod"
          inputRef={nFOMethodRef}
          placeholder="NFO Method"
          label="NFO Method"
          defaultValue={inputdata.nFOMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="partSurrMethod"
          name="partSurrMethod"
          inputRef={partSurrMethodRef}
          placeholder="Part Surr.Method"
          label="Part Surr.Method"
          defaultValue={inputdata.partSurrMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premInc"
          name="premInc"
          inputRef={premIncRef}
          placeholder="Premium Increase"
          label="Premium Increase"
          defaultValue={inputdata.premInc}
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
          id="premIncYrs"
          name="premIncYrs"
          inputRef={premIncYrsRef}
          placeholder="Prem.Incr.Years"
          label="Prem.Incr.Years"
          defaultValue={inputdata.premIncYrs}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premiumMethod"
          name="premiumMethod"
          inputRef={premiumMethodRef}
          placeholder="Premium Method"
          label="Premium Method"
          defaultValue={inputdata.premiumMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="revBonus"
          name="revBonus"
          inputRef={revBonusRef}
          placeholder="Rev.Bonus"
          label="Rev.Bonus"
          defaultValue={inputdata.revBonus}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="sBType"
          name="sBType"
          inputRef={sBTypeRef}
          placeholder="Survival Benefit Type"
          label="Survival Benefit Type"
          defaultValue={inputdata.sBType}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="sBMethod"
          name="sBMethod"
          inputRef={sBMethodRef}
          placeholder="Survival Benefit Method"
          label="Survival Benefit Method"
          defaultValue={inputdata.sBMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="surrMethod"
          name="surrMethod"
          inputRef={surrMethodRef}
          placeholder="Surrender Method"
          label="Surrender Method"
          defaultValue={inputdata.surrMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="tBonus"
          name="tBonus"
          inputRef={tBonusRef}
          placeholder="Terminal Bonus"
          label="Terminal Bonus"
          defaultValue={inputdata.tBonus}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLDeductFrequency"
          name="uLDeductFrequency"
          inputRef={uLDeductFrequencyRef}
          placeholder="UL Dededuction Frequency"
          label="UL Dededuction Frequency"
          defaultValue={inputdata.uLDeductFrequency}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="gSVMethod"
          name="gSVMethod"
          inputRef={gSVMethodRef}
          placeholder="GSV Method"
          label="GSV Method"
          defaultValue={inputdata.gSVMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="sSVMethod"
          name="sSVMethod"
          inputRef={sSVMethodRef}
          placeholder="SSV Method"
          label="SSV Method"
          defaultValue={inputdata.sSVMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="bSVMethod"
          name="bSVMethod"
          inputRef={bSVMethodRef}
          placeholder="Bonus Surr.Value Method"
          label="Bonus Surr.Value Method"
          defaultValue={inputdata.bSVMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="divMethod"
          name="divMethod"
          inputRef={divMethodRef}
          placeholder="Dividend Method"
          label="Dividend Method"
          defaultValue={inputdata.divMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="divIMethod"
          name="divIMethod"
          inputRef={divIMethodRef}
          placeholder="Dividend Interest Method"
          label="Dividend Interest Method"
          defaultValue={inputdata.divIMethod}
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
          id="mortalities"
          name="mortalities"
          inputRef={mortalitiesRef}
          placeholder="Mortalities"
          label="Mortalities"
          defaultValue={inputdata.mortalities}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getMrtlResponse?.param.data.dataPairs.map((value: any) => (
            <MenuItem key={value.code} value={value.code}>
              {value.description}
              // {value.code}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premCalcType"
          name="premCalcType"
          inputRef={premCalcTypeRef}
          placeholder="Premium Calc Type"
          label="Premium Calc Type"
          defaultValue={inputdata.premCalcType}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="discType"
          name="discType"
          inputRef={discTypeRef}
          placeholder="Discount Type"
          label="Discount Type"
          defaultValue={inputdata.discType}
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
          id="discMethod"
          name="discMethod"
          inputRef={discMethodRef}
          placeholder="Discount Method"
          label="Discount Method"
          defaultValue={inputdata.discMethod}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getQ0018Response?.data.map((value: any) => (
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
          id="frqMethod"
          name="frqMethod"
          inputRef={frqMethodRef}
          placeholder="Frequecies Method"
          label="Frequecies Method"
          defaultValue={inputdata.frqMethod}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getQ0019Response?.data.map((value: any) => (
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
          id="waivMethod"
          name="waivMethod"
          inputRef={waivMethodRef}
          placeholder="Waive Method"
          label="Waive Method"
          defaultValue={inputdata.waivMethod}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getQ0020Response?.data.map((value: any) => (
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
          id="uLALMethod"
          name="uLALMethod"
          inputRef={uLALMethodRef}
          placeholder="UL Allocation Method"
          label="UL Allocation Method"
          defaultValue={inputdata.uLALMethod}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getQ0021Response?.data.map((value: any) => (
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
          id="uLMortFreq"
          name="uLMortFreq"
          inputRef={uLMortFreqRef}
          placeholder="UL Mortality Freqencies"
          label="UL Mortality Freqencies"
          defaultValue={inputdata.uLMortFreq}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLMortCalcType"
          name="uLMortCalcType"
          inputRef={uLMortCalcTypeRef}
          placeholder="UL Mortality Calc Type"
          label="UL Mortality Calc Type"
          defaultValue={inputdata.uLMortCalcType}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLMortDeductMethod"
          name="uLMortDeductMethod"
          inputRef={uLMortDeductMethodRef}
          placeholder="UL Mortality Dedn. Method"
          label="UL Mortality Dedn. Method"
          defaultValue={inputdata.uLMortDeductMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLFeeFreq"
          name="uLFeeFreq"
          inputRef={uLFeeFreqRef}
          placeholder="UL Fee Frequency"
          label="UL Fee Frequency"
          defaultValue={inputdata.uLFeeFreq}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLFeeType"
          name="uLFeeType"
          inputRef={uLFeeTypeRef}
          placeholder="UL Fee Type"
          label="UL Fee Type"
          defaultValue={inputdata.uLFeeType}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLFeeMethod"
          name="uLFeeMethod"
          inputRef={uLFeeMethodRef}
          placeholder="UL Fee Method"
          label="UL Fee Method"
          defaultValue={inputdata.uLFeeMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>

      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="uLFundRules"
          name="uLFundRules"
          inputRef={uLFundRulesRef}
          placeholder="UL Fund Rules"
          label="UL Fund Rules"
          defaultValue={inputdata.uLFundRules}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default Q0006;
