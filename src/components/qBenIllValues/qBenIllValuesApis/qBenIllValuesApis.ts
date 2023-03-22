import axios from "axios";
import moment from "moment";
import { QBenIllValuesStateType } from "../../../reducerUtilities/types/qBenIllValues/qBenIllValuesTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QBenIllValuesStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/quotationservices/qbenillvalues`,
    {
      withCredentials: true,
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
        searchString: state.searchString,
        searchCriteria: state.searchCriteria,
        sortColumn: state.sortColumn,
        sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
      },
    }
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

export const addApi = (state: QBenIllValuesStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qbenillvaluecreate`,
    {
      CompanyID: companyId,
      QDetailID: parseInt(state.QDetailID),
      QCoverage: state.QCoverage,
      QPolicyYear: null,
      QLifeAssuredAge: null,
      QPolAnnivDate: moment(state.QPolAnnivDate).format("YYYYMMDD"),
      QTotalPremPaid: null,
      QSumAssured: null,
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
    `http://localhost:3000/api/v1/quotationservices/qbenillvalueupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      QDetailID: parseInt(record.QDetailID),
      QCoverage: record.QCoverage,
      QPolicyYear: record.QPolicyYear,
      QLifeAssuredAge: record.QLifeAssuredAge,
      QPolAnnivDate: moment(record.QPolAnnivDate).format("YYYYMMDD"),
      QTotalPremPaid: record.QTotalPremPaid,
      QSumAssured: record.QSumAssured,
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
    `http://localhost:3000/api/v1/quotationservices/qbenillvaluedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
