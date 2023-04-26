import axios from "axios";
import moment from "moment";
import { DeathHStateType } from "../../../../reducerUtilities/types/death/deathH/deathHTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: DeathHStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/deathservices/deaths`, {
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
export const getLAByPolicy = (policyId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/deathservices/getpolicybyclient/${policyId}`,
    {
      withCredentials: true,
    }
  );
};

export const createDeathWithBenefits = (
  state: DeathHStateType,
  companyId: number,
  data: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/deathservices/createdeath`,
    {
      Function: state.Function,
      CompanyID: companyId,
      PolicyID: state.PolicyID,
      ClientID: state.ClientID,
      EffectiveDate:
        state.EffectiveDate?.length === 0
          ? ""
          : moment(state.EffectiveDate).format("YYYYMMDD").toString(),
      DeathDate:
        state.DeathDate?.length === 0
          ? ""
          : moment(state.DeathDate).format("YYYYMMDD").toString(),
      Cause: state.Cause,

      DeathProof: state.DeathProof,

      DeathDs: data.map((death: any) => ({
        ...death,
        ClientID: state.ClientID,
        BSumAssured: parseInt(death.BSumAssured),
        RevBonus: parseInt(death.RevBonus),
        AddlBonus: parseInt(death.AddlBonus),
        InterimBonus: parseInt(death.InterimBonus),
        TotalDeathAmount: parseInt(death.TotalDeathAmount),
      })),
    },

    {
      withCredentials: true,
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
