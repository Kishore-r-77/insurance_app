import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { ClientWorkStateType } from "../../../reducerUtilities/types/clientWork/clientWorkTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ClientWorkStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/getallclientwork`,
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

export const addApi = (state: ClientWorkStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/clientcreatework`,
    {
      CompanyID: companyId,
      ClientID: parseInt(state.ClientID),
      EmployerID: parseInt(state.EmployerID),
      PayRollNumber: state.PayRollNumber,
      Designation: state.Designation,
      Department: state.Department,
      Location: state.Location,
      // StartDate: moment(state.StartDate).format("YYYYMMDD"),
      // EndDate: moment(state.EndDate).format("YYYYMMDD"),
      StartDate:
        state.StartDate?.length === 0
          ? ""
          : moment(state.StartDate).format("YYYYMMDD").toString(),
      EndDate:
        state.EndDate?.length === 0
          ? ""
          : moment(state.EndDate).format("YYYYMMDD").toString(),
      WorkType: state.WorkType,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/clientupdatework`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      ClientID: parseInt(record.ClientID),
      EmployerID: parseInt(record.EmployerID),
      PayRollNumber: record.PayRollNumber,
      Designation: record.Designation,
      Department: record.Department,
      Location: record.Location,
      // StartDate: moment(record.StartDate).format("YYYYMMDD"),
      // EndDate: moment(record.EndDate).format("YYYYMMDD"),
      StartDate:
        record.StartDate?.length === 0
          ? ""
          : moment(record.StartDate).format("YYYYMMDD").toString(),
      EndDate:
        record.EndDate?.length === 0
          ? ""
          : moment(record.EndDate).format("YYYYMMDD").toString(),
      WorkType: record.WorkType,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/clientdeletework/${id}`,
    {
      withCredentials: true,
    }
  );
};
