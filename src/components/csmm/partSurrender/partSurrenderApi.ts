import axios from "axios";
import moment from "moment";
import { IlpPartSurrenderHStateType } from "../../../reducerUtilities/types/IlpPartSurrender/IlpPartSurrenderType";

export const postIlpPartSurrender = (
  CompanyID: number,
  polid: number,
  ClientID: number,
  benId: any,
  state: IlpPartSurrenderHStateType,
  exfunds: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/ilppartsurrcreate/${polid}`,
    {
      Function: "Fill",
      CompanyID: CompanyID,
      PolicyID: polid,
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

      SurrDs: {
        CompanyID: CompanyID,
        PolicyID: polid,
        BenefitID: benId,
      },
      SurrFs: exfunds
        .filter(
          (data: any) =>
            data.SurrenderBy !== null &&
            data.SurrenderBy !== undefined &&
            data.SurrenderBy !== "" &&
            data.SurrenderByValue !== null &&
            data.SurrenderByValue !== undefined &&
            data.SurrenderByValue !== ""
        )
        .map((data: any) => ({
          ...data,
          CompanyID: parseInt(data.CompanyID),
          PolicyID: parseInt(data.PolicyID),
          BenefitID: parseInt(data.BenefitID),
          FundCode: data.FundCode,
          SurrenderBy: data.SurrenderBy,
          SurrenderByValue: parseInt(data.SurrenderByValue),
          SurrPercentage: parseInt(data.SurrPercentage),
          SurrAmount: data.SurrAmount,
        })),
    },
    { withCredentials: true }
  );
};
export const saveIlpPartSurrender = (
  polid: number,
  CompanyID: number,
  SurrHdata: any,
  surrDdata: any,
  SurrFsData: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/customerservice/ilppartsurrcreate/${polid}`,
    {
      Function: "Commit",
      CompanyID: CompanyID,
      PolicyID: polid,
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
      SurrDs: {
        CompanyID: parseInt(surrDdata.CompanyID),
        PolicyID: parseInt(surrDdata.PolicyID),
        ClientID: parseInt(surrDdata.ClientID),
        BenefitID: parseInt(surrDdata.BenefitID),
        BCoverage: surrDdata.BCoverage,
        BSumAssured: parseInt(surrDdata.BSumAssured),
        SurrAmount: parseInt(surrDdata.SurrAmount),
        RevBonus: parseInt(surrDdata.RevBonus),
        AddlBonus: parseInt(surrDdata.AddlBonus),
        TerminalBonus: parseInt(surrDdata.TerminalBonus),
        InterimBonus: parseInt(surrDdata.InterimBonus),
        LoyaltyBonus: parseInt(surrDdata.LoyaltyBonus),
        OtherAmount: parseInt(surrDdata.OtherAmount),
        AccumDividend: parseInt(surrDdata.AccumDividend),
        AccumDivInt: parseInt(surrDdata.AccumDivInt),
        TotalFundValue: parseInt(surrDdata.TotalFundValue),
        TotalSurrAmount: parseInt(surrDdata.TotalSurrAmount),
        SurrPenalty: parseInt(surrDdata.SurrPenalty),
        SurrTax: parseInt(surrDdata.SurrTax),
      },
      SurrFs: SurrFsData.map((data: any) => ({
        ...data,
        PolicyID: parseInt(data.PolicyID),
        BenefitID: parseInt(data.BenefitID),
        FundCode: data.FundCode,
        SurrenderBy: data.SurrenderBy,
        SurrenderByValue: parseInt(data.SurrenderByValue),
        SurrPercentage: parseInt(data.SurrPercentage),
        SurrAmount: data.SurrAmount,
      })),
      // SurrFs: SurrFsData.filter(
      //   (data: any) =>
      //     data.SurrenderBy !== null &&
      //     data.SurrenderBy !== undefined &&
      //     data.SurrenderBy !== "" &&
      //     data.SurrenderByValue !== null &&
      //     data.SurrenderByValue !== undefined &&
      //     data.SurrenderByValue !== ""
      // ).map((data: any) => ({
      //   ...data,
      //   CompanyID: parseInt(data.CompanyID),
      //   PolicyID: parseInt(data.PolicyID),
      //   BenefitID: parseInt(data.BenefitID),
      //   FundCode: data.FundCode,
      //   SurrenderBy: data.SurrenderBy,
      //   SurrenderByValue: parseInt(data.SurrenderByValue),
      //   SurrPercentage: parseInt(data.SurrPercentage),
      //   SurrAmount: data.SurrAmount,
      // })),
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
