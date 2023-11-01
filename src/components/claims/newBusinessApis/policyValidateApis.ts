import axios from "axios";
import moment from "moment";
import { PolicyValidateStateType } from "../../../reducerUtilities/types/validatepolicy/policyValidateTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PolicyValidateStateType
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/getallpolicyValidates`,
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

export const addApi = (state: PolicyValidateStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/policyValidatecreate`,
    {
      PolicyID: parseInt(state.PolicyID),
      CompanyID: companyId,
      Coverage: state.Coverage,
      BPrem: state.BPrem,
      CovrGst: state.CovrGst,
      CovrStampduty: state.CovrStampduty,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/policyValidateupdate`,
    {
      PolicyID: parseInt(record.PolicyID),
      CompanyID: parseInt(record.CompanyID),
      Coverage: record.Coverage,
      BPrem: record.BPrem,
      CovrGst: record.CovrGst,
      CovrStampduty: record.CovrStampduty,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/policyValidatedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
