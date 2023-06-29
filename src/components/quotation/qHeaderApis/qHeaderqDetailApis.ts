import axios from "axios";
import moment from "moment";
import { QHeaderStateType } from "../../../reducerUtilities/types/quotation/qHeader/qHeaderTypes";
//Attention: Check the path below and change it if required
//import { QHeaderStateType } from "../../../../reducerUtilities/types/qHeader/qHeaderTypes";

//Attention: Check the API and the path below
export const createQHeaderWithQDetail = (
  state: QHeaderStateType,
  companyId: number,
  data: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qheaderandbenefitcreate`,
    {
      CompanyID: companyId,
      QuoteDate:
        state.QuoteDate?.length === 0
          ? ""
          : moment(state.QuoteDate).format("YYYYMMDD").toString(),
      QProduct: state.QProduct,
      QContractCurr: state.QContractCurr,
      ClientID: parseInt(state.ClientID),
      QFirstName: state.QFirstName,
      QLastName: state.QLastName,
      QDob: moment(state.QDob).format("YYYYMMDD"),
      QGender: state.QGender,
      QNri: state.QNri,
      QEmail: state.QEmail,
      QMobile: state.QMobile,
      AddressID: parseInt(state.AddressID),
      QOccGroup: state.QOccGroup,
      QOccSect: state.QOccSect,
      QOccupation: state.QOccupation,
      QAnnualIncome: parseInt(state.QAnnualIncome),
      AgencyID: parseInt(state.AgencyID),
      Qstatus: "QS",
      QDetails: data.map((qDetail: any) => ({
        ...qDetail,
        CompanyID: companyId,
        ClientID: parseInt(state.ClientID),
        QPremCessTerm: parseInt(qDetail?.QPremCessTerm),
        QRiskCessTerm: parseInt(qDetail?.QRiskCessTerm),
        QSumAssured: parseInt(qDetail?.QSumAssured),
        QAgeAdmitted: qDetail?.QAgeAdmitted,
        QRiskSeqNo: qDetail?.QRiskSeqNo,
      })),
    },
    {
      withCredentials: true,
    }
  );
};

export const editQHeaderAndQDeatail = (
  record: any,
  data: any,
  companyId: number
) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/quotationservices/qheaderandbenefitupdate`,
    {
      CompanyID: companyId,
      ID: parseInt(record.ID),
      Quotedate: moment(record.Quotedate).format("YYYYMMDD"),
      QProduct: record.QProduct,
      QContractCurr: record.QContractCurr,
      ClientID: parseInt(record.ClientID),
      Qfirstname: record.Qfirstname,
      Qlastname: record.Qlastname,
      Qdob: moment(record.Qdob).format("YYYYMMDD"),
      Qgender: record.Qgender,
      QNri: record.QNri,
      Qemail: record.Qemail,
      Qmobile: record.Qmobile,
      AddressID: parseInt(record.AddressID),
      QOccGroup: record.QOccGroup,
      QOccSect: record.QOccSect,
      QOccupation: record.QOccupation,
      QAnnualIncome: parseInt(record.QAnnualIncome),
      AgencyID: parseInt(record.AgencyID),
      Qstatus: "QS",
      QDetails: data.map((qDetail: any) => ({
        ...qDetail,
        CompanyID: parseInt(record.companyId),
        ID: parseInt(qDetail.ID),
        ClientID: parseInt(record.ClientID),
        QPremCessTerm: parseInt(qDetail?.QPremCessTerm),
        QRiskCessTerm: parseInt(qDetail?.QRiskCessTerm),
        QSumAssured: parseInt(qDetail?.QSumAssured),
        QAgeAdmitted: qDetail?.QAgeAdmitted,
      })),
    },
    {
      withCredentials: true,
    }
  );
};

//Attention: Check the API and the path below,if required
export const getQDetailByQHeader = (id: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/quotationservices/qdetailgetbyqheader/${id}`,
    {
      withCredentials: true,
    }
  );
};
