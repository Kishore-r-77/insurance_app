import axios from "axios";
import moment from "moment";
import { CampaignsStateType } from "../../../../reducerUtilities/types/campaigns/campaignsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: CampaignsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/pacificservices/campaigns`, {
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

export const addApi = (state: CampaignsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/campaigncreate`,
    {
      CompanyID: companyId,
      SourceName: state.SourceName,
      ChannelCode: state.ChannelCode,
      Province: state.Province,
      Region: state.Region,
      Office: state.Office,
      Status: state.Status,
      StartDate: moment(state.StartDate).format("YYYYMMDD"),
      EndDate: moment(state.EndDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/campaignupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      SourceName: record.SourceName,
      ChannelCode: record.ChannelCode,
      Province: record.Province,
      Region: record.Region,
      Office: record.Office,
      Status: record.Status,
      StartDate: moment(record.StartDate).format("YYYYMMDD"),
      EndDate: moment(record.EndDate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/pacificservices/campaigndelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
