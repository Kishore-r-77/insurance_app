import axios from "axios";
import moment from "moment";
import { LeadChannelsStateType } from "../../../../reducerUtilities/types/lead/leadChannels/leadChannelsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: LeadChannelsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/getallleadChannelss`,
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

export const addApi = (state: LeadChannelsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/leadChannelscreate`,
    {
      CompanyID: companyId,
      ChannelCode: state.ChannelCode,
      ChannelDesc: state.ChannelDesc,
      StartDate: moment(state.StartDate).format("YYYYMMDD"),
      EndDate: moment(state.EndDate).format("YYYYMMDD"),
      LeadAllocSt: state.LeadAllocSt,
      StatusReason: state.StatusReason,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/leadChannelsupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      ChannelCode: record.ChannelCode,
      ChannelDesc: record.ChannelDesc,
      StartDate: moment(record.StartDate).format("YYYYMMDD"),
      EndDate: moment(record.EndDate).format("YYYYMMDD"),
      LeadAllocSt: record.LeadAllocSt,
      StatusReason: record.StatusReason,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/leadChannelsdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
