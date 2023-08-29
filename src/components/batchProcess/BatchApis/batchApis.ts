import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { BatchStateType } from "../../../reducerUtilities/types/batch/batchTypes";

export const addApi = (state: BatchStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/batchservices/allocrbonusbydate`,
    {
      RevBonusDate: moment(state.RevBonusDate).format("YYYYMMDD"),
      FromPolicy: state.FromPolicy,
      ToPolicy: state.ToPolicy,
    },
    {
      withCredentials: true,
    }
  );
};
