import axios from "axios";
import moment from "moment";
import { PolicyStateType } from "../../../reducerUtilities/types/policy/policyTypes";

export const getAllApi = (
  pageNum: number,
  pageSize: number,
  state: PolicyStateType
) => {
  return axios.get(`http://localhost:3000/api/v1/nbservices/policies`, {
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

export const addApi = (state: PolicyStateType, companyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policycreate`,
    {
      CompanyID: companyId,
      PRCD: moment(state.PRCD).format("YYYYMMDD").toString(),
      PProduct: state.PProduct,
      PFreq: state.PFreq,
      PContractCurr: state.PContractCurr,
      PBillCurr: state.PBillCurr,
      POffice: state.POffice,
      PolStatus: state.PolStatus,

      PReceivedDate: moment(state.PReceivedDate).format("YYYYMMDD").toString(),
      //PUWDate: moment(state.PUWDate).format("YYYYMMDD").toString(),
      ClientID: parseInt(state.ClientID),
      AgencyID: parseInt(state.AgencyID),
      AddressID: parseInt(state.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const editApi = (record: any) => {
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/policyupdate`,

    {
      ID: parseInt(record.ID),
      CompanyID: parseInt(record.CompanyID),
      PRCD: moment(record.PRCD).format("YYYYMMDD").toString(),
      PProduct: record.PProduct,
      PFreq: record.PFreq,
      PContractCurr: record.PContractCurr,
      PBillCurr: record.PBillCurr,
      POffice: record.POffice,
      PolStatus: record.PolStatus,

      PReceivedDate: moment(record.PReceivedDate).format("YYYYMMDD").toString(),
      ClientID: parseInt(record.ClientID),
      AgencyID: parseInt(record.AgencyID),
      AddressID: parseInt(record.AddressID),
    },
    {
      withCredentials: true,
    }
  );
};

export const modifyPolicyWithBenefits = (
  state: any,
  companyId: number,
  data: any
) => {
  return axios.put(
    `http://localhost:3000/api/v1/nbservices/policymodifywithbenefit`,
    {
      ID: state.ID,
      CompanyID: companyId,
      ClientID: parseInt(state.ClientID),
      PayingAuthority: parseInt(state.PayingAuthority),
      AddressID: parseInt(state.AddressID),
      AgencyID: parseInt(state.AgencyID),
      PRCD:
        state.PRCD?.length === 0
          ? ""
          : moment(state.PRCD).format("YYYYMMDD").toString(),
      ProposalDate:
        state.ProposalDate?.length === 0
          ? ""
          : moment(state.ProposalDate).format("YYYYMMDD").toString(),
      PProduct: state.PProduct,
      PFreq: state.PFreq,
      PContractCurr: state.PContractCurr,
      PBillCurr: state.PBillCurr,
      POffice: state.POffice,
      PolStatus: state.PolStatus,
      BankID: state.BankID,
      BillingType: state.BillingType,
      PReceivedDate:
        state.PReceivedDate?.length === 0
          ? ""
          : moment(state.PReceivedDate).format("YYYYMMDD").toString(),
      PUWDate:
        state.PUWDate?.length === 0
          ? ""
          : moment(state.PUWDate).format("YYYYMMDD").toString(),
      BtDate:
        state.BTDate?.length === 0
          ? ""
          : moment(state.BTDate).format("YYYYMMDD").toString(),
      PaidToDate:
        state.PaidToDate?.length === 0
          ? ""
          : moment(state.PaidToDate).format("YYYYMMDD").toString(),
      NxtBtDate:
        state.NxtBTDate?.length === 0
          ? ""
          : moment(state.NxtBTDate).format("YYYYMMDD").toString(),
      AnnivDate:
        state.AnnivDate?.length === 0
          ? ""
          : moment(state.AnnivDate).format("YYYYMMDD").toString(),
      InstalmentPrem: parseInt(state.InstalmentPrem),
      VersionId: state.versionId,
      Benefits: data.map((benefits: any) => ({
        ...benefits,
        ID: parseInt(benefits.ID),
        ClientID: parseInt(benefits.ClientID),
        BStartDate: moment(benefits?.AddressEndDate).format("YYYYMMDD"),
        BTerm: parseInt(benefits?.BTerm),
        BPTerm: parseInt(benefits?.BPTerm),
        BSumAssured: parseInt(benefits?.BSumAssured),
        Interest: parseFloat(benefits?.Interest),
        BPrem: parseFloat(benefits?.BPrem),
        ...(state.PProduct === "ILP"
          ? {
              IlpFunds: benefits?.IlpFunds?.map(
                (funds: any, index: number) => ({
                  ...funds,
                  FundPercentage: +funds.FundPercentage,
                })
              ),
            }
          : null),
        Extras: benefits?.Extras?.map((extra: any, index: number) => ({
          ...extra,
          ID: +extra.ID,
          ToDate: moment(extra.ToDate).format("YYYYMMDD").toString(),
          EPrem: +extra.EPrem,
          EPercentage: +extra.EPercentage,
          EAmt: +extra.EAmt,
          ETerm: +extra.ETerm,
          EAge: +extra.EAge,
          EMillie: +extra.EMillie,
        })),
      })),
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteApi = (id: number) => {
  return axios.delete(
    `http://localhost:3000/api/v1/nbservices/policydelete/${id}`,
    {
      withCredentials: true,
    }
  );
};

//paramItems

export const q0005 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "Q0005",
      languageId,
    },
  });
};
export const frequency = (companyId: number, languageId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata?name=Q0005&date=20220101&item=END&company_id=1&function=Freq`,
    {
      withCredentials: true,
    }
  );
};
export const p0023 = (
  companyId: number,
  languageId: number,
  currency: string
) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/paramextradata?name=Q0005&date=20220101&item=END&company_id=1&function=${currency}`,
    {
      withCredentials: true,
      params: {
        companyId,
        name: "P0023",
        languageId,
      },
    }
  );
};
export const p0018 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0018",
      languageId,
    },
  });
};
export const p0024 = (companyId: number, languageId: number) => {
  return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
    withCredentials: true,
    params: {
      companyId,
      name: "P0024",
      languageId,
    },
  });
};
// export const getNopmieesByPolicy = (policiesId: number) => {
//   return axios.get(
//     `http://localhost:3000/api/v1/deathservices/nomineesbypol/${policiesId}`,
//     {
//       withCredentials: true,
//     }
//   );
// };
export const getBusinessDateApi = (companyId: number, userId: number) => {
  return axios.get(
    `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/01/${userId}`,
    {
      withCredentials: true,
    }
  );
};
export const clonePolicyApi = (policyId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/policyclonewithbenefit/${policyId}`,
    {},
    {
      withCredentials: true,
    }
  );
};
