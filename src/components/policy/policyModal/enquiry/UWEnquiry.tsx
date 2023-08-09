import EnquiryTable from "./EnquiryTable";

const UWEnquiry = ({ uwData, state }: any) => {
  const columns = [
    {
      field: "AClientID",
      header: "Client ID",
      dbField: "client_id",
    },
    {
      field: "PolicyID",
      header: "Policy ID",
      dbField: "policy_id",
    },

    {
      field: "Age At RCD",
      header: "Age At RCD",
      dbField: "b_age",
    },

    {
      field: "Benefits",
      header: "Benefits",
      dbField: "b_coverage",
    },

    {
      field: "ExtraPremium",
      header: "Extra Premium",
      dbField: "b_load_prem",
    },

    {
      field: "PremCessDate",
      header: "Premium Cessation Date",
      dbField: "b_prem_cess_date",
      type: "date",
    },

    {
      field: "Premium",
      header: "Premium",
      dbField: "b_bas_annual_prem",
    },

    {
      field: "RiskCessDate",
      header: "Risk Cessation Date",
      dbField: "b_risk_cess_date",
      type: "date",
    },

    {
      field: "StardDate",
      header: "Start Date",
      dbField: "b_start_date",
      type: "date",
    },

    {
      field: "Status",
      header: "Status",
      dbField: "b_status",
    },

    {
      field: "SumAssured",
      header: "Sum Assured",
      dbField: "b_sum_assured",
    },

    {
      field: "UWSumAssured",
      header: "Under Written Sum Assured",
      dbField: "uwsa",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={uwData} columns={columns} />
      </form>
    </div>
  );
};

export default UWEnquiry;
