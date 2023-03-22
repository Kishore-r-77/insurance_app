import axios from "axios";
import moment from "moment";
import { QDetailsStateType } from "../../../reducerUtilities/types/qDetails/qDetailsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QDetailsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/quotationservices/qdetails`, {
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

export const addApi = (state: QDetailsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qdetailcreate`,
    {
      CompanyID: companyId,
      QHeaderID: parseInt(state.QHeaderID),
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
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/quotationservices/qdetailupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      QHeaderID: parseInt(record.QHeaderID),
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
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/quotationservices/qdetaildelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
