import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { AssigneeStateType } from "../../../reducerUtilities/types/assignee/assigneeTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: AssigneeStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/nbservices/assignees`, {
    withCredentials: true,
    // params: {
    //   pageNum: pageNum,
    //   pageSize: pageSize,
    //   searchString: state.searchString,
    //   searchCriteria: state.searchCriteria,
    //   sortColumn: state.sortColumn,
    //   sortDirection: state.sortAsc ? "asc" : state.sortDesc ? "desc" : null,
    // },
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

export const addApi = (
  state: AssigneeStateType,
  companyId: number,
  policyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/assigneecreate`,
    {
      CompanyID: companyId,
      PolicyID: policyId,
      ClientID: parseInt(state.ClientID),
      AssigneeType: state.AssigneeType,
      Fromdate: moment(state.Fromdate).format("YYYYMMDD"),
      Todate: moment(state.Todate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/assigneeupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      PolicyID: parseInt(record.PolicyID),
      ClientID: parseInt(record.ClientID),
      AssigneeType: record.AssigneeType,
      Fromdate: moment(record.Fromdate).format("YYYYMMDD"),
      Todate: moment(record.Todate).format("YYYYMMDD"),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/nbservices/assigneedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
