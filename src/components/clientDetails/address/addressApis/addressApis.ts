import axios from "axios";
import moment from "moment";
import { AddressStateType } from "../../../../reducerUtilities/types/admin/address/addressTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: AddressStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/addresses`, {
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
export const getAddressType = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId: companyId,
      name: "P0022",
      languageId: languageId,
    },
  });
};

export const addApi = (state: AddressStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/addresscreate`,
    {
      CompanyID: companyId,
      AddressType: state.AddressType,
      AddressLine1: state.AddressLine1,
      AddressLine2: state.AddressLine2,
      AddressLine3: state.AddressLine3,
      AddressLine4: state.AddressLine4,
      AddressLine5: state.AddressLine5,
      AddressPostCode: state.AddressPostCode,
      AddressState: state.AddressState,
      AddressCountry: state.AddressCountry,
      AddressStartDate: moment(state.AddressStartDate).format("YYYYMMDD"),
      AddressEndDate: moment(state.AddressEndDate).format("YYYYMMDD"),
      ClientID: parseInt(state.ClientID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/addressupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      AddressType: record.AddressType,
      AddressLine1: record.AddressLine1,
      AddressLine2: record.AddressLine2,
      AddressLine3: record.AddressLine3,
      AddressLine4: record.AddressLine4,
      AddressLine5: record.AddressLine5,
      AddressPostCode: record.AddressPostCode,
      AddressState: record.AddressState,
      AddressCountry: record.AddressCountry,
      AddressStartDate: moment(record.AddressStartDate).format("YYYYMMDD"),
      AddressEndDate: moment(record.AddressEndDate).format("YYYYMMDD"),
      ClientID: parseInt(record.ClientID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/addressdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
