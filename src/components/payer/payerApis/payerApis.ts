import axios from "axios";
import moment from "moment";
import { PayerStateType } from "../../../reducerUtilities/types/payer/payerTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PayerStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/nbservices/payers`, {
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

export const addApi = (
  state: PayerStateType,
  companyId: number,
  policyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/payercreate`,
    {
      CompanyID: companyId,
      PolicyID: policyId,
      ClientID: parseInt(state.ClientID),
      BankID: parseInt(state.BankID),
      FromDate: moment(state.FromDate).format("YYYYMMDD"),
      ToDate: moment(state.ToDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/payerupdate`,
    {
      ID: record.ID,
      CompanyID: record.CompanyID,
      PolicyID: parseInt(record.PolicyID),
      ClientID: parseInt(record.ClientID),
      BankID: parseInt(record.BankID),
      FromDate: moment(record.FromDate).format("YYYYMMDD"),
      ToDate: moment(record.ToDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/nbservices/payerdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
