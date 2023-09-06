import { useState } from "react";
import EnquiryTable from "./EnquiryTable";

const ILPSummaryEnquiry = ({ ilpSummaryData, policyNo, state }: any) => {
  const columns = [
    {
      field: "PolicyID",
      header: "Policy ID",
      dbField: "policy_id",
    },

    {
      field: "CompanyID",
      header: "Company ID",
      dbField: "company_id",
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

  return (
    <div>
      <form>
        <EnquiryTable
          data={ilpSummaryData}
          columns={columns}
          policyNo={policyNo}
        />
      </form>
    </div>
  );
};

export default ILPSummaryEnquiry;
