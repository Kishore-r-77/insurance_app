import { useState } from "react";
import EnquiryTable from "./EnquiryTable";

const ILPSummaryEnquiry = ({ ilpSummaryData, policyNo, state }: any) => {
  const columns = [
    {
      field: "BenefitID",
      header: "Benefit ID",
      dbField: "benefit_id",
    },

    {
      field: "FundCode",
      header: "Fund Code",
      dbField: "fund_code",
    },

    {
      field: "FundType",
      header: "Fund Type",
      dbField: "fund_type",
    },

    {
      field: "FundUnits",
      header: "Fund Units",
      dbField: "fund_units",
    },
  ];

  const [ilpTranOpen, setilpTranOpen] = useState(true);

  return (
    <div>
      <form>
        <EnquiryTable
          data={ilpSummaryData}
          columns={columns}
          ilpTOpen={ilpTranOpen}
          policyNo={policyNo}
        />
      </form>
    </div>
  );
};

export default ILPSummaryEnquiry;
