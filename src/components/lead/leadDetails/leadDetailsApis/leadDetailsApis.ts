import axios from "axios";
import moment from "moment";
import { LeadDetailsStateType } from "../../../../reducerUtilities/types/lead/leadDetails/leadDetailsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: LeadDetailsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/pacificservices/leaddetails`, {
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

export const addApi = (state: LeadDetailsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/leaddetailcreate`,
    {
      CompanyID: companyId,
      LeadChannelID: parseInt(state.LeadChannelID),
      OfficeCode: state.OfficeCode,
      ProviderName: state.ProviderName,
      ClientID: parseInt(state.ClientID),
      ReceivedDate: moment(state.ReceivedDate).format("YYYYMMDD"),
      CampaignCode: state.CampaignCode,
      ProductType: state.ProductType,
      ProductCode: state.ProductCode,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/leaddetailupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      LeadChannelID: parseInt(record.LeadChannelID),
      OfficeCode: record.OfficeCode,
      ProviderName: record.ProviderName,
      ClientID: parseInt(record.ClientID),
      ReceivedDate: moment(record.ReceivedDate).format("YYYYMMDD"),
      CampaignCode: record.CampaignCode,
      ProductType: record.ProductType,
      ProductCode: record.ProductCode,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/pacificservices/leaddetaildelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
