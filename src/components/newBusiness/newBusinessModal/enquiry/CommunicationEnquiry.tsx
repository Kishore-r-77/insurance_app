import EnquiryTable from "./EnquiryTable";

const CommunicationEnquiry = ({ communicationData, state }: any) => {
  const columns = [
    { field: "ID", header: "ID", dbField: "id" },

    {
      field: "TemplateName",
      header: "Template Name",
      dbField: "template_name",
    },

    {
      field: "Language",
      header: "Language",
      dbField: "language",
    },

    {
      field: "Seqno",
      header: "Sequence No.",
      dbField: "seqno",
    },

    {
      field: "EffectiveDate",
      header: "Effective Date",
      dbField: "effective_date",
      type: "date",
    },

    {
      field: "ExtractedDate",
      header: "Extracted Date",
      dbField: "extracted_date",
      type: "date",
    },

    {
      field: "ExtractedStaus",
      header: "Extracted Staus",
      dbField: "extracted_status",
    },

    // {
    //   field: "ExtractedData",
    //   header: "Extracted Data",
    //   dbField: "extracted_data",
    // },

    {
      field: "SMSAllowed",
      header: "SMS Allowed",
      dbField: "sms_allowed",
    },

    {
      field: "EmailAllowed",
      header: "Email Allowed",
      dbField: "email_allowed",
    },

    {
      field: "WhatsAppAllowed",
      header: "WhatsApp Allowed",
      dbField: "whats_app_allowed",
    },

    {
      field: "AgentSMSAllowed",
      header: "Agent SMS Allowed",
      dbField: "agent_sms_allowed",
    },

    {
      field: "AgentEmailAllowed",
      header: "Agent Email Allowed",
      dbField: "agent_email_allowed",
    },

    {
      field: "AgentWhatsAppAllowed",
      header: "Agent WhatsApp Allowed",
      dbField: "agent_whats_app_allowed",
    },

    {
      field: "CompanyEmail",
      header: "Company Email",
      dbField: "company_email",
    },

    {
      field: "CompanyPhone",
      header: "Company Phone",
      dbField: "company_phone",
    },

    {
      field: "DepartmentName",
      header: "Department Name",
      dbField: "department_name",
    },

    {
      field: "DepartmentHead",
      header: "Department Head",
      dbField: "department_head",
    },
  ];
  return (
    <div>
      <form>
        <EnquiryTable data={communicationData} columns={columns} />
      </form>
    </div>
  );
};

export default CommunicationEnquiry;
