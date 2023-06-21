import axios from "axios";
import moment from "moment";
import { LeadAllocationsStateType } from "../../../../reducerUtilities/types/lead/leadAllocations/leadAllocationsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: LeadAllocationsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/pacificservices/leadallocations`,
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

export const addApi = (state: LeadAllocationsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/leadallocationcreate`,
    {
      CompanyID: companyId,
      Office: state.Office,
      SalesManager: state.SalesManager,
      AgencyID: parseInt(state.AgencyID),
      AllocationDate: moment(state.AllocationDate).format("YYYYMMDD"),
      AppointmentDate: moment(state.AppointmentDate).format("YYYYMMDD"),
      LeadAllocStatus: state.LeadAllocStatus,
      ProductType: state.ProductType,
      ProductCode: state.ProductCode,
      NoofAppointment: null,
      Priority: state.Priority,
      Quality: state.Quality,
      ClosureStatus: state.ClosureStatus,
      ClosureDate:
        state.ClosureDate?.length === 0
          ? ""
          : moment(state.ClosureDate).format("YYYYMMDD").toString(),
      ExtractionDate:
        state.ExtractionDate?.length === 0
          ? ""
          : moment(state.ExtractionDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/leadallocationupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      Office: record.Office,
      SalesManager: record.SalesManager,
      AgencyID: parseInt(record.AgencyID),
      ClientID: record.ClientID,
      ClientName: record.ClientName,
      AllocationDate: moment(record.AllocationDate).format("YYYYMMDD"),
      AppointmentDate: moment(record.AppointmentDate).format("YYYYMMDD"),
      LeadAllocStatus: record.LeadAllocStatus,
      ProductType: record.ProductType,
      ProductCode: record.ProductCode,
      NoofAppointment: record.NoofAppointment,
      Priority: record.Priority,
      Quality: record.Quality,
      ClosureStatus: record.ClosureStatus,
      ClosureDate:
        record.ClosureDate?.length === 0
          ? ""
          : moment(record.ClosureDate).format("YYYYMMDD").toString(),
      ExtractionDate:
        record.ExtractionDate?.length === 0
          ? ""
          : moment(record.ExtractionDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/pacificservices/leadallocationdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
