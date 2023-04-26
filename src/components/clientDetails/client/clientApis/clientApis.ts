import axios from "axios";
import moment from "moment";
import { ClientStateType } from "../../../../reducerUtilities/types/client/clientTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: ClientStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/getallclient`, {
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
export const extraParamItem = (
  companyId: number,
  name: string,
  item: string,
  date: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata`,
    {
      withCredentials: true,
      params: {
        company_id: companyId,
        name,
        item,
        date,
      },
    }
  );
};

export const addApi = (state: ClientStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/client`,
    {
      CompanyID: companyId,
      Language: state.Language,
      Salutation: state.Salutation,
      ClientShortName: state.ClientShortName,
      ClientLongName: state.ClientLongName,
      ClientSurName: state.ClientSurName,
      Gender: state.Gender,
      ClientDob:
        state.ClientDob?.length === 0
          ? ""
          : moment(state.ClientDob).format("YYYYMMDD").toString(),

      ClientEmail: state.ClientEmail,
      ClientMobile: `+91${state.ClientMobile}`,
      ClientStatus: state.ClientStatus,
      ClientDod:
        state.ClientDod?.length === 0
          ? ""
          : moment(state.ClientDod).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/clientupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      Language: record.Language,
      Salutation: record.Salutation,
      ClientShortName: record.ClientShortName,
      ClientLongName: record.ClientLongName,
      ClientSurName: record.ClientSurName,
      Gender: record.Gender,
      ClientDob:
        record.ClientDob?.length === 0
          ? ""
          : moment(record.ClientDob).format("YYYYMMDD").toString(),

      ClientEmail: record.ClientEmail,
      ClientMobile: `+91${record.ClientMobile}`,
      ClientStatus: record.ClientStatus,
      ClientDod:
        record.ClientDod?.length === 0
          ? ""
          : moment(record.ClientDod).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/basicservices/clientdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
