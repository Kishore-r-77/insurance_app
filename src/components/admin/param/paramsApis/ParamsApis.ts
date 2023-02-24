import axios from "axios";
import { ParamsStateType } from "../../../../reducerUtilities/types/admin/parameterTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ParamsStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/params`, {
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

export const addApi = (state: ParamsStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/paramcreate`,
    {
      companyId: companyId,
      languageId: parseInt(state.languageId),
      longdesc: state.longdesc,
      name: state.name,
      type: state.type,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/paramupdate`,

    {
      companyId: record.companyId,
      languageId: record.languageId,
      longdesc: record.longdesc,
      name: record.name,
      type: record.type,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/paramdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
