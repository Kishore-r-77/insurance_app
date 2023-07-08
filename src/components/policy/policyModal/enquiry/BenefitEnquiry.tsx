import { useState } from "react";
import EnquiryTable from "./EnquiryTable";

const BenefitEnquiry = ({ 
  benefitenquiryData, 
  policyNo,
  TransactionNo,
  state }: any) => {
  const columns = [
    { field: "ID", header: "Benefit ID", dbField: "id" },

    {
      field: "BCoverage",
      header: "Coverage",
      dbField: "b_coverage",
    },
    {
      field: "BStartDate",
      header: "Start Date",
      dbField: "b_start_date",
      type: "date",
    },

    {
      field: "BRiskCessDate",
      header: "Risk Cessation Date",
      dbField: "b_risk_cess_date",
      type: "date",
    },

    {
      field: "BPremCessDate",
      header: "Premium Cessation Date",
      dbField: "b_prem_cess_date",
      type: "date",
    },

    {
      field: "BTerm",
      header: "Term",
      dbField: "b_term",
    },

    {
      field: "BPTerm",
      header: "Premiun Term",
      dbField: "bp_term",
    },

    {
      field: "BRiskCessAge",
      header: "Risk Cessation Age",
      dbField: "b_risk_cess_age",
    },

    {
      field: "BPremCessAge",
      header: "Premium Cessation Age",
      dbField: "b_prem_cess_age",
    },

    {
      field: "BBasAnnualPrem",
      header: "Basic Annual Premium",
      dbField: "b_bas_annual_prem",
    },

    {
      field: "BLoadPrem",
      header: "Loaded Premium",
      dbField: "b_load_prem",
    },

    {
      field: "BSumAssured",
      header: "Sum Assured",
      dbField: "b_sum_assured",
    },

    {
      field: "BPrem",
      header: "Premium",
      dbField: "b_prem",
    },

    {
      field: "BGender",
      header: "Gender",
      dbField: "b_gender",
    },

    {
      field: "BDOB",
      header: "DOB",
      dbField: "bdob",
      type: "date",
    },

    {
      field: "BMortality",
      header: " Mortality",
      dbField: "b_mortality",
    },

    {
      field: "BStatus",
      header: "Status",
      dbField: "b_status",
    },

    {
      field: "BAge",
      header: "LA - Age at entry",
      dbField: "b_age",
    },

    {
      field: "BRerate",
      header: "ReRated",
      dbField: "b_rerate",
      type: "date",
    },
  ];

  const [MrtaOpen, setMrtaOpen] = useState(true);

  return (
    <div>
      <form>
        <EnquiryTable 
        data={benefitenquiryData} 
        columns={columns} 
        mrtaOpen={MrtaOpen}
        policyNo={policyNo}/>
      </form>
    </div>
  );
};

export default BenefitEnquiry;
