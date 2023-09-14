import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { IlpPricesStateType } from "../../../reducerUtilities/types/ilpPrices/ilpPricesTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: IlpPricesStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/ilpservices/ilpprices`, {
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

export const addApi = (state: IlpPricesStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/ilpservices/ilppricesCreate`,
    {
      CompanyID: companyId,
      FundCode: state.FundCode,
      FundType: state.FundType,
      FundDate: moment(state.FundDate).format("YYYYMMDD"),
      FundEffDate: moment(state.FundEffDate).format("YYYYMMDD"),
      FundCurr: state.FundCurr,
      FundBidPrice: parseInt(state.FundBidPrice),
      FundOfferPrice: parseInt(state.FundOfferPrice),
      // FundSeqNo: parseInt(state.FundSeqNo),
      // ApprovalFlag: state.ApprovalFlag,
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/ilpservices/ilppricesModify`,
    {
      ID: parseInt(record.ID),

      CompanyID: parseInt(record.CompanyID),
      FundCode: record.FundCode,
      FundType: record.FundType,
      FundDate: moment(record.FundDate).format("YYYYMMDD"),
      FundEffDate: moment(record.FundEffDate).format("YYYYMMDD"),
      FundCurr: record.FundCurr,
      FundBidPrice: parseInt(record.FundBidPrice),
      FundOfferPrice: parseInt(record.FundOfferPrice),
      // FundSeqNo: parseInt(record.FundSeqNo),
      // ApprovalFlag: record.ApprovalFlag,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/ilpservices/ilpprices/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const approveApi = (effDate: string, id: number, fundCode: string) => {
  return axios.put(
    `http://localhost:3000/api/v1/ilpservices/approvalIlpPrice/${effDate}/${id}/${fundCode}`,
    {},
    {
      withCredentials: true,
    }
  );
};
