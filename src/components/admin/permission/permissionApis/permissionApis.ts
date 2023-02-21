import axios from "axios";
import moment from "moment";
import { PermissionStateType } from "../../../../reducerUtilities/types/admin/permissionTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PermissionStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/permissions`, {
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

export const addApi = (body: any) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/permissioncreate`,
    body,
    {
      withCredentials: true,
    }
  );
};

export const editApi = (body: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/permissionupdate`,

    body,
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/permissiondelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
