import axios from "axios";
import moment from "moment";
import { PolicyStateType } from "../../../reducerUtilities/types/policy/policyTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PolicyStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/policies`, {
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

export const addApi = (state: PolicyStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policycreate`,
    {
      CompanyID: companyId,
      PRCD: moment(state.PRCD).format("YYYYMMDD").toString(),
      PProduct: state.PProduct,
      PFreq: state.PFreq,
      PContractCurr: state.PContractCurr,
      PBillCurr: state.PBillCurr,
      POffice: state.POffice,
      PolStatus: state.PolStatus,

      PReceivedDate: moment(state.PReceivedDate).format("YYYYMMDD").toString(),
      //PUWDate: moment(state.PUWDate).format("YYYYMMDD").toString(),
      ClientID: parseInt(state.ClientID),
      AgencyID: parseInt(state.AgencyID),
      AddressID: parseInt(state.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/policyupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      PRCD: moment(record.PRCD).format("YYYYMMDD").toString(),
      PProduct: record.PProduct,
      PFreq: record.PFreq,
      PContractCurr: record.PContractCurr,
      PBillCurr: record.PBillCurr,
      POffice: record.POffice,
      PolStatus: record.PolStatus,

      PReceivedDate: moment(record.PReceivedDate).format("YYYYMMDD").toString(),
      ClientID: parseInt(record.ClientID),
      AgencyID: parseInt(record.AgencyID),
      AddressID: parseInt(record.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/nbservices/policydelete/${id}`,
    {
      withCredentials: true,
    }
  );
};

//paramItems

export const q0005 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "Q0005",
      languageId,
    },
  });
};
export const frequency = (companyId: number, languageId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata?name=Q0005&date=20220101&item=END&company_id=1&function=Freq`,
    {
      withCredentials: true,
    }
  );
};
export const p0023 = (
  companyId: number,
  languageId: number,
  currency: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata?name=Q0005&date=20220101&item=END&company_id=1&function=${currency}`,
    {
      withCredentials: true,
      params: {
        companyId,
        name: "P0023",
        languageId,
      },
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
export const p0024 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0024",
      languageId,
    },
  });
};
// export const getNopmieesByPolicy = (policiesId: number) => {
//   return axios.get(
//     `http://localhost:3000/api/v1/deathservices/nomineesbypol/${policiesId}`,
//     {
//       withCredentials: true,
//     }
//   );
// };
