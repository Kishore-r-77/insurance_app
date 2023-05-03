import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { ExtraStateType } from "../../../reducerUtilities/types/extra/extraTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ExtraStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/basicservices/getallextras`, {
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
export const getExtrasByBenefit = (benefitId: number) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/nbservices/extraByBenefit/${benefitId}`,
    {
      withCredentials: true,
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

export const addApi = (
  state: ExtraStateType,
  companyId: number,
  benefitId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/extracreate`,
    {
      CompanyID: companyId,
      PolicyID: parseInt(state.PolicyID),
      BCoverage: state.BCoverage,
      BenefitID: benefitId,
      EReason: state.EReason,
      EMethod: state.EMethod,
      EPrem: parseInt(state.EPrem),
      EPercentage: parseInt(state.EPercentage),
      EAmt: parseInt(state.EAmt),
      ETerm: parseInt(state.ETerm),
      EAge: parseInt(state.EAge),
      FromDate: moment(state.FromDate).format("YYYYMMDD").toString(),
      ToDate: moment(state.ToDate).format("YYYYMMDD").toString(),
      ReasonDescription: state.ReasonDescription,
      RequestedDate: moment(state.RequestedDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/extraupdate`,
    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      PolicyID: parseInt(record.PolicyID),
      BCoverage: record.BCoverage,
      BenefitID: parseInt(record.BenefitID),
      EReason: record.EReason,
      EMethod: record.EMethod,
      EPrem: parseInt(record.EPrem),
      EPercentage: parseInt(record.EPercentage),
      EAmt: parseInt(record.EAmt),
      ETerm: parseInt(record.ETerm),
      EAge: parseInt(record.EAge),
      FromDate: moment(record.FromDate).format("YYYYMMDD"),
      ToDate: moment(record.ToDate).format("YYYYMMDD"),
      ReasonDescription: record.ReasonDescription,
      RequestedDate: moment(record.RequestedDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/nbservices/extradelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
