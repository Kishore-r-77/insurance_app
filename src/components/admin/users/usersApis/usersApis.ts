import axios from "axios";
import { usersStateType } from "../../../../reducerUtilities/types/admin/usersTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: usersStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/auth/getallusers`, {
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
