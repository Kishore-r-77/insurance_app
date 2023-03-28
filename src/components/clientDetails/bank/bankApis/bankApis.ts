import axios from "axios";
import moment from "moment";
import { BankStateType } from "../../../../reducerUtilities/types/bank/bankTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: BankStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/banks`, {
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

export const addApi = (state: BankStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/bankcreate`,
    {
      CompanyID: companyId,
      BankCode: state.BankCode,
      BankAccountNo: state.BankAccountNo,
      BankType: state.BankType,
      BankAccountStatus: state.BankAccountStatus,
      ClientID: state.ClientID,
      AgnecyID: parseInt(state.AgnecyID),

      StartDate: moment(state.StartDate).format("YYYYMMDD"),
      EndDate: moment(state.EndDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/bankupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),

      BankCode: record.BankCode,
      BankAccountNo: record.BankAccountNo,
      BankType: record.BankType,
      BankAccountStatus: record.BankAccountStatus,
      ClientID: record.ClientID,
      AgnecyID: parseInt(record.AgnecyID),

      StartDate: moment(record.StartDate).format("YYYYMMDD"),
      EndDate: moment(record.EndDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/bankdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
