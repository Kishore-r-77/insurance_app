import axios from "axios";
import moment from "moment";
import { AgencyStateType } from "../../../reducerUtilities/types/agency/agencyTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: AgencyStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/pacificservices/agencies`, {
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

export const addApi = (state: AgencyStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/pacificservices/agencycreate`,
    {
      CompanyID: companyId,
      AgencyChannel: state.AgencyChannel,
      Office: state.Office,
      AgencySt: state.AgencySt,
      LicenseNo: state.LicenseNo,
      LicenseStartDate: moment(state.LicenseStartDate).format("YYYYMMDD"),
      LicenseEndDate: moment(state.LicenseEndDate).format("YYYYMMDD"),
      Startdate: moment(state.Startdate).format("YYYYMMDD"),
      EndDate: moment(state.EndDate).format("YYYYMMDD").toString(),
      TerminationReason: state.TerminationReason,
      ClientID: parseInt(state.ClientID),
      Aadhar: state.Aadhar,
      Pan: state.Pan,
      AddressID: parseInt(state.AddressID),
      BankID: parseInt(state.BankID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/pacificservices/agencyupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      AgencyChannel: record.AgencyChannel,
      Office: record.Office,
      AgencySt: record.AgencySt,
      LicenseNo: record.LicenseNo,
      LicenseStartDate: moment(record.LicenseStartDate).format("YYYYMMDD"),
      LicenseEndDate: moment(record.LicenseEndDate).format("YYYYMMDD"),
      Startdate: moment(record.Startdate).format("YYYYMMDD"),
      EndDate: moment(record.EndDate).format("YYYYMMDD").toString(),
      TerminationReason: record.TerminationReason,
      ClientID: parseInt(record.ClientID),
      Aadhar: record.Aadhar,
      Pan: record.Pan,
      AddressID: parseInt(record.AddressID),
      BankID: parseInt(record.BankID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/pacificservices/agencydelete/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const p0018 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0018",
      languageId,
    },
  });
};

export const p0019 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0019",
      languageId,
    },
  });
};
