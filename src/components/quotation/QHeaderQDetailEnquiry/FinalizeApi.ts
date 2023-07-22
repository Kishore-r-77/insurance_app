import axios from "axios";
import moment from "moment";
import { PolicyStateType } from "../../../reducerUtilities/types/policy/policyTypes";
import { ReceiptsStateType } from "../../../reducerUtilities/types/receipts/receiptsTypes";

export const createPoliciesWithBenefits = (
  state: PolicyStateType,
  companyId: number,
  data: any,
  policyData: any
) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policycreatewithbenefit`,
    {
      CompanyID: companyId,
      ClientID: parseInt(policyData.ClientID),
      AddressID: parseInt(policyData.AddressID),
      AgencyID: parseInt(policyData.AgencyID),
      PRCD:
        policyData.PRCD?.length === 0
          ? ""
          : moment(policyData.PRCD).format("YYYYMMDD").toString(),
      PProduct: policyData.PProduct,
      PFreq: policyData.PFreq,
      PContractCurr: policyData.PContractCurr,
      PBillCurr: policyData.PBillCurr,
      POffice: policyData.Office,
      PolStatus: policyData.PolStatus,
      PReceivedDate:
        policyData.PReceivedDate?.length === 0
          ? ""
          : moment(policyData.PReceivedDate).format("YYYYMMDD").toString(),
      PUWDate:
        policyData.PUWDate?.length === 0
          ? ""
          : moment(policyData.PUWDate).format("YYYYMMDD").toString(),
      BtDate:
        policyData.BTDate?.length === 0
          ? ""
          : moment(policyData.BTDate).format("YYYYMMDD").toString(),
      PaidToDate:
        policyData.PaidToDate?.length === 0
          ? ""
          : moment(policyData.PaidToDate).format("YYYYMMDD").toString(),
      NxtBtDate:
        policyData.NxtBTDate?.length === 0
          ? ""
          : moment(policyData.NxtBTDate).format("YYYYMMDD").toString(),
      AnnivDate:
        policyData.AnnivDate?.length === 0
          ? ""
          : moment(policyData.AnnivDate).format("YYYYMMDD").toString(),
      InstalmentPrem: parseInt(policyData.InstalmentPrem),
      Benefits: data.map((benefit: any) => ({
        ...benefit,
        ClientID: parseInt(benefit?.ClientID),
        BStartDate: moment(benefit?.BStartDate).format("YYYYMMDD"),
        BTerm: parseInt(benefit?.BTerm),
        BPTerm: parseInt(benefit?.BPTerm),
        BSumAssured: parseInt(benefit?.BSumAssured),
        Interest: parseInt(benefit?.Interest),
      })),
    },

    {
      withCredentials: true,
    }
  );
};
