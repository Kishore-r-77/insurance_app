import axios from "axios";
import moment from "moment";
import { QHeadersStateType } from "../../../reducerUtilities/types/qHeader/qHeadersTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QHeadersStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/getallqHeaderss`,
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

export const addApi = (state: QHeadersStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/qHeaderscreate`,
    {
      CompanyID: companyId,
      QuoteDate: moment(state.QuoteDate).format("YYYYMMDD"),
      QProduct: state.QProduct,
      ClientID: parseInt(state.ClientID),
      QFirstName: null,
      QLastName: null,
      QMidName: null,
      QDob: moment(state.QDob).format("YYYYMMDD"),
      QGender: null,
      QNri: state.QNri,
      QEmail: null,
      QMobile: null,
      QOccGroup: state.QOccGroup,
      QOccSect: state.QOccSect,
      QOccupation: state.QOccupation,
      QAnnualIncome: state.QAnnualIncome,
      QDeclaration: state.QDeclaration,
      AddressID: parseInt(state.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/basicservices/qHeadersupdate`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      QuoteDate: moment(record.QuoteDate).format("YYYYMMDD"),
      QProduct: record.QProduct,
      ClientID: parseInt(record.ClientID),
      QFirstName: record.QFirstName,
      QLastName: record.QLastName,
      QMidName: record.QMidName,
      QDob: moment(record.QDob).format("YYYYMMDD"),
      QGender: record.QGender,
      QNri: record.QNri,
      QEmail: record.QEmail,
      QMobile: record.QMobile,
      QOccGroup: record.QOccGroup,
      QOccSect: record.QOccSect,
      QOccupation: record.QOccupation,
      QAnnualIncome: record.QAnnualIncome,
      QDeclaration: record.QDeclaration,
      AddressID: parseInt(record.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/basicservices/qHeadersdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};
