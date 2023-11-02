import axios from "axios";
import moment from "moment";
import { QBenIllValueStateType } from "../../../reducerUtilities/types/qBenIllValues/qBenIllValueTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QBenIllValueStateType
) => {
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

export const addApi = (state: QBenIllValueStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qBenIllValuecreate`,
    {
      CompanyID: parseInt(state.CompanyID),
      Qdetailid: parseInt(state.QDetailID),
      QCoverage: state.QCoverage,
      Qpolicyyear: null,
      QPolAnnivDate: moment(state.QPolAnnivDate).format("YYYYMMDD"),
      Qlifeassuredage: null,
      Qtotalprempaid: null,
      Qsumassured: null,
      Qdeathbenefitamt: null,
      Qrevbonusamt: null,
      Qterbonusamt: null,
      Qguaradditions: null,
      Qloyaltyadditions: null,
      Qguarsurrvalue: null,
      Qsplsurrvalue: null,
      Qbonussurvalue: null,
      Qaccudividend: null,
      Qaccudivinterest: null,
      Qantisurbenamt: null,
      Qallocatedamt: null,
      Qunallocedamt: null,
      Qpesvalamt: null,
      Qnorvalamt: null,
      Qoptvalamt: null,
      Qmaturityamt: null,
      Qmaturitydate: moment(state.QMaturityDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/quotationservices/qBenIllValueupdate`,
    {
      CompanyID: parseInt(record.CompanyID),
      ID: parseInt(record.ID),

      Qdetailid: parseInt(record.Qdetailid),
      Qcoverage: record.Qcoverage,
      Qpolicyyear: record.Qpolicyyear,
      Qpolannivdate: moment(record.Qpolannivdate).format("YYYYMMDD"),
      Qlifeassuredage: record.Qlifeassuredage,
      Qtotalprempaid: record.Qtotalprempaid,
      Qsumassured: record.Qsumassured,
      Qdeathbenefitamt: record.Qdeathbenefitamt,
      Qrevbonusamt: record.Qrevbonusamt,
      Qterbonusamt: record.Qterbonusamt,
      Qguaradditions: record.Qguaradditions,
      Qloyaltyadditions: record.Qloyaltyadditions,
      Qguarsurrvalue: record.Qguarsurrvalue,
      Qsplsurrvalue: record.Qsplsurrvalue,
      Qbonussurvalue: record.Qbonussurvalue,
      Qaccudividend: record.Qaccudividend,
      Qaccudivinterest: record.Qaccudivinterest,
      Qantisurbenamt: record.Qantisurbenamt,
      Qallocatedamt: record.Qallocatedamt,
      Qunallocedamt: record.Qunallocedamt,
      Qpesvalamt: record.Qpesvalamt,
      Qnorvalamt: record.Qnorvalamt,
      Qoptvalamt: record.Qoptvalamt,
      Qmaturityamt: record.Qmaturityamt,
      Qmaturitydate: moment(record.Qmaturitydate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/quotationservices/qBenIllValuedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
