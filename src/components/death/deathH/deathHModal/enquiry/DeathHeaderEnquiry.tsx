import EnquiryTable from "./EnquiryTable";

const DeathHeaderEnquiry = ({ deathHenquiry, state }: any) => {
    const columns = [
        { field: "ID", header: "ID", dbField: "id" },
        {
          field: "EffectiveDate",
          header: "Effective Date",
          dbField: "effective_date",
          type: "date",
        },

        {
          field: "DeathDate",
          header: "Death Date",
          dbField: "death_date",
          type: "date"
        },
    
        {
          field: "Cause",
          header: "Cause",
          dbField: "cause",
        },
    
        {
          field: "Status",
          header: "Status",
          dbField: "status",
        },

        {
          field: "BillDate",
          header: "Bill Date",
          dbField: "bill_date",
          type: "date"
        },

        {
          field: "PaidToDate",
          header: "Paid To Date",
          dbField: "paid_to_date",
          type: "date"
        },

        {
          field: "DeathProof",
          header: "Death Proof",
          dbField: "death_proof",
        },
        
        {
          field: "Product",
          header: "Product",
          dbField: "product",
        },
        
        {
          field: "AplAmount",
          header: "Applicabe Amount",
          dbField: "apl_amount",
        },
         
        {
            field: "LoanAmount",
            header: "Loan Amount",
            dbField: "loan_amount",
        },
         
        {
            field: "PolicyDepost",
            header: "Policy Deposit",
            dbField: "policy_depost",
        },
         
        {
            field: "CashDeposit",
            header: "Cash Deposit",
            dbField: "cash_deposit",
        },
         
        {
            field: "RefundPrem",
            header: "Refund Premium",
            dbField: "refund_prem",
        },
         
        {
            field: "PremTolerance",
            header: "Premium Tolerance",
            dbField: "prem_tolerance",
        }, 
         
        {
            field: "TotalDeathPayable",
            header: "Total Death Payable",
            dbField: "total_death_payable",
        }, 
        
        {
            field: "AdjustedAmount",
            header: "Adjusted Amount",
            dbField: "adjusted_amount",
        },
      ];
  return (
    <div>
        <form>
        <EnquiryTable data={deathHenquiry} columns={columns} />
      </form>
    </div>
  )
}

export default DeathHeaderEnquiry