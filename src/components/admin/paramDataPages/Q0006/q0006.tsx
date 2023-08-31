import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { TextField, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";

import InfoIcon from "@mui/icons-material/Info";

import  "./q0006.css";
import Q0006Enq  from "./q0006Enq";

const Q0006 = forwardRef((props: any, ref) => {
  
  const {sendRequest : sendAgecalcmRequest , status: getAgecalcmResponseStatus ,  data: getAgecalcmResponse , error:getAgecalcmResponseError} = useHttp(getData, true); 
  const {sendRequest : sendAnnivermRequest , status: getAnnivermResponseStatus ,  data: getAnnivermResponse , error:getAnnivermResponseError} = useHttp(getData, true); 
  const {sendRequest : sendAnnuitymRequest , status: getAnnuitymResponseStatus ,  data: getAnnuitymResponse , error:getAnnuitymResponseError} = useHttp(getData, true); 
  const {sendRequest : sendCommismRequest , status: getCommismResponseStatus ,  data: getCommismResponse , error:getCommismResponseError} = useHttp(getData, true); 
  const {sendRequest : sendDeathtypRequest , status: getDeathtypResponseStatus ,  data: getDeathtypResponse , error:getDeathtypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendDeathmRequest , status: getDeathmResponseStatus ,  data: getDeathmResponse , error:getDeathmResponseError} = useHttp(getData, true); 
  const {sendRequest : sendGuabonmethRequest , status: getGuabonmethResponseStatus ,  data: getGuabonmethResponse , error:getGuabonmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendInterimbonmRequest , status: getInterimbonmResponseStatus ,  data: getInterimbonmResponse , error:getInterimbonmResponseError} = useHttp(getData, true); 
  const {sendRequest : sendLoanmethRequest , status: getLoanmethResponseStatus ,  data: getLoanmethResponse , error:getLoanmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendLoyalbonmethRequest , status: getLoyalbonmethResponseStatus ,  data: getLoyalbonmethResponse , error:getLoyalbonmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendMaturitymRequest , status: getMaturitymResponseStatus ,  data: getMaturitymResponse , error:getMaturitymResponseError} = useHttp(getData, true); 
  const {sendRequest : sendAgeallRequest , status: getAgeallResponseStatus ,  data: getAgeallResponse , error:getAgeallResponseError} = useHttp(getData, true); 
  const {sendRequest : sendPrptRequest , status: getPrptResponseStatus ,  data: getPrptResponse , error:getPrptResponseError} = useHttp(getData, true); 
  const {sendRequest : sendTermRequest , status: getTermResponseStatus ,  data: getTermResponse , error:getTermResponseError} = useHttp(getData, true); 
  const {sendRequest : sendNfomethRequest , status: getNfomethResponseStatus ,  data: getNfomethResponse , error:getNfomethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendPartsurrmRequest , status: getPartsurrmResponseStatus ,  data: getPartsurrmResponse , error:getPartsurrmResponseError} = useHttp(getData, true); 
  const {sendRequest : sendP0046Request , status: getP0046ResponseStatus ,  data: getP0046Response , error:getP0046ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendPremmethRequest , status: getPremmethResponseStatus ,  data: getPremmethResponse , error:getPremmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendRevbonmRequest , status: getRevbonmResponseStatus ,  data: getRevbonmResponse , error:getRevbonmResponseError} = useHttp(getData, true); 
  const {sendRequest : sendSurvbentypRequest , status: getSurvbentypResponseStatus ,  data: getSurvbentypResponse , error:getSurvbentypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendSurvbenmethRequest , status: getSurvbenmethResponseStatus ,  data: getSurvbenmethResponse , error:getSurvbenmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendSurrendmethRequest , status: getSurrendmethResponseStatus ,  data: getSurrendmethResponse , error:getSurrendmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendTermlbonmethRequest , status: getTermlbonmethResponseStatus ,  data: getTermlbonmethResponse , error:getTermlbonmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUldednfreqRequest , status: getUldednfreqResponseStatus ,  data: getUldednfreqResponse , error:getUldednfreqResponseError} = useHttp(getData, true); 
  const {sendRequest : sendGsvmethRequest , status: getGsvmethResponseStatus ,  data: getGsvmethResponse , error:getGsvmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendSsvmethRequest , status: getSsvmethResponseStatus ,  data: getSsvmethResponse , error:getSsvmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendBonsurrmethRequest , status: getBonsurrmethResponseStatus ,  data: getBonsurrmethResponse , error:getBonsurrmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendDividendmethRequest , status: getDividendmethResponseStatus ,  data: getDividendmethResponse , error:getDividendmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendDivintmethRequest , status: getDivintmethResponseStatus ,  data: getDivintmethResponse , error:getDivintmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendMrtlRequest , status: getMrtlResponseStatus ,  data: getMrtlResponse , error:getMrtlResponseError} = useHttp(getData, true); 
  const {sendRequest : sendPremcalctypRequest , status: getPremcalctypResponseStatus ,  data: getPremcalctypResponse , error:getPremcalctypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendPremdisctypRequest , status: getPremdisctypResponseStatus ,  data: getPremdisctypResponse , error:getPremdisctypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendQ0018Request , status: getQ0018ResponseStatus ,  data: getQ0018Response , error:getQ0018ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendQ0019Request , status: getQ0019ResponseStatus ,  data: getQ0019Response , error:getQ0019ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendQ0020Request , status: getQ0020ResponseStatus ,  data: getQ0020Response , error:getQ0020ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendQ0021Request , status: getQ0021ResponseStatus ,  data: getQ0021Response , error:getQ0021ResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlmortfreqRequest , status: getUlmortfreqResponseStatus ,  data: getUlmortfreqResponse , error:getUlmortfreqResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlmortcalctypRequest , status: getUlmortcalctypResponseStatus ,  data: getUlmortcalctypResponse , error:getUlmortcalctypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlmortdednmethRequest , status: getUlmortdednmethResponseStatus ,  data: getUlmortdednmethResponse , error:getUlmortdednmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlfeefreqRequest , status: getUlfeefreqResponseStatus ,  data: getUlfeefreqResponse , error:getUlfeefreqResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlfeetypRequest , status: getUlfeetypResponseStatus ,  data: getUlfeetypResponse , error:getUlfeetypResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlfeemethRequest , status: getUlfeemethResponseStatus ,  data: getUlfeemethResponse , error:getUlfeemethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendUlfundruleRequest , status: getUlfundruleResponseStatus ,  data: getUlfundruleResponse , error:getUlfundruleResponseError} = useHttp(getData, true); 
  const {sendRequest : sendMrtmethRequest , status: getMrtmethResponseStatus ,  data: getMrtmethResponse , error:getMrtmethResponseError} = useHttp(getData, true); 
  const {sendRequest : sendMrtintRequest , status: getMrtintResponseStatus ,  data: getMrtintResponse , error:getMrtintResponseError} = useHttp(getData, true); 
  const {sendRequest : sendBenefittypeRequest , status: getBenefittypeResponseStatus ,  data: getBenefittypeResponse , error:getBenefittypeResponseError} = useHttp(getData, true); 
  const {sendRequest : sendYesnoRequest , status: getYesnoResponseStatus ,  data: getYesnoResponse , error:getYesnoResponseError} = useHttp(getData, true); 


  useEffect(() => {
    let getDataParams:any = {}
        getDataParams.companyId = 1;
        getDataParams.languageId =  1;
        getDataParams.seqno =  0;

        getDataParams.name =  "P0050";

        getDataParams.item = "AGECALCM";
        sendAgecalcmRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ANNIVERM";
        sendAnnivermRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ANNUITYM";
        sendAnnuitymRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "COMMISM";
        sendCommismRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "DEATHTYP";
        sendDeathtypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "DEATHM";
        sendDeathmRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "GUABONMETH";
        sendGuabonmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "INTERIMBONM";
        sendInterimbonmRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "LOANMETH";
        sendLoanmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "LOYALBONMETH";
        sendLoyalbonmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "MATURITYM";
        sendMaturitymRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "AGEALL";
        sendAgeallRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "PRPT";
        sendPrptRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "TERM";
        sendTermRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "NFOMETH";
        sendNfomethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "PARTSURRM";
        sendPartsurrmRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "PREMMETH";
        sendPremmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "REVBONM";
        sendRevbonmRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "SURVBENTYP";
        sendSurvbentypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "SURVBENMETH";
        sendSurvbenmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "SURRENDMETH";
        sendSurrendmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "TERMLBONMETH";
        sendTermlbonmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULDEDNFREQ";
        sendUldednfreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "GSVMETH";
        sendGsvmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "SSVMETH";
        sendSsvmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "BONSURRMETH";
        sendBonsurrmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "DIVIDENDMETH";
        sendDividendmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "DIVINTMETH";
        sendDivintmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "MRTL";
        sendMrtlRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "PREMCALCTYP";
        sendPremcalctypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "PREMDISCTYP";
        sendPremdisctypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULMORTFREQ";
        sendUlmortfreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULMORTCALCTYP";
        sendUlmortcalctypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULMORTDEDNMETH";
        sendUlmortdednmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULFEEFREQ";
        sendUlfeefreqRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULFEETYP";
        sendUlfeetypRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULFEEMETH";
        sendUlfeemethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "ULFUNDRULE";
        sendUlfundruleRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "MRTMETH";
        sendMrtmethRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "MRTINT";
        sendMrtintRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "BENEFITTYPE";
        sendBenefittypeRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});

        getDataParams.item = "YESNO";
        sendYesnoRequest({apiUrlPathSuffix : '/basicservices/paramItem' , getDataParams :getDataParams});


        getDataParams.name = "P0046";
        sendP0046Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});

        getDataParams.name = "Q0018";
        sendQ0018Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});

        getDataParams.name = "Q0019";
        sendQ0019Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});

        getDataParams.name = "Q0020";
        sendQ0020Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});

        getDataParams.name = "Q0021";
        sendQ0021Request({apiUrlPathSuffix : '/basicservices/paramItems' , getDataParams :getDataParams});


    },[]);


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
  const ageRangeRef: any = useRef();
  const pptRangeRef: any = useRef();
  const maxSARef: any = useRef();
  const termRangeRef: any = useRef();
  const minRiskCessAgeRef: any = useRef();
  const maxRiskCessAgeRef: any = useRef();
  const minPremCessAgeRef: any = useRef();
  const maxPremCessAgeRef: any = useRef();
  const maxTermBeyondTermRef: any = useRef();
  const minSARef: any = useRef();
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
  const mrtaMethodRef: any = useRef();
  const mrtaInterestRef: any = useRef();
  const benefitTypeRef: any = useRef();
  const commissionOnExtraIndRef: any = useRef();

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
      inputdata.ageRange = ageRangeRef.current.value;
      inputdata.pptRange = pptRangeRef.current.value;
      inputdata.maxSA = Number(maxSARef.current.value);
      inputdata.termRange = termRangeRef.current.value;
      inputdata.minRiskCessAge = Number(minRiskCessAgeRef.current.value);
      inputdata.maxRiskCessAge = Number(maxRiskCessAgeRef.current.value);
      inputdata.minPremCessAge = Number(minPremCessAgeRef.current.value);
      inputdata.maxPremCessAge = Number(maxPremCessAgeRef.current.value);
      inputdata.maxTermBeyondTerm = Number(maxTermBeyondTermRef.current.value);
      inputdata.minSA = Number(minSARef.current.value);
      inputdata.nFOMethod = nFOMethodRef.current.value;
      inputdata.partSurrMethod = partSurrMethodRef.current.value;
      inputdata.premInc = premIncRef.current.value;
      inputdata.premIncYrs = Number(premIncYrsRef.current.value);
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
      inputdata.mrtaMethod = mrtaMethodRef.current.value;
      inputdata.mrtaInterest = mrtaInterestRef.current.value;
      inputdata.benefitType = benefitTypeRef.current.value;
      inputdata.commissionOnExtraInd = commissionOnExtraIndRef.current.value;

      return inputdata;
    },
  }));

  const getHTML =()=>{
    fetch(`/q0006.html`)
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
          select
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
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getAgecalcmResponse?.param.data.dataPairs.map((value:any) => (
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
          id="annMethod"
          name="annMethod"
          inputRef={annMethodRef}
          placeholder="Anniversay Method"
          label="Anniversay Method"
          defaultValue={inputdata.annMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getAnnivermResponse?.param.data.dataPairs.map((value:any) => (
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
          id="annuityMethod"
          name="annuityMethod"
          inputRef={annuityMethodRef}
          placeholder="Annuity Method"
          label="Annuity Method"
          defaultValue={inputdata.annuityMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getAnnuitymResponse?.param.data.dataPairs.map((value:any) => (
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
          id="commMethod"
          name="commMethod"
          inputRef={commMethodRef}
          placeholder="Commission Method"
          label="Commission Method"
          defaultValue={inputdata.commMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getCommismResponse?.param.data.dataPairs.map((value:any) => (
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
          id="deathType"
          name="deathType"
          inputRef={deathTypeRef}
          placeholder="Death Type"
          label="Death Type"
          defaultValue={inputdata.deathType&&Array.isArray(inputdata.deathType)?inputdata.deathType:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getDeathtypResponse?.param.data.dataPairs.map((value:any) => (
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
          id="deathMethod"
          name="deathMethod"
          inputRef={deathMethodRef}
          placeholder="Death Method"
          label="Death Method"
          defaultValue={inputdata.deathMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getDeathmResponse?.param.data.dataPairs.map((value:any) => (
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
          id="gBonus"
          name="gBonus"
          inputRef={gBonusRef}
          placeholder="Guaranteed Bonus"
          label="Guaranteed Bonus"
          defaultValue={inputdata.gBonus}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getGuabonmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="iBonus"
          name="iBonus"
          inputRef={iBonusRef}
          placeholder="Interim Bonus"
          label="Interim Bonus"
          defaultValue={inputdata.iBonus}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getInterimbonmResponse?.param.data.dataPairs.map((value:any) => (
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
          id="loanMethod"
          name="loanMethod"
          inputRef={loanMethodRef}
          placeholder="Loan Method"
          label="Loan Method"
          defaultValue={inputdata.loanMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getLoanmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="loyaltyBonus"
          name="loyaltyBonus"
          inputRef={loyaltyBonusRef}
          placeholder="Loyalty Bonus"
          label="Loyalty Bonus"
          defaultValue={inputdata.loyaltyBonus}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getLoyalbonmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="matMethod"
          name="matMethod"
          inputRef={matMethodRef}
          placeholder="Maturity Method"
          label="Maturity Method"
          defaultValue={inputdata.matMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getMaturitymResponse?.param.data.dataPairs.map((value:any) => (
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
          id="ageRange"
          name="ageRange"
          inputRef={ageRangeRef}
          placeholder="Allowable Ages (at entry)"
          label="Allowable Ages (at entry)"
          defaultValue={inputdata.ageRange&&Array.isArray(inputdata.ageRange)?inputdata.ageRange:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getAgeallResponse?.param.data.dataPairs.map((value:any) => (
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
          id="pptRange"
          name="pptRange"
          inputRef={pptRangeRef}
          placeholder="Allowable Prem.Paying Terms"
          label="Allowable Prem.Paying Terms"
          defaultValue={inputdata.pptRange&&Array.isArray(inputdata.pptRange)?inputdata.pptRange:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getPrptResponse?.param.data.dataPairs.map((value:any) => (
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
          select
          inputProps={{
            readOnly: props.mode === "display" || props.mode === "delete",
          }}
          id="termRange"
          name="termRange"
          inputRef={termRangeRef}
          placeholder="Allowable Policy Terms"
          label="Allowable Policy Terms"
          defaultValue={inputdata.termRange&&Array.isArray(inputdata.termRange)?inputdata.termRange:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getTermResponse?.param.data.dataPairs.map((value:any) => (
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
          id="minRiskCessAge"
          name="minRiskCessAge"
          inputRef={minRiskCessAgeRef}
          placeholder="Minimum Risk Cess Age"
          label="Minimum Risk Cess Age"
          defaultValue={inputdata.minRiskCessAge}
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
          id="maxRiskCessAge"
          name="maxRiskCessAge"
          inputRef={maxRiskCessAgeRef}
          placeholder="Maximum Risk Cess Age"
          label="Maximum Risk Cess Age"
          defaultValue={inputdata.maxRiskCessAge}
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
          id="minPremCessAge"
          name="minPremCessAge"
          inputRef={minPremCessAgeRef}
          placeholder="Minimum Prem Cess Age"
          label="Minimum Prem Cess Age"
          defaultValue={inputdata.minPremCessAge}
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
          id="maxPremCessAge"
          name="maxPremCessAge"
          inputRef={maxPremCessAgeRef}
          placeholder="Maximum Prem Cess Age"
          label="Maximum Prem Cess Age"
          defaultValue={inputdata.maxPremCessAge}
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
          id="maxTermBeyondTerm"
          name="maxTermBeyondTerm"
          inputRef={maxTermBeyondTermRef}
          placeholder="Max Term Beyond Basic cover"
          label="Max Term Beyond Basic cover"
          defaultValue={inputdata.maxTermBeyondTerm}
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
          select
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
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getNfomethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="partSurrMethod"
          name="partSurrMethod"
          inputRef={partSurrMethodRef}
          placeholder="Part Surr.Method"
          label="Part Surr.Method"
          defaultValue={inputdata.partSurrMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getPartsurrmResponse?.param.data.dataPairs.map((value:any) => (
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
          id="premInc"
          name="premInc"
          inputRef={premIncRef}
          placeholder="Premium Increase"
          label="Premium Increase"
          defaultValue={inputdata.premInc}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {getP0046Response?.data.map((value:any) => (
            <MenuItem key={value.item} value={value.item}>
              {value.longdesc}
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
          select
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
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getPremmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="revBonus"
          name="revBonus"
          inputRef={revBonusRef}
          placeholder="Rev.Bonus"
          label="Rev.Bonus"
          defaultValue={inputdata.revBonus}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getRevbonmResponse?.param.data.dataPairs.map((value:any) => (
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
          id="sBType"
          name="sBType"
          inputRef={sBTypeRef}
          placeholder="Survival Benefit Type"
          label="Survival Benefit Type"
          defaultValue={inputdata.sBType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSurvbentypResponse?.param.data.dataPairs.map((value:any) => (
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
          id="sBMethod"
          name="sBMethod"
          inputRef={sBMethodRef}
          placeholder="Survival Benefit Method"
          label="Survival Benefit Method"
          defaultValue={inputdata.sBMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSurvbenmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="surrMethod"
          name="surrMethod"
          inputRef={surrMethodRef}
          placeholder="Surrender Method"
          label="Surrender Method"
          defaultValue={inputdata.surrMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSurrendmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="tBonus"
          name="tBonus"
          inputRef={tBonusRef}
          placeholder="Terminal Bonus"
          label="Terminal Bonus"
          defaultValue={inputdata.tBonus}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getTermlbonmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLDeductFrequency"
          name="uLDeductFrequency"
          inputRef={uLDeductFrequencyRef}
          placeholder="UL Deduction Frequency"
          label="UL Deduction Frequency"
          defaultValue={inputdata.uLDeductFrequency}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUldednfreqResponse?.param.data.dataPairs.map((value:any) => (
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
          id="gSVMethod"
          name="gSVMethod"
          inputRef={gSVMethodRef}
          placeholder="GSV Method"
          label="GSV Method"
          defaultValue={inputdata.gSVMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getGsvmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="sSVMethod"
          name="sSVMethod"
          inputRef={sSVMethodRef}
          placeholder="SSV Method"
          label="SSV Method"
          defaultValue={inputdata.sSVMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getSsvmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="bSVMethod"
          name="bSVMethod"
          inputRef={bSVMethodRef}
          placeholder="Bonus Surr.Value Method"
          label="Bonus Surr.Value Method"
          defaultValue={inputdata.bSVMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getBonsurrmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="divMethod"
          name="divMethod"
          inputRef={divMethodRef}
          placeholder="Dividend Method"
          label="Dividend Method"
          defaultValue={inputdata.divMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getDividendmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="divIMethod"
          name="divIMethod"
          inputRef={divIMethodRef}
          placeholder="Dividend Interest Method"
          label="Dividend Interest Method"
          defaultValue={inputdata.divIMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getDivintmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="mortalities"
          name="mortalities"
          inputRef={mortalitiesRef}
          placeholder="Mortalities"
          label="Mortalities"
          defaultValue={inputdata.mortalities&&Array.isArray(inputdata.mortalities)?inputdata.mortalities:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getMrtlResponse?.param.data.dataPairs.map((value:any) => (
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
          id="premCalcType"
          name="premCalcType"
          inputRef={premCalcTypeRef}
          placeholder="Premium Calc Type"
          label="Premium Calc Type"
          defaultValue={inputdata.premCalcType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getPremcalctypResponse?.param.data.dataPairs.map((value:any) => (
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
          id="discType"
          name="discType"
          inputRef={discTypeRef}
          placeholder="Discount Type"
          label="Discount Type"
          defaultValue={inputdata.discType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getPremdisctypResponse?.param.data.dataPairs.map((value:any) => (
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
          {getQ0018Response?.data.map((value:any) => (
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
          {getQ0019Response?.data.map((value:any) => (
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
          {getQ0020Response?.data.map((value:any) => (
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
          {getQ0021Response?.data.map((value:any) => (
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
          id="uLMortFreq"
          name="uLMortFreq"
          inputRef={uLMortFreqRef}
          placeholder="UL Mortality Freqencies"
          label="UL Mortality Freqencies"
          defaultValue={inputdata.uLMortFreq}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlmortfreqResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLMortCalcType"
          name="uLMortCalcType"
          inputRef={uLMortCalcTypeRef}
          placeholder="UL Mortality Calc Type"
          label="UL Mortality Calc Type"
          defaultValue={inputdata.uLMortCalcType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlmortcalctypResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLMortDeductMethod"
          name="uLMortDeductMethod"
          inputRef={uLMortDeductMethodRef}
          placeholder="UL Mortality Dedn. Method"
          label="UL Mortality Dedn. Method"
          defaultValue={inputdata.uLMortDeductMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlmortdednmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLFeeFreq"
          name="uLFeeFreq"
          inputRef={uLFeeFreqRef}
          placeholder="UL Fee Frequency"
          label="UL Fee Frequency"
          defaultValue={inputdata.uLFeeFreq}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlfeefreqResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLFeeType"
          name="uLFeeType"
          inputRef={uLFeeTypeRef}
          placeholder="UL Fee Type"
          label="UL Fee Type"
          defaultValue={inputdata.uLFeeType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlfeetypResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLFeeMethod"
          name="uLFeeMethod"
          inputRef={uLFeeMethodRef}
          placeholder="UL Fee Method"
          label="UL Fee Method"
          defaultValue={inputdata.uLFeeMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlfeemethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="uLFundRules"
          name="uLFundRules"
          inputRef={uLFundRulesRef}
          placeholder="UL Fund Rules"
          label="UL Fund Rules"
          defaultValue={inputdata.uLFundRules}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getUlfundruleResponse?.param.data.dataPairs.map((value:any) => (
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
          id="mrtaMethod"
          name="mrtaMethod"
          inputRef={mrtaMethodRef}
          placeholder="MRTA Method"
          label="MRTA Method"
          defaultValue={inputdata.mrtaMethod}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getMrtmethResponse?.param.data.dataPairs.map((value:any) => (
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
          id="mrtaInterest"
          name="mrtaInterest"
          inputRef={mrtaInterestRef}
          placeholder="MRTA Interest (in %)"
          label="MRTA Interest (in %)"
          defaultValue={inputdata.mrtaInterest&&Array.isArray(inputdata.mrtaInterest)?inputdata.mrtaInterest:[]}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: true,
          }}
        >
          {getMrtintResponse?.param.data.dataPairs.map((value:any) => (
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
          id="benefitType"
          name="benefitType"
          inputRef={benefitTypeRef}
          placeholder="Benefit Type"
          label="Benefit Type"
          defaultValue={inputdata.benefitType}
          fullWidth
          variant="outlined"
          margin="dense"
          SelectProps={{
            multiple: false,
          }}
        >
          {getBenefittypeResponse?.param.data.dataPairs.map((value:any) => (
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
          id="commissionOnExtraInd"
          name="commissionOnExtraInd"
          inputRef={commissionOnExtraIndRef}
          placeholder="Commission On Extra Ind"
          label="Commission On Extra Ind"
          defaultValue={inputdata.commissionOnExtraInd}
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


        <Q0006Enq
        open={enq}
        handleClose={enqClose}

        />

    </>
  );
});

export default Q0006;

