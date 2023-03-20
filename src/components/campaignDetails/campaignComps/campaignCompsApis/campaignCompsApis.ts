import axios from "axios";
import moment from "moment";
import { CampaignCompsStateType } from "../../../../reducerUtilities/types/campaignComps/campaignCompsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: CampaignCompsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/pacificservices/campaigncomps`,
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

export const addApi = (state: CampaignCompsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/campaigncompcreate`,
    {
      CompanyID: companyId,
      CampaignID: parseInt(state.CampaignID),
      CampaignCode: state.CampaignCode,
      Fee: state.Fee,
      Basis: state.Basis,
      MinLead: state.MinLead,
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
    `http://localhost:3000/api/v1/pacificservices/campaigncompupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      CampaignID: parseInt(record.CampaignID),
      CampaignCode: record.CampaignCode,
      Fee: record.Fee,
      Basis: record.Basis,
      MinLead: record.MinLead,
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
    `http://localhost:3000/api/v1/pacificservices/campaigncompdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
