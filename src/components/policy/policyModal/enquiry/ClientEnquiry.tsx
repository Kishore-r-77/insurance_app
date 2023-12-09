import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CustomTable from "../../../../utilities/Table/CustomTable";
import EnquiryTable from "./EnquiryTable";

function ClientEnquiry({ clientData, state }: any) {
  const columns = [
    {
      field: "Role",
      header: "Role",
    },
    { field: "Client ID", header: " Client ID", dbField: "id" },
    {
      field: "Salutation",
      header: "Salutation",
      dbField: "salutation",
    },
    {
      field: "ShortName",
      header: "Short Name",
      dbField: "client_short_name",
    },
    {
      field: "LastName",
      header: "Long Name",
      dbField: "client_long_name",
    },
    {
      field: "Gender",
      header: "Gender",
      dbField: "gender",
    },
    {
      field: "Language",
      header: "Language",
      dbField: "language",
    },

    {
      field: "DOB",
      header: "DOB",
      dbField: "client_dob",
      type: "date",
    },
    {
      field: "DOD",
      header: "DOD",
      dbField: "client_dod",
      type: "date",
    },
    {
      field: "Email",
      header: "Email",
      dbField: "client_email",
    },
    {
      field: "Mobile",
      header: "Mobile",
      dbField: "client_mobile",
    },
    
    
  ];
  return (
    <div>
      <form>
        {/* {clientData.map((val: any) => (
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

        <EnquiryTable data={clientData} columns={columns} />
      </form>
    </div>
  );
}

export default ClientEnquiry;
