import axios from "axios";
import moment from "moment";
import { ErrorsStateType } from "../../../../reducerUtilities/types/admin/errorsTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ErrorsStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/errors`, {
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

export const addApi = (state: ErrorsStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/errorcreate`,
    {
      CompanyID: companyId,
      LanguageID: parseInt(state.LanguageID),
      Tranno: parseInt(state.Tranno),
      ShortCode: state.ShortCode,
      LongCode: state.LongCode,

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
    `http://localhost:3000/api/v1/basicservices/errorupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      LanguageID: parseInt(record.LanguageID),
      Tranno: parseInt(record.Tranno),
      ShortCode: record.ShortCode,
      LongCode: record.LongCode,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/errordelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
