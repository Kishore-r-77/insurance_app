import axios from "axios";
import moment from "moment";
import { QuotationStateType } from "../../../reducerUtilities/types/quotations/quotationTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QuotationStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/pacificservices/quotations`, {
    withCredentials: true,
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchString: state.searchString,
      searchCriteria: state.searchCriteria,
      sortColumn: state.sortColumn,
      sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
    },
  });
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

export const addApi = (state: QuotationStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/quotationcreate`,
    {
      CompanyID: companyId,
      QHeaderID: parseInt(state.QHeaderID),
      QuoteDate: moment(state.QuoteDate).format("YYYYMMDD"),
      QProduct: state.QProduct,
      ClientID: parseInt(state.ClientID),
      QFirstName: null,
      QLastName: null,
      QMidName: null,
      QDob: moment(state.QDob).format("YYYYMMDD"),
      QGender: null,
      QNri: state.QNri,
      QEmail: null,
      QMobile: null,
      QOccGroup: state.QOccGroup,
      QOccSect: state.QOccSect,
      QOccupation: state.QOccupation,
      QAnnualIncome: state.QAnnualIncome,
      QDeclaration: state.QDeclaration,
      AddressID: parseInt(state.AddressID),
      QDate: moment(state.QDate).format("YYYYMMDD"),
      QCoverage: state.QCoverage,
      QRiskSeqNo: null,
      QAge: null,
      QEmrRating: state.QEmrRating,
      QSumAssured: state.QSumAssured,
      QRiskCessAge: null,
      QRiskCessTerm: state.QRiskCessTerm,
      QRiskCessDate: moment(state.QRiskCessDate).format("YYYYMMDD"),
      QPremCessAge: null,
      QPremCessTerm: state.QPremCessTerm,
      QPremCessDate: moment(state.QPremCessDate).format("YYYYMMDD"),
      QBeneCessAge: null,
      QBeneCessTerm: state.QBeneCessTerm,
      QBeneCessDate: moment(state.QBeneCessDate).format("YYYYMMDD"),
      QAnnualPremium: null,
      QHlyPrem: null,
      QQlyPrem: null,
      QMlyPrem: null,
      QDetailID: parseInt(state.QDetailID),
      QPolicyYear: null,
      QLifeAssuredAge: null,
      QPolAnnivDate: moment(state.QPolAnnivDate).format("YYYYMMDD"),
      QTotalPremPaid: null,
      QRevBonusAmt: null,
      QTerBonusAmt: null,
      QAntiSurBenAmt: null,
      QGuarAdditions: null,
      QLoyaltyAdditions: null,
      QDeathBenefitAmt: null,
      QGuarSurrValue: null,
      QSplSurrValue: null,
      QBonusSurValue: null,
      QAccuDividend: null,
      QAccuDivInterest: null,
      QallocatedAmt: null,
      QUnallocedAmt: null,
      QPesValamt: null,
      QNorValamt: null,
      QOptValamt: null,
      QMaturityDate: moment(state.QMaturityDate).format("YYYYMMDD"),
      QMaturityAmt: null,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/quotationupdate`,
    {
      CompanyID: parseInt(record.CompanyID),
      QHeaderID: parseInt(record.QHeaderID),
      QuoteDate: moment(record.QuoteDate).format("YYYYMMDD"),
      QProduct: record.QProduct,
      ClientID: parseInt(record.ClientID),
      QFirstName: record.QFirstName,
      QLastName: record.QLastName,
      QMidName: record.QMidName,
      QDob: moment(record.QDob).format("YYYYMMDD"),
      QGender: record.QGender,
      QNri: record.QNri,
      QEmail: record.QEmail,
      QMobile: record.QMobile,
      QOccGroup: record.QOccGroup,
      QOccSect: record.QOccSect,
      QOccupation: record.QOccupation,
      QAnnualIncome: record.QAnnualIncome,
      QDeclaration: record.QDeclaration,
      AddressID: parseInt(record.AddressID),
      QDate: moment(record.QDate).format("YYYYMMDD"),
      QCoverage: record.QCoverage,
      QRiskSeqNo: record.QRiskSeqNo,
      QAge: record.QAge,
      QEmrRating: record.QEmrRating,
      QSumAssured: record.QSumAssured,
      QRiskCessAge: record.QRiskCessAge,
      QRiskCessTerm: record.QRiskCessTerm,
      QRiskCessDate: moment(record.QRiskCessDate).format("YYYYMMDD"),
      QPremCessAge: record.QPremCessAge,
      QPremCessTerm: record.QPremCessTerm,
      QPremCessDate: moment(record.QPremCessDate).format("YYYYMMDD"),
      QBeneCessAge: record.QBeneCessAge,
      QBeneCessTerm: record.QBeneCessTerm,
      QBeneCessDate: moment(record.QBeneCessDate).format("YYYYMMDD"),
      QAnnualPremium: record.QAnnualPremium,
      QHlyPrem: record.QHlyPrem,
      QQlyPrem: record.QQlyPrem,
      QMlyPrem: record.QMlyPrem,
      QDetailID: parseInt(record.QDetailID),
      QPolicyYear: record.QPolicyYear,
      QLifeAssuredAge: record.QLifeAssuredAge,
      QPolAnnivDate: moment(record.QPolAnnivDate).format("YYYYMMDD"),
      QTotalPremPaid: record.QTotalPremPaid,
      QRevBonusAmt: record.QRevBonusAmt,
      QTerBonusAmt: record.QTerBonusAmt,
      QAntiSurBenAmt: record.QAntiSurBenAmt,
      QGuarAdditions: record.QGuarAdditions,
      QLoyaltyAdditions: record.QLoyaltyAdditions,
      QDeathBenefitAmt: record.QDeathBenefitAmt,
      QGuarSurrValue: record.QGuarSurrValue,
      QSplSurrValue: record.QSplSurrValue,
      QBonusSurValue: record.QBonusSurValue,
      QAccuDividend: record.QAccuDividend,
      QAccuDivInterest: record.QAccuDivInterest,
      QallocatedAmt: record.QallocatedAmt,
      QUnallocedAmt: record.QUnallocedAmt,
      QPesValamt: record.QPesValamt,
      QNorValamt: record.QNorValamt,
      QOptValamt: record.QOptValamt,
      QMaturityDate: moment(record.QMaturityDate).format("YYYYMMDD"),
      QMaturityAmt: record.QMaturityAmt,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/pacificservices/quotationdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
