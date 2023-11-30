import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { NomineeStateType } from "../../../reducerUtilities/types/nominee/nomineeType";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: NomineeStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/nbservices/nominees`, {
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

export const addApi = (
  state: NomineeStateType,
  companyId: number,
  policyId: string,
  data: any
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/nomineescreate`,

    {
      Nominee: data.map((nominees: any) => ({
        ...nominees,
        CompanyID: companyId,
        PolicyID: policyId,
        ClientID: parseInt(nominees?.ClientID),
        NomineeRelationship: nominees?.NomineeRelationship,
        NomineePercentage: parseFloat(nominees?.NomineePercentage),
      })),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/nomineeupdate`,
    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      PolicyID: parseInt(record.PolicyID),
      ClientID: parseInt(record.ClientID),
      NomineeRelationship: record.NomineeRelationship,
      NomineeLongName: record.NomineeLongName,
      NomineePercentage: parseFloat(record.NomineePercentage),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/nbservices/nomineedelete/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const p0045 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0045",
      languageId,
    },
  });
};
export const getNopmieesByPolicy = (policiesId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/deathservices/nomineesbypol/${policiesId}`,
    {
      withCredentials: true,
    }
  );
};

export const getPolicyApi = (id: number) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/policyget/${id}`, {
    withCredentials: true,
  });
};
