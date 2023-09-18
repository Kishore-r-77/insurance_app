import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { IlpFundsStateType } from "../../../reducerUtilities/types/ilpFund/ilpFundsTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: IlpFundsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/ilpservices/ilpfunds`, {
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
  state: IlpFundsStateType,
  benefitState: any,
  companyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/ilpservices/ilpfundCreate`,
    {
      CompanyID: companyId,
      PolicyID: parseInt(benefitState.PolicyID),
      BenefitID: parseInt(benefitState.ID),
      FundCode: state.FundCode,
      // FundType: parseInt(state.FundType),
      // EffectiveDate: moment(state.EffectiveDate).format("YYYYMMDD"),
      // FundCurr: state.FundCurr,
      FundPercentage: parseFloat(state.FundPercentage),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  // Attention : Check and update the below API, if required
  return axios.put(
    `http://localhost:3000/api/v1/ilpservices/ilpfundModify`,
    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      PolicyID: parseInt(record.PolicyID),
      BenefitID: parseInt(record.BenefitID),
      FundCode: record.FundCode,
      FundType: parseInt(record.FundType),
      EffectiveDate: moment(record.EffectiveDate).format("YYYYMMDD"),
      FundCurr: record.FundCurr,
      FundPercentage: parseFloat(record.FundPercentage),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    //Attention: Check the path below,if required
    `http://localhost:3000/api/v1/ilpservices/ilpfunddel/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const getAllApiByPolAndBen = (
  pageNum: number,
  pageSize: number,
  PolicyID: any,
  benefitID: any,
  state: IlpFundsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(
    `http://localhost:3000/api/v1/ilpservices/ilpfundbypolandben/${PolicyID}/${benefitID}`,
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
