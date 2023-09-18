import { useState } from "react";
import EnquiryTable from "./EnquiryTable";

const ILPSummaryEnquiry = ({ ilpSummaryData, policyNo, state }: any) => {
  console.log(ilpSummaryData, "Inside ilp summmary enquiry");
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
    {
      field: "FundPrice",
      header: "Fund Price",
    },
    {
      field: "opfundvalue",
      header: "Offer Price",
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
