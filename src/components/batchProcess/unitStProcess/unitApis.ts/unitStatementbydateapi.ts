import axios from "axios";
import moment from "moment";
import { UnitStateType } from "../../../../reducerUtilities/types/unitst/unitType";
import { BatchStateType } from "../../../../reducerUtilities/types/batch/batchTypes";

export const unitStatementbydateapi = (
  state: BatchStateType,
  companyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/batchservices/unitstatementbydate`,
    {
      FromDate: moment(state.UnitStFromDate).format("YYYYMMDD"),
      ToDate: moment(state.UnitStToDate).format("YYYYMMDD"),
      FromPolicy: parseInt(state.UnitStFromPolicy),
      ToPolicy: parseInt(state.UnitStToPolicy),
    },
    {
      withCredentials: true,
    }
  );
};
