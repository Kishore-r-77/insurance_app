import axios from "axios";
import moment from "moment";
import { BusinessDatesStateType } from "../../../../reducerUtilities/types/admin/businessDate/businessDatesTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: BusinessDatesStateType
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/allbusinessdates`,
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

export const addApi = (state: BusinessDatesStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/businessdatecreate`,
    {
      CompanyID: companyId,
      UserID: state.UserID.length === 0 ? null : parseInt(state.UserID),
      Department:
        state.Department.length === 0 ? null : parseInt(state.Department),
      Date: moment(state.Date).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/businessdateupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      UserID: record.UserID.length === 0 ? null : parseInt(record.UserID),
      Department:
        record.Department.length === 0 ? null : parseInt(record.Department),
      Date: moment(record.Date).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/businessdatedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
