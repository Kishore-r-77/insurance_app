import EnquiryTable from "./EnquiryTable";

const SurvivalBenefitEnquiry = ({ survivalbenefitenquiryData, state }: any) => {
  const columns = [
    { field: "ID", header: "SB ID", dbField: "id" },
    {
      field: "Tranno",
      header: "Transaction No.",
      dbField: "tranno",
      type: "date",
    },

    {
      field: "CompanyID",
      header: "COmpany ID",
      dbField: "company_id",
    },

    {
      field: "BenefitID",
      header: "Benefit ID",
      dbField: "benefit_id",
    },

    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },

    {
      field: "PaidDate",
      header: "Paid Date",
      dbField: "paid_date",
      type: "date",
    },

    {
      field: "Amount",
      header: "Amount",
      dbField: "amount",
    },

    {
      field: "SBPercentage",
      header: "Survival Benefit Percentage",
      dbField: "sb_percentage",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={survivalbenefitenquiryData} columns={columns} />
      </form>
    </div>
  );
};

export default SurvivalBenefitEnquiry;
