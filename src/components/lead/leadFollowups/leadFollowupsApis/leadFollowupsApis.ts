import axios from "axios";
import moment from "moment";
import { LeadFollowupsStateType } from "../../../../reducerUtilities/types/lead/leadFollowups/leadFollowupsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: LeadFollowupsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/pacificservices/leadfollowups`,
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

export const addApi = (state: LeadFollowupsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/leadfollowupcreate`,
    {
      CompanyID: companyId,
      CountryCode: state.CountryCode,
      LeadDetailID: parseInt(state.LeadDetailID),
      SeqNo: null,
      AppointmentDate: moment(state.AppointmentDate).format("YYYYMMDD"),
      AppointmentFlag: state.AppointmentFlag,
      PreferredDay: state.PreferredDay,
      PreferredTime: state.PreferredTime,
      ActualMeetingDate: moment(state.ActualMeetingDate).format("YYYYMMDD"),
      ActionNote: state.ActionNote,
      NextFollowupDate: moment(state.NextFollowupDate).format("YYYYMMDD"),
      ProgressStatus: state.ProgressStatus,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/leadfollowupupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      CountryCode: record.CountryCode,
      LeadDetailID: parseInt(record.LeadDetailID),
      SeqNo: record.SeqNo,
      AppointmentDate: moment(record.AppointmentDate).format("YYYYMMDD"),
      AppointmentFlag: record.AppointmentFlag,
      PreferredDay: record.PreferredDay,
      PreferredTime: record.PreferredTime,
      ActualMeetingDate: moment(record.ActualMeetingDate).format("YYYYMMDD"),
      ActionNote: record.ActionNote,
      NextFollowupDate: moment(record.NextFollowupDate).format("YYYYMMDD"),
      ProgressStatus: record.ProgressStatus,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/pacificservices/leadfollowupdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
