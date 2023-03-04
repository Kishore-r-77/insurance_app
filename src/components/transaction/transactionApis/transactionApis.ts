import axios from "axios";
import { TransactionStateType } from "../../../reducerUtilities/types/transaction/transactionTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: TransactionStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/transactions`, {
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

export const addApi = (state: TransactionStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/transactioncreate`,
    {
      CompanyID: companyId,
      Method: state.Method,
      Description: state.Description,

      // Users: null,
      // Permissions: null,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/transactionupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      Method: record.Method,
      Description: record.Description,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/transactiondelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
