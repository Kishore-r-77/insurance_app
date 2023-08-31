import axios from "axios";
import moment from "moment";

export const getAllHistrotyReverse = (
  pageNum: number,
  pageSize: number,
  searchString: string,
  searchCriteria: string,
  policyId: number
) => {
  return axios.get(
    `http://localhost:3000/api/v1/nbservices/historygetreverse/${policyId}`,
    {
      withCredentials: true,
      params: {
        pageNum: pageNum,
        pageSize: pageSize,
        searchString: searchString,
        searchCriteria: searchCriteria,
      },
    }
  );
};

export const addApi = (Remark: any, Tranno: number, policyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policyReverseTransaction`,
    {
      PolicyID: policyId,
      Tranno: Tranno,
      Remark: Remark,
    },
    {
      withCredentials: true,
    }
  );
};
