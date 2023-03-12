import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CustomTable from "../../../../utilities/Table/CustomTable";
import EnquiryTable from "./EnquiryTable";

function BALEnquiry({ data, state }: any) {
  const columns = [
    {
      field: "CompanyID",
      header: "Company ID",
      dbField: "company_id",
    },
    {
      field: "Tranno",
      header: "Tran No",
      dbField: "tranno",
    },
    {
      field: "GlRdocno",
      header: "GL Record No",
      dbField: "gl_rdocno",
    },
    {
      field: "GlRldgAcct",
      header: "GL RLD Acct",
      dbField: "gl_rldg_acct",
    },
    {
      field: "GlAccountno",
      header: "GL Account No",
      dbField: "gl_accountno",
    },
    {
      field: "ContractCurry",
      header: "Contract Currency",
      dbField: "contract_curry",
    },
    {
      field: "ContractAmount",
      header: "Contract Amount",
      dbField: "contract_amount",
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

export default BALEnquiry;