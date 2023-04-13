import axios from "axios";
import moment from "moment";
import { BenefitStateType } from "../../../../../reducerUtilities/types/benefit/benefitTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: BenefitStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/benefits`, {
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
