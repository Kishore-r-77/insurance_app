import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CustomTable from "../../../../utilities/Table/CustomTable";
import EnquiryTable from "./EnquiryTable";

function ExtraEnquiry({ data, state }: any) {
  const columns = [
    {
      field: "PolicyID",
      header: "Policy ID",
      dbField: "policy_id",
    },
    {
      field: "EReason",
      header: "EReason",
      dbField: "e_reason",
    },
    {
      field: "EMethod",
      header: "EMethod",
      dbField: "e_method",
    },

    {
      field: "EPrem",
      header: "EPrem",
      dbField: "e_prem",
    },
    {
      field: "EPercentage",
      header: "EPercentage",
      dbField: "e_percentage",
    },

    {
      field: "EAmt",
      header: "EAmt",
      dbField: "e_amt",
    },

    {
      field: "ETerm",
      header: "ETerm",
      dbField: "e_term",
    },
    {
      field: "EAge",
      header: "EAge",
      dbField: "e_age",
    },
    {
      field: "BenefitID",
      header: "Benefit ID",
      dbField: "benefit_id",
    },
    {
      field: "BCoverage",
      header: "BCoverage",
      dbField: "b_coverage",
    },

    {
      field: "FromDate",
      header: "From Date",
      dbField: "from_date",
      type: "date",
    },

    {
      field: "ToDate",
      header: "To Date",
      dbField: "to_date",
      type: "date",
    },
  ];
  return (
    <div>
      <form>
        {/* {bankData.map((val: any) => (
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                id="ClientShortName"
                name="ClientShortName"
                value={val?.ClientShortName}
                placeholder="Client Short Name"
                label="Client Short Name"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                id="ClientLongName"
                name="ClientLongName"
                value={val?.ClientLongName}
                placeholder="Client Long Name"
                label="Client Long Name"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
          </Grid2>
        ))} */}

        <EnquiryTable data={data} columns={columns} />
      </form>
    </div>
  );
}

export default ExtraEnquiry;
