import EnquiryTable from "./EnquiryTable";

function TDFEnquiry({ data }: any) {
  const columns = [
    { field: "ID", header: "TDF ID", dbField: "id" },
    {
      field: "PolicyID",
      header: "Policy Id",
      dbField: "policy_id",
    },
    {
      field: "Tranno",
      header: "Tran No",
      dbField: "tran_no",
    },
    {
      field: "TDFType",
      header: "TDF Type",
      dbField: "tdf_type",
    },
    {
      field: "TDFDescription",
      header: "TDF Description",
      dbField: "tdf_description",
    },
    {
      field: "Seqno",
      header: "Seq No",
      dbField: "seqno",
    },
    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={data} columns={columns} />
      </form>
    </div>
  );
}

export default TDFEnquiry;
