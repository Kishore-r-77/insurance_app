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

export const addApi = (
  state: PaymentsStateType,
  companyId: number,
  id: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/acservices/createpayment`,
    {
      CompanyID: companyId,
      Branch: state.Branch,
      AccCurry: state.AccCurry,
      AccAmount: parseInt(state.AccAmount),
      ClientID: parseInt(state.ClientID),
      PolicyID: parseInt(state.PolicyID),
      DateOfPayment: moment(state.DateOfPayment).format("YYYYMMDD").toString(),
      ReconciledDate: moment(state.ReconciledDate)
        .format("YYYYMMDD")
        .toString(),
      BankIFSC: state.BankIFSC,
      PaymentAccount: state.PaymentAccount,
      BankAccountNo: state.BankAccountNo,
      BankReferenceNo: state.BankReferenceNo,
      TypeOfPayment: state.TypeOfPayment,
      InsurerBankIFSC: state.InsurerBankIFSC,
      InsurerBankAccNo: state.InsurerBankAccNo,
      AddressID: parseInt(state.AddressID),
      Status: "PN",
      MakerUserID: id,
      // CheckerUserID: parseInt(state.CheckerUserID),
      // Reason: state.Reason,
      // ReconciledDate: moment(state.ReconciledDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};

export const approveApi = (record: any, id: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/acservices/approvepayment`,
    {
      ID: parseInt(record?.ID),
      CompanyID: parseInt(record.CompanyID),
      Branch: record?.Branch,
      AccCurry: record?.AccCurry,
      AccAmount: parseInt(record.AccAmount),
      ClientID: parseInt(record.ClientID),
      PolicyID: parseInt(record.PolicyID),
      DateOfPayment: moment(record.DateOfPayment).format("YYYYMMDD").toString(),
      ReconciledDate: moment(record.ReconciledDate)
        .format("YYYYMMDD")
        .toString(),
      BankIFSC: record.BankIFSC,
      PaymentAccount: record.PaymentAccount,
      BankAccountNo: record.BankAccountNo,
      BankReferenceNo: record.BankReferenceNo,
      TypeOfPayment: record.TypeOfPayment,
      InsurerBankIFSC: record.InsurerBankIFSC,
      InsurerBankAccNo: record.InsurerBankAccNo,
      AddressID: parseInt(record.AddressID),
      Status: "AP",
      //MakerUserID: parseInt(record.MakerUserID),
      CheckerUserID: id,
      Reason: record.Reason,
      // ReconciledDate: moment(record.ReconciledDate).format("YYYYMMDD").toString(),
    },
    {
      withCredentials: true,
    }
  );
};
export const rejectionApi = (record: any, id: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/acservices/rejectpayment`,
    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      Branch: record.Branch,
      AccCurry: record.AccCurry,
      AccAmount: parseInt(record.AccAmount),
      ClientID: parseInt(record.ClientID),
      PolicyID: parseInt(record.PolicyID),
      DateOfPayment: moment(record.DateOfPayment).format("YYYYMMDD").toString(),
      ReconciledDate: moment(record.ReconciledDate)
        .format("YYYYMMDD")
        .toString(),
      BankIFSC: record.BankIFSC,
      PaymentAccount: record.PaymentAccount,
      BankAccountNo: record.BankAccountNo,
      BankReferenceNo: record.BankReferenceNo,
      TypeOfPayment: record.TypeOfPayment,
      InsurerBankIFSC: record.InsurerBankIFSC,
      InsurerBankAccNo: record.InsurerBankAccNo,
      AddressID: parseInt(record.AddressID),
      Status: "RJ",
      //MakerUserID: parseInt(record.MakerUserID),
      CheckerUserID: id,
      Reason: record.Reason,
      // ReconciledDate: moment(record.ReconciledDate).format("YYYYMMDD").toString(),
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
export const getBusinessDateApi = (companyId: number, userId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/02/${userId}`,
    {
      withCredentials: true,
    }
  );
};
