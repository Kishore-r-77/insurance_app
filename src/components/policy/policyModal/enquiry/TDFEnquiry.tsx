import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CustomTable from "../../../../utilities/Table/CustomTable";
import EnquiryTable from "./EnquiryTable";

function TDFEnquiry({ data, state }: any) {
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
        {/* {data.map((val: any) => (
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

export default TDFEnquiry;
