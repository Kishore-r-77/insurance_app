import EnquiryTable from "./EnquiryTable";

const HistoryEnquiry = ({ historyData, state }: any) => {
    const columns = [
        {
            field: "CompanyID",
            header: "Company ID",
            dbField: "company_id",
        },
         
        {
            field: "CurrentDate",
            header: "Current Date",
            dbField: "current_date",
            type: "date"
        },
         
        {
            field: "EffectiveDate",
            header: "Effective Date",
            dbField: "effective_date",
            type: "date"
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
  return (
    <div>
        <form>
        <EnquiryTable data={historyData} columns={columns} />
      </form>
    </div>
  )
}

export default HistoryEnquiry