import axios from "axios";
import moment from "moment";
import { PaymentsStateType } from "../../../reducerUtilities/types/payments/paymentsTypes";
//Attention: Check the path below and change it if required

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PaymentsStateType
) => {
  // Attention : Check and update the below API, if required
  return axios.get(`http://localhost:3000/api/v1/acservices/payments`, {
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
// export const getPolicySnap = (policyId: number) => {
//   return axios.get(
//     `http://localhost:3000/api/v1/nbservices/snappol/${policyId}`,
//     {
//       withCredentials: true,
//     }
//   );
// };

export const addApi = (state: PaymentsStateType, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/acservices/createpayment`,
    {
      CompanyID: companyId,
      Branch: state.Branch,
      CurrentDate: moment(state.CurrentDate).format("YYYYMMDD").toString(),
      AccCurry: state.AccCurry,
      AccAmount: parseInt(state.AccAmount),
      ClientID: parseInt(state.ClientID),
      PolicyID: parseInt(state.PolicyID),
      DateOfPayment: moment(state.DateOfPayment).format("YYYYMMDD").toString(),
      ReconciledDate: moment(state.ReconciledDate)
        .format("YYYYMMDD")
        .toString(),
      BankIFSC: state.BankIFSC,
      BankAccountNo: state.BankAccountNo,
      BankReferenceNo: state.BankReferenceNo,
      TypeOfPayment: state.TypeOfPayment,
      InsurerBankIFSC: state.InsurerBankIFSC,
      InsurerBankAccNo: state.InsurerBankAccNo,
      AddressID: parseInt(state.AddressID),
      Status: "AC",
      // ReconciledDate: moment(state.ReconciledDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const q0005 = (
  companyId: number,
  languageId: number,
  currency: string,
  product: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata?&date=20220101`,
    {
      withCredentials: true,
      params: {
        company_id: companyId,
        name: "Q0005",
        languageId,
        function: currency,
        item: product,
      },
    }
  );
};
