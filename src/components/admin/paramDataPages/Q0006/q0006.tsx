import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./q0006.css";
const Q0006 = forwardRef((props: any, ref) => {
  const ageCalcMethodRef: any = useRef();
  const annMethodRef: any = useRef();
  const annuityMethodRef: any = useRef();
  const commMethodRef: any = useRef();
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
  const nfoMethodRef: any = useRef();
  const partSurrMethodRef: any = useRef();
  const premIncRef: any = useRef();
  const premIncYrsRef: any = useRef();
  const premiumMethodRef: any = useRef();
  const revBonusRef: any = useRef();
  const sbMethodRef: any = useRef();
  const surrMethodRef: any = useRef();
  const tBonusRef: any = useRef();
  const alMethodRef: any = useRef();
  const gsvMethodRef: any = useRef();
  const ssvMethodRef: any = useRef();
  const bsvMethodRef: any = useRef();
  const divMethodRef: any = useRef();
  const divlMethodRef: any = useRef();
  const sbTypeRef: any = useRef();
  const disTypRef: any = useRef();
  const disMethodRef: any = useRef();
  const frqMethodRef: any = useRef();
  const waivMethodRef: any = useRef();
  const ulAlMethodRef: any = useRef();
  const ulMortFreqRef: any = useRef();
  const ulMortCalcTypeRef: any = useRef();
  const ulMortDeductMethodRef: any = useRef();
  const ulFeeFreqRef: any = useRef();
  const ulFeeTypeRef: any = useRef();
  const ulFeeMethodRef: any = useRef();
  const ulFundRulesRef: any = useRef();
  const premCalcTypeRef: any = useRef();

  let inputdata: any = {};
  const currencyCodes = ["INR", "USD", "AUD", "SGD", "GBP", "EUR"];

  const freqs = [
    { code: "Y", description: "Yearly" },
    { code: "Q", description: "Quarterly" },
    { code: "H", description: "Half Yearly" },
    { code: "M", description: "Monthly" },
  ];
  if (props.data) {
    inputdata = props.data;
  }

  useImperativeHandle(ref, () => ({
    getData() {
      inputdata.ageCalcMethod = ageCalcMethodRef.current.value;
      inputdata.annMethod = annMethodRef.current.value;
      inputdata.annuityMethod = annuityMethodRef.current.value;
      inputdata.commMethod = commMethodRef.current.value;
      inputdata.deathMethod = deathMethodRef.current.value;
      inputdata.gBonus = gBonusRef.current.value;
      inputdata.iBonus = iBonusRef.current.value;
      inputdata.loanMethod = loanMethodRef.current.value;
      inputdata.loyaltyBonus = loyaltyBonusRef.current.value;
      inputdata.matMethod = matMethodRef.current.value;
      inputdata.maxPpt = maxPptRef.current.value;
      inputdata.maxAge = maxAgeRef.current.value;
      inputdata.maxSa = maxSARef.current.value;
      inputdata.maxTerm = maxTermRef.current.value;
      inputdata.minAge = minAgeRef.current.value;
      inputdata.minPpt = minPptRef.current.value;
      inputdata.minSA = minSARef.current.value;
      inputdata.minTerm = minTermRef.current.value;
      inputdata.nfoMethod = nfoMethodRef.current.value;
      inputdata.partSurrMethod = partSurrMethodRef.current.value;
      inputdata.premInc = premIncRef.current.value;
      inputdata.premIncYrs = premIncYrsRef.current.value;
      inputdata.premiumMethod = premiumMethodRef.current.value;
      inputdata.revBonus = revBonusRef.current.value;
      inputdata.sbMethod = sbMethodRef.current.value;
      inputdata.surrMethod = surrMethodRef.current.value;
      inputdata.tBonus = tBonusRef.current.value;
      inputdata.alMethod = alMethodRef.current.value;
      inputdata.gsvMethod = gsvMethodRef.current.value;
      inputdata.ssvMethod = ssvMethodRef.current.value;
      inputdata.bsvMethod = bsvMethodRef.current.value;
      inputdata.divMethod = divMethodRef.current.value;
      inputdata.divlMethod = divlMethodRef.current.value;
      inputdata.sbType = sbTypeRef.current.value;
      inputdata.disTyp = disTypRef.current.value;
      inputdata.disMethod = disMethodRef.current.value;
      inputdata.frqMethod = frqMethodRef.current.value;
      inputdata.waivMethod = waivMethodRef.current.value;
      inputdata.ulAlMethod = ulAlMethodRef.current.value;
      inputdata.ulMortFreq = ulMortFreqRef.current.value;
      inputdata.ulMortCalcType = ulMortCalcTypeRef.current.value;
      inputdata.ulMortDeductMethod = ulMortDeductMethodRef.current.value;
      inputdata.ulFeeFreq = ulFeeFreqRef.current.value;
      inputdata.ulFeeType = ulFeeTypeRef.current.value;
      inputdata.ulFeeMethod = ulFeeMethodRef.current.value;
      inputdata.ulFundRules = ulFundRulesRef.current.value;
      inputdata.premCalcType = premCalcTypeRef.current.value;
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
          placeholder="Age Calculation Method"
          label="Age Calculation Method"
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
          placeholder="Ann Method"
          label="Ann Method"
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
          placeholder="Comm Method"
          label="Comm Method"
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
          id="deathMethod"
          name="deathMethod"
          inputRef={deathMethodRef}
          placeholder="Product Family"
          label="Product Family"
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
          type="number"
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
          placeholder="Mat Method"
          label="Mat Method"
          defaultValue={inputdata.matMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="maxAge"
          name="maxAge"
          inputRef={maxAgeRef}
          placeholder="Maximum Age"
          label="Maximum Age"
          defaultValue={inputdata.maxAge}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="maxPpt"
          name="maxPpt"
          inputRef={maxPptRef}
          placeholder="Maximum PPT"
          label="Maximum PPT"
          defaultValue={inputdata.maxPpt}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="maxSa"
          name="maxSa"
          inputRef={maxSARef}
          placeholder="Maximum Sum Assured"
          label="Maximum Sum Assured"
          defaultValue={inputdata.maxSa}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="maxTerm"
          name="maxTerm"
          inputRef={maxTermRef}
          placeholder="Maximum Term"
          label="Maximum Term"
          defaultValue={inputdata.maxTerm}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minAge"
          name="minAge"
          inputRef={minAgeRef}
          placeholder="Minimum Age"
          label="Minimum Age"
          defaultValue={inputdata.minAge}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minPpt"
          name="minPpt"
          inputRef={minPptRef}
          placeholder="Minimum PPT"
          label="Minimum PPT"
          defaultValue={inputdata.minPpt}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minSA"
          name="minSA"
          inputRef={minSARef}
          placeholder="Minimum Sum Assured"
          label="Minimum Sum Assured"
          defaultValue={inputdata.minSA}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="minTerm"
          name="minTerm"
          inputRef={minTermRef}
          placeholder="Minimum Term"
          label="Minimum Term"
          defaultValue={inputdata.minTerm}
          fullWidth
          type="number"
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="nfoMethod"
          name="nfoMethod"
          inputRef={nfoMethodRef}
          placeholder="Info Method"
          label="Info Method"
          defaultValue={inputdata.nfoMethod}
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
          placeholder="Part Surrender Method"
          label="Part Surrender Method"
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
          placeholder="Premium Incoperated"
          label="Premium Incoperated"
          defaultValue={inputdata.premInc}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premIncYrs"
          name="premIncYrs"
          inputRef={premIncYrsRef}
          placeholder="Premium Incoperated Years"
          label="Premium Incoperated Years"
          defaultValue={inputdata.premIncYrs}
          fullWidth
          type="number"
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
          placeholder="Revisionary Bonus"
          label="Revisionary Bonus"
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
          id="sbMethod"
          name="sbMethod"
          inputRef={sbMethodRef}
          placeholder="SB Method"
          label="SB Method"
          defaultValue={inputdata.sbMethod}
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
          id="alMethod"
          name="alMethod"
          inputRef={alMethodRef}
          placeholder="All Method"
          label="All Method"
          defaultValue={inputdata.alMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="gsvMethod"
          name="gsvMethod"
          inputRef={gsvMethodRef}
          placeholder="GSV Method"
          label="GSV Method"
          defaultValue={inputdata.gsvMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ssvMethod"
          name="ssvMethod"
          inputRef={ssvMethodRef}
          placeholder="SSV Method"
          label="SSV Method"
          defaultValue={inputdata.ssvMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="bsvMethod"
          name="bsvMethod"
          inputRef={bsvMethodRef}
          placeholder="BSV Method"
          label="BSV Method"
          defaultValue={inputdata.bsvMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="bsvMethod"
          name="bsvMethod"
          inputRef={bsvMethodRef}
          placeholder="BSV Method"
          label="BSV Method"
          defaultValue={inputdata.bsvMethod}
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
          placeholder="Div Method"
          label="Div Method"
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
          id="divlMethod"
          name="divlMethod"
          inputRef={divlMethodRef}
          placeholder="Divl Method"
          label="Divl Method"
          defaultValue={inputdata.divlMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="sbType"
          name="sbType"
          inputRef={sbTypeRef}
          placeholder="SB Type"
          label="SB Type"
          defaultValue={inputdata.sbType}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="disTyp"
          name="disTyp"
          inputRef={disTypRef}
          placeholder="Display Type"
          label="Display Type"
          defaultValue={inputdata.disTyp}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="disMethod"
          name="disMethod"
          inputRef={disMethodRef}
          placeholder="Display Method"
          label="Display Method"
          defaultValue={inputdata.disMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="frqMethod"
          name="frqMethod"
          inputRef={frqMethodRef}
          placeholder="Frequency Method"
          label="Frequency Method"
          defaultValue={inputdata.frqMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="waivMethod"
          name="waivMethod"
          inputRef={waivMethodRef}
          placeholder="Waiver Method"
          label="Waiver Method"
          defaultValue={inputdata.waivMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulAlMethod"
          name="ulAlMethod"
          inputRef={ulAlMethodRef}
          placeholder="ULAL Method"
          label="ULAL Method"
          defaultValue={inputdata.ulAlMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulMortFreq"
          name="ulMortFreq"
          inputRef={ulMortFreqRef}
          placeholder="UL Mortality Frequency"
          label="UL Mortality Frequency"
          defaultValue={inputdata.ulMortFreq}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulMortCalcType"
          name="ulMortCalcType"
          inputRef={ulMortCalcTypeRef}
          placeholder="UL Mortality Calculation Type"
          label="UL Mortality Calculation Type"
          defaultValue={inputdata.ulMortCalcType}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulMortDeductMethod"
          name="ulMortDeductMethod"
          inputRef={ulMortDeductMethodRef}
          placeholder="UL Mortality Deduction Method"
          label="UL Mortality Deduction Method"
          defaultValue={inputdata.ulMortDeductMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulFeeFreq"
          name="ulFeeFreq"
          inputRef={ulFeeFreqRef}
          placeholder="UL Fee Frequency"
          label="UL Fee Frequency"
          defaultValue={inputdata.ulFeeFreq}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulFeeType"
          name="ulFeeType"
          inputRef={ulFeeTypeRef}
          placeholder="UL Fee Type"
          label="UL Fee Type"
          defaultValue={inputdata.ulFeeType}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulFeeMethod"
          name="ulFeeMethod"
          inputRef={ulFeeMethodRef}
          placeholder="UL Fee Method"
          label="UL Fee Method"
          defaultValue={inputdata.ulFeeMethod}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="ulFundRules"
          name="ulFundRules"
          inputRef={ulFundRulesRef}
          placeholder="UL Fund Rules"
          label="UL Fund Rules"
          defaultValue={inputdata.ulFundRules}
          fullWidth
          margin="dense"
        />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} sm={6} xl={4}>
        <TextField
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="premCalcType"
          name="premCalcType"
          inputRef={premCalcTypeRef}
          placeholder="Premium Calculation Type"
          label="Premium Calculation Type"
          defaultValue={inputdata.premCalcType}
          fullWidth
          margin="dense"
        />
      </Grid2>
    </>
  );
});

export default Q0006;
