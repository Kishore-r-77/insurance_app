import axios from "axios";
import moment from "moment";
import { CompaniesStateType } from "../../../../reducerUtilities/types/admin/companies/companiesTypes";
import { useAppSelector } from "../../../../redux/app/hooks";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: CompaniesStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/companies`, {
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

export const addApi = (state: CompaniesStateType) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/companycreate`,
    {
      CompanyName: state.CompanyName,
      CompanyAddress1: state.CompanyAddress1,
      CompanyAddress2: state.CompanyAddress2,
      CompanyAddress3: state.CompanyAddress3,
      CompanyAddress4: state.CompanyAddress4,
      CompanyAddress5: state.CompanyAddress5,
      CompanyPostalCode: state.CompanyPostalCode,
      CompanyCountry: state.CompanyCountry,
      CompanyUid: state.CompanyUid,
      CompanyGst: state.CompanyGst,
      CompanyPan: state.CompanyPan,
      CompanyTan: state.CompanyTan,
      CompanyStatusID: parseInt(state.CompanyStatusID),
      CompanyLogo: state.CompanyLogo,
      CompanyIncorporationDate: moment(state.CompanyIncorporationDate).format(
        "YYYYMMDD"
      ),
      CompanyTerminationDate: moment(state.CompanyTerminationDate).format(
        "YYYYMMDD"
      ),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/companyupdate`,

    {
      ID: record.ID,
      CompanyName: record.CompanyName,
      CompanyAddress1: record.CompanyAddress1,
      CompanyAddress2: record.CompanyAddress2,
      CompanyAddress3: record.CompanyAddress3,
      CompanyAddress4: record.CompanyAddress4,
      CompanyAddress5: record.CompanyAddress5,
      CompanyPostalCode: record.CompanyPostalCode,
      CompanyCountry: record.CompanyCountry,
      CompanyUid: record.CompanyUid,
      CompanyGst: record.CompanyGst,
      CompanyPan: record.CompanyPan,
      CompanyTan: record.CompanyTan,
      CompanyStatusID: parseInt(record.CompanyStatusID),
      CompanyLogo: record.CompanyLogo,
      CompanyIncorporationDate: moment(record.CompanyIncorporationDate).format(
        "YYYYMMDD"
      ),
      CompanyTerminationDate: moment(record.CompanyTerminationDate).format(
        "YYYYMMDD"
      ),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/deletecompany/${id}`,
    {
      withCredentials: true,
    }
  );
};
export const getApi = (id: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/getcompany/${id}`,
    {
      withCredentials: true,
    }
  );
};
