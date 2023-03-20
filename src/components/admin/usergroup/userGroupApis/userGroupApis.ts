import axios from "axios";
import moment from "moment";
import { UserGroupStateType } from "../../../../reducerUtilities/types/admin/userGroups/userGroupTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: UserGroupStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/usergroups`, {
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

export const addApi = (state: UserGroupStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/usergroupcreate`,
    {
      CompanyID: companyId,
      GroupName: state.GroupName,
      ValidFrom: moment(state.ValidFrom).format("YYYYMMDD"),
      ValidTo: moment(state.ValidTo).format("YYYYMMDD"),
      // Users: null,
      // Permissions: null,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/usergroupupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      GroupName: record.GroupName,
      ValidFrom: moment(record.ValidFrom).format("YYYYMMDD").toString(),
      ValidTo: moment(record.ValidTo).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/usergroupdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
