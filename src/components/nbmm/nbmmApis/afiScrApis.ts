import axios from "axios";
import moment from "moment";
import { AfiScrStateType } from "../../../reducerUtilities/types/nbmm/afiScr/afiScrTypes";
//Attention: Check the path below and change it if required
//import { AfiScrStateType } from "../../../reducerUtilities/types/afiScr/afiScrTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: AfiScrStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/basicservices/getallafiScrs`, {
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

export const addApi = (state: any, companyId: number, policyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policyafi`,
    {
      CompanyID: companyId,
      PolicyID: policyId,
      ReasonDescription: state.ReasonDescription,
      RequestedDate: moment(state.RequestedDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/afiScrupdate`,
    {
      PolicyID: parseInt(record.PolicyID),
      UwreasonsId: record.UwreasonsId,
      RequestedDate: moment(record.RequestedDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/afiScrdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
