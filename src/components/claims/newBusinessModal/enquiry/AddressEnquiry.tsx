import EnquiryTable from "./EnquiryTable";

const AddressEnquiry = ({ addressData, state }: any) => {
    const columns = [
        { field: "Address ID", header: "ID", dbField: "id" },

        {
          field: "AddressLine1",
          header: "Address Line 1",
          dbField: "address_line1",
        },

        {
          field: "AddressLine2",
          header: "Address Line 2",
          dbField: "address_line2",
        },
    
        {
          field: "AddressLine3",
          header: "Address Line 3",
          dbField: "address_line2",
        },
    
        {
          field: "AddressLine4",
          header: "Address Line 4",
          dbField: "address_line4",
        },

        {
          field: "AddressLine5",
          header: "Address Line 5",
          dbField: "address_line5",
        },
        
        {
          field: "AddressType",
          header: "Address Type",
          dbField: "address_type",
        },
        
        {
          field: "Client ID",
          header: "Client ID",
          dbField: "client_id",
        },
         
        {
            field: "Company ID",
            header: "Company ID",
            dbField: "company_id",
        },
         
        {
            field: "Country",
            header: "Country",
            dbField: "address_country",
        },
         
        {
            field: "StartDate",
            header: "Start Date",
            dbField: "address_start_date",
            type: "date"
        },
         
        {
            field: "EndDate",
            header: "End Date",
            dbField: "address_end_date",
            type: "date"
        },
         
        {
            field: "PostalCode",
            header: "Postal Code",
            dbField: "address_post_code",
        },
      ];
  return (
    <div>
        <form>
        <EnquiryTable data={addressData} columns={columns} />
      </form>
    </div>
  )
}

export default AddressEnquiry