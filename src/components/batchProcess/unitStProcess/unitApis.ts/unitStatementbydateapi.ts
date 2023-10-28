import axios from "axios";
import moment from "moment";
import { UnitStateType } from "../../../../reducerUtilities/types/unitst/unitType";

export const unitStatementbydateapi = (
  state: UnitStateType,
  companyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/batchservices/unitstatementbydate`,
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
