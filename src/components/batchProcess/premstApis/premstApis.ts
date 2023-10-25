import axios from "axios";
import moment from "moment";
//Attention: Check the path below and change it if required
import { BatchStateType } from "../../../reducerUtilities/types/batch/batchTypes";
import { PremiumStateType } from "../../../reducerUtilities/types/premst/premiumTypes";


export const premiumstatementbydateapi = (state: PremiumStateType, companyId: number) => {
    // Attention : Check and update the below API, if required
    return axios.post(
      `http://localhost:3000/api/v1/batchservices/premiumstatementbydate`,
      {
        FromDate: moment(state.FromDate).format("YYYYMMDD"),
        ToDate: moment(state.ToDate).format("YYYYMMDD"),
        FromPolicy: parseInt(state.FromPolicy),
        ToPolicy: parseInt(state.ToPolicy),
      },
      {
        withCredentials: true,
      }
    );
  };