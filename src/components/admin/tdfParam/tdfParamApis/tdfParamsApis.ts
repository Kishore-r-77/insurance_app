import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { TdfParamsStateType } from "../../../../reducerUtilities/types/admin/tdfParam/tdfParamsTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: TdfParamsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/basicservices/alltdfparam`, {
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

export const addApi = (state: TdfParamsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/tdfparamcreate`,
    {
      CompanyID: companyId,
      FromPolicy: parseInt(state.FromPolicy),
      ToPolicy: parseInt(state.ToPolicy),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/tdfparamupdate`,
    {
      ID: parseInt(record.ID),

      FromPolicy: parseInt(record.FromPolicy),
      ToPolicy: parseInt(record.ToPolicy),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/tdfparamdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
