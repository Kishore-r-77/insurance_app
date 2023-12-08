import axios from "axios";
import moment from "moment";
import { SurrenderHStateType } from "../../../reducerUtilities/types/surrender/surrenderType";

export const getLAByPolicy = (policyId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/deathservices/getpolicybyclient/${policyId}`,
    {
      withCredentials: true,
    }
  );
};

// export const createSurrenderWithBenefits = (
//   state: SurrenderHStateType,
//   companyId: number,
//   data: any
// ) => {
//   return axios.post(
//     `http://localhost:3000/api/v1/deathservices/surrcreate`,
//     {
//       Function: state.Function,
//       CompanyID: companyId,
//       PolicyID: state.PolicyID,
//       ClientID: state.ClientID,
//       EffectiveDate:
//         state.EffectiveDate?.length === 0
//           ? ""
//           : moment(state.EffectiveDate).format("YYYYMMDD").toString(),
//       SurrDate:
//         state.SurrDate?.length === 0
//           ? ""
//           : moment(state.SurrDate).format("YYYYMMDD").toString(),
//       Cause: state.Cause,

//       Status: state.Status,
//       BillDate:
//         state.BillDate?.length === 0
//           ? ""
//           : moment(state.BillDate).format("YYYYMMDD").toString(),
//       PaidToDate:
//         state.PaidToDate?.length === 0
//           ? ""
//           : moment(state.PaidToDate).format("YYYYMMDD").toString(),
//       Surrd: data.map((Surrender: any) => ({
//         ...Surrender,
//         ClientID: state.ClientID,
//         BSumAssured: parseInt(Surrender.BSumAssured),
//         RevBonus: parseInt(Surrender.RevBonus),
//         AddlBonus: parseInt(Surrender.AddlBonus),
//         InterimBonus: parseInt(Surrender.InterimBonus),
//         TotalSurrPayable: parseInt(Surrender.TotalSurrPayable),
//       })),
//     },

//     {
//       withCredentials: true,
//     }
//   );
// };

export const postSurrender = (
  state: SurrenderHStateType,
  CompanyID: number,
  policyId: number,
  ClientID: number
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/surrcreate/${policyId}`,
    {
      Function: "Fill",
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
export const saveSurrender = (
  policyId: number,
  CompanyID: number,
  SurrHdata: any,
  surrDdata: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/surrcreate/${policyId}`,
    {
      Function: "Save",
      CompanyID: CompanyID,
      PolicyID: policyId,
      ClientID: SurrHdata.ClientID,
      EffectiveDate: SurrHdata.EffectiveDate,
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
      AdjustedAmount: SurrHdata.AdjustedAmount,
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
