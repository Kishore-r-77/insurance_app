import EnquiryTable from "./EnquiryTable";

const DeathDEnquiry = ({ deathDenquiry, state }: any) => {
    const columns = [
        { field: "ID", header: "ID", dbField: "id" },
        {
          field: "BenefitID",
          header: "Benefit ID",
          dbField: "benefit_id",
        },
    
        {
          field: "BCoverage",
          header: "Benefit Coverage",
          dbField: "b_coverage",
        },

        {
          field: "BSumAssured",
          header: "Benefit Sum Assured",
          dbField: "b_sum_assured",
        },
        
        {
          field: "DeathAmount",
          header: "Death Amount",
          dbField: "death_amount",
        },
        
        {
          field: "RevBonus",
          header: "Revisionary Bonus",
          dbField: "rev_bonus",
        },
         
        {
            field: "AddlBonus",
            header: "Additional Bonus",
            dbField: "addl_bonus",
        },
         
        {
            field: "TerminalBonus",
            header: "Terminal Bonus",
            dbField: "terminal_bonus",
        },
         
        {
            field: "InterimBonus",
            header: "Interim Bonus",
            dbField: "interim_bonus",
        },
         
        {
            field: "LoyaltyBonus",
            header: "LoyaltyBonus",
            dbField: "loyalty_bonus",
        },
         
        {
            field: "OtherAmount",
            header: "Other Amount",
            dbField: "other_amount",
        }, 
         
        {
            field: "AccumDividend",
            header: "Accumalated Dividend",
            dbField: "accum_dividend",
        }, 
        
        {
            field: "AccumDivInt",
            header: "Accumalated Dividend Interest",
            dbField: "accum_div_int",
        },
        
        {
            field: "TotalFundValue",
            header: "Total Fund Value",
            dbField: "total_fund_value",
        },
         
        {
            field: "TotalDeathAmount",
            header: "Total Death Amount",
            dbField: "total_death_amount",
        }, 
      ];
  return (
    <div>
        <form>
        <EnquiryTable data={deathDenquiry} columns={columns} />
      </form>
    </div>
  )
}

export default DeathDEnquiry