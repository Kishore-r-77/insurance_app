import axios from "axios";
import moment from "moment";
import { BenefitStateType } from "../../../../../reducerUtilities/types/benefit/benefitTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: BenefitStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/benefits`, {
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

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/benefitupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      BStartDate: moment(record.BStartDate).format("YYYYMMDD").toString(),
      BRiskCessDate: moment(record.BRiskCessDate).format("YYYYMMDD").toString(),
      BPremCessDate: moment(record.BPremCessDate).format("YYYYMMDD").toString(),
      BDOB: moment(record.BDOB).format("YYYYMMDD").toString(),
      BTerm: parseInt(record.BTerm),
      BPTerm: parseInt(record.BPTerm),
      BRiskCessAge: parseInt(record.BRiskCessAge),
      BPremCessAge: parseInt(record.BPremCessAge),
      BBasAnnualPrem: parseInt(record.BBasAnnualPrem),
      BLoadPrem: parseInt(record.BLoadPrem),
      BCoverage: record.BCoverage,
      BSumAssured: parseInt(record.BSumAssured),
      BPrem: parseInt(record.BPrem),
      BGender: record.BGender,
      BMortality: record.BMortality,
      BStatus: record.BStatus,
      BAge: parseInt(record.BAge),
      BRerate: record.BRerate,
      ClientID: parseInt(record.ClientID),
      PolicyID: parseInt(record.PolicyID),
      AddressID: parseInt(record.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};
export const addApi = (state: any, companyId: number, policyRecord: any) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/benefitcreate`,
    {
      CompanyID: companyId,
      BStartDate: moment(state.BStartDate).format("YYYYMMDD").toString(),
      // BRiskCessDate: moment(state.BRiskCessDate).format("YYYYMMDD").toString(),
      // BPremCessDate: moment(state.BPremCessDate).format("YYYYMMDD").toString(),
      // BDOB: moment(state.BDOB).format("YYYYMMDD").toString(),
      BTerm: parseInt(state.BTerm),
      BPTerm: parseInt(state.BPTerm),
      BRiskCessAge: parseInt(state.BRiskCessAge),
      BPremCessAge: parseInt(state.BPremCessAge),
      BBasAnnualPrem: parseInt(state.BBasAnnualPrem),
      BLoadPrem: parseInt(state.BLoadPrem),
      BCoverage: state.BCoverage,
      BSumAssured: parseInt(state.BSumAssured),
      BPrem: parseInt(state.BPrem),
      BGender: state.BGender,
      BMortality: state.BMortality,
      BStatus: state.BStatus,
      BAge: parseInt(state.BAge),
      BRerate: state.BRerate,
      ClientID: parseInt(policyRecord.ClientID),
      PolicyID: parseInt(policyRecord.ID),
      AddressID: parseInt(policyRecord.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/nbservices/benefitdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
