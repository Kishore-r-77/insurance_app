import axios from "axios";
import moment from "moment";
import { ReceiptsStateType } from "../../../reducerUtilities/types/receipts/receiptsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ReceiptsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/acservices/receipts`, {
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

export const addApi = (state: ReceiptsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/acservices/createreceipt`,
    {
      CompanyID: companyId,
      Branch: state.Branch,
      CurrentDate: state.CurrentDate,
      DateOfCollection: state.DateOfCollection,
      ClientID: parseInt(state.ClientID),
      TypeOfReceipt: state.TypeOfReceipt,
      BankReferenceNo: state.BankReferenceNo,
      BankAccountNo: state.BankAccountNo,
      AccCurry: state.AccCurry,
      AccAmount: parseInt(state.AccAmount),
      PolicyID: parseInt(state.PolicyID),
      ReconciledDate: null,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/receiptsupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      Branch: record.Branch,
      CurrentDate: record.CurrentDate,
      DateOfCollection: record.DateOfCollection,
      ClientID: parseInt(record.ClientID),
      TypeOfReceipt: record.TypeOfReceipt,
      BankReferenceNo: record.BankReferenceNo,
      BankAccountNo: record.BankAccountNo,
      AccCurry: record.AccCurry,
      AccAmount: record.AccAmount,
      PolicyID: parseInt(record.PolicyID),
      ReconciledDate: record.ReconciledDate,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/receiptsdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};