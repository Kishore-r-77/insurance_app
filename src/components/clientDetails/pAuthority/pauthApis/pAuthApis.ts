import axios from "axios";
import moment from "moment";
import { pAStateType } from "../../../../reducerUtilities/types/pa/paTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: pAStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/pas`, {
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

export const addApi = (state: pAStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/pacreate`,
    {
      CompanyID: companyId,
      ClientID: state.ClientID,
      PaName: state.PaName,
      PaType: state.PaType,
      StartDate:
        state.StartDate?.length === 0
          ? ""
          : moment(state.StartDate).format("YYYYMMDD").toString(),
      EndDate:
        state.EndDate?.length === 0
          ? ""
          : moment(state.EndDate).format("YYYYMMDD").toString(),
      PaStatus: state.PaStatus,
      // AgencyID: parseInt(state.AgencyID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/paupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      ClientID: record.ClientID,
      PaName: record.PaName,
      PaType: record.PaType,
      StartDate:
        record.StartDate?.length === 0
          ? ""
          : moment(record.StartDate).format("YYYYMMDD").toString(),
      EndDate:
        record.EndDate?.length === 0
          ? ""
          : moment(record.EndDate).format("YYYYMMDD").toString(),
      PaStatus: record.PaStatus,
      // AgnecyID: parseInt(record.AgnecyID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/nbservices/padelete/${id}`,
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

export const getPayingAuthByClient = (
  clientId: number,
  pageNum: number,
  pageSize: number,
  searchContent: any,
  state: any
) => {
  return axios.get(
    `http://localhost:3000/api/v1/nbservices/allpayauth/${clientId}`,
    {
      withCredentials: true,
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
        searchString: searchContent?.searchString,
        searchCriteria: searchContent?.searchCriteria,
        sortColumn: state.sortColumn,
        sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
      },
    }
  );
};
