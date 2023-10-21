import axios from "axios";
import { IlpSurrenderHStateType } from "../../../reducerUtilities/types/IlpSurrender/IlpSurrenderType";
import moment from "moment";

export const postIlpSurrender = (
  state: IlpSurrenderHStateType,
  CompanyID: number,
  policyId: number,
  ClientID: number
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/ilpsurrcreate/${policyId}`,
    {
      Function: "Fill",
      SurrPercentage: parseFloat(state.SurrPercentage),
      CompanyID: CompanyID,
      PolicyID: policyId,
      ClientID,
      EffectiveDate:
        state.EffectiveDate?.length === 0
          ? ""
          : moment(state.EffectiveDate).format("YYYYMMDD").toString(),

      Cause: state.Cause,
      Status: state.Status,
      BillDate: state.BillDate,
      PaidToDate: state.PaidToDate,
      Product: state.Product,
      AplAmount: state.AplAmount,
      LoanAmount: state.LoanAmount,
      PolicyDepost: state.PolicyDepost,
      CashDeposit: state.CashDeposit,
      RefundPrem: state.RefundPrem,
      PremTolerance: state.PremTolerance,
      TotalSurrPayable: state.TotalSurrPayable,
      AdjustedAmount: state.AdjustedAmount,
      SurrDate:
        state.SurrDate?.length === 0
          ? ""
          : moment(state.SurrDate).format("YYYYMMDD").toString(),
      ReasonDescription: state.ReasonDescription,

      SurrDs: [{}],
    },
    { withCredentials: true }
  );
  // .then((resp) => {
  //   setSurrender(resp.data?.Policy);
  //   setsurrenderBenefits(resp?.data?.Benefits);
  //   modifiedPremium.current = resp?.data?.ModifiedPrem;
  //   isSave.current = true;
  //   //saChangeClose();
  //   getData();
  //   setNotify({
  //     isOpen: true,
  //     message: "Calculated Successfully",
  //     type: "success",
  //   });
  // })
  // .catch((err) =>
  //   setNotify({
  //     isOpen: true,
  //     message: err?.response?.data?.error,
  //     type: "error",
  //   })
  // );
};
export const saveIlpSurrender = (
  policyId: number,
  CompanyID: number,
  SurrHdata: any,
  surrDdata: any,
  ilpsurrenderState: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/ilpsurrcreate/${policyId}`,
    {
      Function: "Commit",
      CompanyID: CompanyID,
      PolicyID: policyId,
      SurrPercentage: parseFloat(ilpsurrenderState.SurrPercentage),
      ClientID: SurrHdata.ClientID,
      EffectiveDate: SurrHdata.EffectiveDate,
      SurrDate: SurrHdata.SurrDate,
      Cause: SurrHdata.Cause,
      Status: SurrHdata.Status,
      BillDate: SurrHdata.BillDate,
      PaidToDate: SurrHdata.PaidToDate,
      Product: SurrHdata.Product,
      AplAmount: SurrHdata.AplAmount,
      LoanAmount: SurrHdata.LoanAmount,
      PolicyDepost: SurrHdata.PolicyDepost,
      CashDeposit: SurrHdata.CashDeposit,
      RefundPrem: SurrHdata.RefundPrem,
      PremTolerance: SurrHdata.PremTolerance,
      TotalSurrPayable: SurrHdata.TotalSurrPayable,
      AdjustedAmount: parseInt(SurrHdata.AdjustedAmount),
      ReasonDescription: SurrHdata.ReasonDescription,
      SurrDs: surrDdata.map((data: any) => ({
        ...data,
        CompanyID: parseInt(data.CompanyID),
        PolicyID: parseInt(data.PolicyID),
        ClientID: parseInt(data.ClientID),
        BenefitID: parseInt(data.BenefitID),
        BSumAssured: parseInt(data.BSumAssured),
        SurrAmount: parseInt(data.SurrAmount),
        RevBonus: parseInt(data.RevBonus),
        AddlBonus: parseInt(data.AddlBonus),
        TerminalBonus: parseInt(data.TerminalBonus),
        InterimBonus: parseInt(data.InterimBonus),
        LoyaltyBonus: parseInt(data.LoyaltyBonus),
        OtherAmount: parseInt(data.OtherAmount),
        AccumDividend: parseInt(data.AccumDividend),
        AccumDivInt: parseInt(data.AccumDivInt),
        TotalFundValue: parseInt(data.TotalFundValue),
        TotalSurrAmount: parseInt(data.TotalSurrAmount),
        SurrPenalty: parseInt(data.SurrPenalty),
        SurrTax: parseInt(data.SurrTax),
      })),
    },
    { withCredentials: true }
  );
};
export const paramItem = (
  companyId: number,
  name: string,
  languageId: number
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name,
      languageId,
    },
  });
};
export const getBusinessDateApi = (companyId: number, userId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/05/${userId}`,
    {
      withCredentials: true,
    }
  );
};
