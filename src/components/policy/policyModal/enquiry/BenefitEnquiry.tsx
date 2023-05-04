import EnquiryTable from "./EnquiryTable";

const BenefitEnquiry = ({ benefitenquiryData, state }: any) => {
  const columns = [
    { field: "ID", header: "ID", dbField: "id" },
    {
      field: "BStartDate",
      header: "Benefit Start Date",
      dbField: "b_start_date",
      type: "date",
    },

    {
      field: "BRiskCessDate",
      header: "Benefit Risk Cessation Date",
      dbField: "b_risk_cess_date",
      type: "date",
    },

    {
      field: "BPremCessDate",
      header: "Benefit Premium Cessation Date",
      dbField: "b_prem_cess_date",
      type: "date",
    },

    {
      field: "BTerm",
      header: "Benefit Term",
      dbField: "b_term",
    },

    {
      field: "BPTerm",
      header: "Benefit Premiun Term",
      dbField: "bp_term",
    },

    {
      field: "BRiskCessAge",
      header: "Benefit Risk Cessation Age",
      dbField: "b_risk_cess_age",
    },

    {
      field: "BPremCessAge",
      header: "Benefit Premium Cessation Age",
      dbField: "b_prem_cess_age",
    },

    {
      field: "BBasAnnualPrem",
      header: "Benefit Basic Annual Premium",
      dbField: "b_bas_annual_prem",
    },

    {
      field: "BLoadPrem",
      header: "Benefit Loaded Premium",
      dbField: "b_load_prem",
    },

    {
      field: "BCoverage",
      header: "Benefit Coverage",
      dbField: "b_coverage",
    },

    {
      field: "BSumAssured",
      header: "Benefit Sum Assured",
      dbField: "b_sum_assured",
    },

    {
      field: "BPrem",
      header: "Benefit Premium",
      dbField: "b_prem",
    },

    {
      field: "BGender",
      header: "Beneficiary Gender",
      dbField: "b_gender",
    },

    {
      field: "BDOB",
      header: "Beneficiary DOB",
      dbField: "bdob",
      type: "date",
    },

    {
      field: "BMortality",
      header: "Benefit Mortality",
      dbField: "b_mortality",
    },

    {
      field: "BStatus",
      header: "Benefit Status",
      dbField: "b_status",
    },

    {
      field: "BAge",
      header: "Beneficiary Age",
      dbField: "b_age",
    },

    {
      field: "BRerate",
      header: "Benefit ReRated",
      dbField: "b_rerate",
      type: "date",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={benefitenquiryData} columns={columns} />
      </form>
    </div>
  );
};

export default BenefitEnquiry;
