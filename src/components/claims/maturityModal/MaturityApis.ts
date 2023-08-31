import axios from "axios";
import moment from "moment";
import { MaturityStateType } from "../../../reducerUtilities/types/maturity/maturityTypes";

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

export const postMaturity = (
  state: MaturityStateType,
  CompanyID: number,
  policyId: number,
  ClientID: number
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/matcreate/${policyId}`,
    {
      Function: "Fill",
      CompanyID: CompanyID,
      PolicyID: policyId,
      ClientID,
      EffectiveDate:
        state.EffectiveDate?.length === 0
          ? ""
          : moment(state.EffectiveDate).format("YYYYMMDD").toString(),
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
      TotalMaturityPayable: state.TotalMaturityPayable,
      AdjustedAmount: state.AdjustedAmount,

      MaturityDs: [{}],
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
export const saveMaturity = (
  policyId: number,
  CompanyID: number,
  maturityHdata: any,
  maturityDdata: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/matcreate/${policyId}`,
    {
      Function: "Commit",
      CompanyID: CompanyID,
      PolicyID: policyId,
      ClientID: maturityHdata.ClientID,
      EffectiveDate: maturityHdata.EffectiveDate,
      Status: maturityHdata.Status,
      BillDate: maturityHdata.BillDate,
      PaidToDate: maturityHdata.PaidToDate,
      Product: maturityHdata.Product,
      AplAmount: maturityHdata.AplAmount,
      LoanAmount: maturityHdata.LoanAmount,
      PolicyDepost: maturityHdata.PolicyDepost,
      CashDeposit: maturityHdata.CashDeposit,
      RefundPrem: maturityHdata.RefundPrem,
      PremTolerance: maturityHdata.PremTolerance,
      TotalMaturityPayable: maturityHdata.TotalMaturityPayable,
      AdjustedAmount: maturityHdata.AdjustedAmount,
      maturityD: maturityDdata.map((data: any) => ({
        ...data,
        CompanyID: parseInt(data.CompanyID),
        PolicyID: parseInt(data.PolicyID),
        ClientID: parseInt(data.ClientID),
        BenefitID: parseInt(data.BenefitID),
        BSumAssured: parseInt(data.BSumAssured),
        BCoverage: parseInt(data.BCoverage),
        MaturityAmount: parseInt(data.MaturityAmount),
        RevBonus: parseInt(data.RevBonus),
        AddlBonus: parseInt(data.AddlBonus),
        TerminalBonus: parseInt(data.TerminalBonus),
        InterimBonus: parseInt(data.InterimBonus),
        LoyaltyBonus: parseInt(data.LoyaltyBonus),
        OtherAmount: parseInt(data.OtherAmount),
        AccumDividend: parseInt(data.AccumDividend),
        AccumDivInt: parseInt(data.AccumDivInt),
        TotalFundValue: parseInt(data.TotalFundValue),
        TotalMaturityAmount: parseInt(data.TotalMaturityAmount),
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
