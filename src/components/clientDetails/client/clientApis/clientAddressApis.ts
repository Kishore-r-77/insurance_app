import axios from "axios";
import moment from "moment";
import { ClientStateType } from "../../../../reducerUtilities/types/client/clientTypes";

export const getAddressByClient = (clientId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/addressgetbyclient/${clientId}`,
    {
      withCredentials: true,
    }
  );
};

export const createClientWithAddress = (
  state: ClientStateType,
  companyId: number,
  data: any,
  ClientType: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/basicservices/clientcreatewithaddress`,
    {
      CompanyID: companyId,
      Language: state.Language,
      Salutation: state.Salutation,
      ClientShortName: state.ClientShortName,
      ClientLongName: state.ClientLongName,
      ClientSurName: state.ClientSurName,
      Gender: state.Gender,
      ClientType: ClientType,
      ClientDob:
        state.ClientDob?.length === 0
          ? ""
          : moment(state.ClientDob).format("YYYYMMDD").toString(),

      ClientEmail: state.ClientEmail,
      ClientMobile: `+91${state.ClientMobile}`,
      ClientStatus: state.ClientStatus,
      ClientDod:
        state.ClientDod?.length === 0
          ? ""
          : moment(state.ClientDod).format("YYYYMMDD").toString(),
      Addresses: data.map((address: any) => ({
        ...address,
        AddressStartDate: moment(address?.AddressStartDate).format("YYYYMMDD"),
        // AddressEndDate: moment(address?.AddressEndDate).format("YYYYMMDD"),
      })),
    },
    {
      withCredentials: true,
    }
  );
};
