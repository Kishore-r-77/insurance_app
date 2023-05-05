import { useState } from "react";
import EnquiryTable from "./EnquiryTable";

const HistoryEnquiry = ({ historyData, policyNo, state }: any) => {
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
      field: "CurrentDate",
      header: "Current Date",
      dbField: "current_date",
      type: "date",
    },

    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },

    {
      field: "LongDescription",
      header: "Long Description",
      dbField: "longdesc",
    },

    {
      field: "PHistoryCode",
      header: "History Code",
      dbField: "history_code",
    },

    {
      field: "ShortDescription",
      header: "Short Description",
      dbField: "shortdesc",
    },

    {
      field: "Tranno",
      header: "Transaction No",
      dbField: "tranno",
    },
  ];

  const [GLHistoryOpen, setGLHistoryOpen] = useState(true);

  return (
    <div>
      <form>
        <EnquiryTable
          data={historyData}
          columns={columns}
          historyOpen={GLHistoryOpen}
          policyNo={policyNo}
        />
      </form>
    </div>
  );
};

export default HistoryEnquiry;
