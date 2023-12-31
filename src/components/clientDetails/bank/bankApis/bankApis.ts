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
      // AgencyID: parseInt(state.AgencyID),

      StartDate:
        state.StartDate?.length === 0
          ? ""
          : moment(state.StartDate).format("YYYYMMDD").toString(),
      EndDate:
        state.EndDate?.length === 0
          ? ""
          : moment(state.EndDate).format("YYYYMMDD").toString(),
      BankGroup: state.BankGroup,
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
      // AgnecyID: parseInt(record.AgnecyID),

      StartDate:
        record.StartDate?.length === 0
          ? ""
          : moment(record.StartDate).format("YYYYMMDD").toString(),
      EndDate: moment(record.EndDate).format("YYYYMMDD"),
      BankGroup: record.BankGroup,
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
export const p0050 = (
  companyId: number,
  name: string,
  languageId: number,
  item: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
    {
      withCredentials: true,
      params: {
        companyId,
        name,
        languageId,
        item,
      },
    }
  );
};
