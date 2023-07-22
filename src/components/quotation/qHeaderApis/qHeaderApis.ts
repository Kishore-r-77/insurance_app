import axios from "axios";
import moment from "moment";
import { QHeaderStateType } from "../../../reducerUtilities/types/quotation/qHeader/qHeaderTypes";
//Attention: Check the path below and change it if required
//import { QHeaderStateType } from "../../../reducerUtilities/types/qHeader/qHeaderTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: QHeaderStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/quotationservices/qheaders`, {
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

export const paramCoverageItem = (
  companyId: number,
  name: string,
  item: string,
  date: string,
  languageId: number
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
        languageId,
      },
    }
  );
};
export const paramTermItem = (
  companyId: number,
  name: string,
  languageId: number,
  item: string,
  date: string,
  func: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata`,
    {
      withCredentials: true,
      params: {
        company_id: companyId,
        name,
        languageId,
        item,
        date,
        function: func,
      },
    }
  );
};
export const addApi = (state: QHeaderStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qheadercreate`,
    {
      CompanyID: parseInt(state.CompanyID),
      QuoteDate: moment(state.QuoteDate).format("YYYYMMDD"),
      QStatus: null,
      QProduct: state.QProduct,
      QContractCurr: state.QContractCurr,
      ClientID: parseInt(state.ClientID),
      QFirstName: state.QFirstName,
      QLastName: state.QLastName,
      QDob: moment(state.QDob).format("YYYYMMDD"),
      QGender: state.QGender,
      QNri: state.QNri,
      QEmail: state.QEmail,
      QMobile: state.QMobile,
      AddressID: parseInt(state.AddressID),
      QOccGroup: state.QOccGroup,
      QOccSect: state.QOccSect,
      QOccupation: state.QOccupation,
      QAnnualIncome: state.QAnnualIncome,
      AgencyID: parseInt(state.AgencyID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/quotationservices/qheaderupdate`,
    {
      CompanyID: parseInt(record.CompanyID),
      ID: parseInt(record.ID),

      Quotedate: moment(record.Quotedate).format("YYYYMMDD"),
      Qstatus: record.Qstatus,
      Qproduct: record.Qproduct,
      Qcontractcurr: record.Qcontractcurr,
      ClientID: parseInt(record.ClientID),
      Qfirstname: record.Qfirstname,
      Qlastname: record.Qlastname,
      Qdob: moment(record.Qdob).format("YYYYMMDD"),
      Qgender: record.Qgender,
      Qnri: record.Qnri,
      Qemail: record.Qemail,
      Qmobile: record.Qmobile,
      AddressID: parseInt(record.AddressID),
      Qoccgroup: record.Qoccgroup,
      Qoccsect: record.Qoccsect,
      Qoccupation: record.Qoccupation,
      Qannualincome: record.Qannualincome,
      AgencyID: parseInt(record.AgencyID),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/quotationservices/qHeaderdelete/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const getQheader = (id: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/quotationservices/qheaderget/${id}`,
    {
      withCredentials: true,
    }
  );
};
export const getAllQDetailByQheaderApi = (id: number) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/quotationservices/qdetailgetbyqheader/${id}`,
    {
      withCredentials: true,
    }
  );
};
