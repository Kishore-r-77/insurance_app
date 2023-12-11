import EnquiryTable from "./EnquiryTable";

const NomineeEnquiry = ({ nomineeenquiryData, state }: any) => {
  const columns = [
    { field: "ID", header: "ID", dbField: "id" },
    {
      field: "ShortName",
      header: "Short Name",
      dbField: "short_name",
    },

    {
      field: "NomineeLongName",
      header: "Long Name",
      dbField: "nominee_long_name",
    },

    {
      field: "Gender",
      header: "Gender",
      dbField: "gender",
    },

    {
      field: "NomineeRelationship",
      header: "Nominee Relationship",
      dbField: "nominee_relationship",
    },

    {
      field: "NomineePercentage",
      header: "Nominee Percentage",
      dbField: "nominee_percentage",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={nomineeenquiryData} columns={columns} />
      </form>
    </div>
  );
};

export default NomineeEnquiry;
