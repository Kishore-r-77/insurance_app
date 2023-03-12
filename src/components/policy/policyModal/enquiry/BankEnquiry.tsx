import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CustomTable from "../../../../utilities/Table/CustomTable";
import EnquiryTable from "./EnquiryTable";

function BankEnquiry({ bankData, state }: any) {
  const columns = [
    {
      field: "BankCode",
      header: "Bank Code",
      dbField: "bank_code",
    },
    {
      field: "BankAccountNo",
      header: "Bank Account No",
      dbField: "bank_account_no",
    },
    {
      field: "BankType",
      header: "Bank Type",
      dbField: "bank_type",
    },

    {
      field: "Status",
      header: "Bank Account Status",
      dbField: "bank_account_status",
    },
    {
      field: "TranNo",
      header: "Tran No",
      dbField: "tranno",
    },

    {
      field: "StartDate",
      header: "Start Date",
      dbField: "start_date",
      type: "date",
    },

    {
      field: "EndDate",
      header: "End Date",
      dbField: "end_date",
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

        <EnquiryTable data={bankData} columns={columns} />
      </form>
    </div>
  );
}

export default BankEnquiry;
