import axios from "axios";
import { SsiStateType } from "../../../reducerUtilities/types/ssi/ssiTypes";

export const getAllApi = (
    pageNum: number,
    pageSize: number,
    state: SsiStateType
) => {
    // Attention : Check and update the below API, if required
    return axios.get(`http://localhost:3000/api/v1/nbservices/getallpabillsum`, {
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