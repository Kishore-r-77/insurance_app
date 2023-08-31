import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";

function OwnerModal({ record, open, handleClose }: any) {
  const infoTitle: string = "Owner Info";
  const size: string = "xl";

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };
  useEffect(() => {
    getCompanyData(companyId);
    return () => {};
  }, []);
  return (
    <div>
      <CustomModal
        size={size}
        open={open}
        handleClose={handleClose}
        title={infoTitle}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="Company"
                label="Company"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientShortName"
                name="ClientShortName"
                value={record.ClientShortName}
                placeholder="Client Short Name"
                label="Client Short Name"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientLongName"
                name="ClientLongName"
                value={record.ClientLongName}
                placeholder="Client Long Name"
                label="Client Long Name"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientSurName"
                name="ClientSurName"
                value={record.ClientSurName}
                placeholder="Client Sur Name"
                label="Client Sur Name"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Gender"
                name="Gender"
                value={record.Gender}
                placeholder="Gender"
                label="Gender"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Salutation"
                name="Salutation"
                value={record.Salutation}
                placeholder="Salutation"
                label="Salutation"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="Language"
                name="Language"
                value={record.Language}
                placeholder="Language"
                label="Language"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientEmail"
                name="ClientEmail"
                value={record.ClientEmail}
                placeholder="ClientEmail"
                label="ClientEmail"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientMobile"
                name="ClientMobile"
                value={record.ClientMobile}
                placeholder="ClientMobile"
                label="ClientMobile"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">+91</InputAdornment>
                //   ),
                // }}

                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ClientStatus"
                name="ClientStatus"
                value={record.ClientStatus}
                placeholder="ClientStatus"
                label="ClientStatus"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="Client Dob"
                    inputFormat="DD/MM/YYYY"
                    value={record.ClientDob}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) => {}}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly
                    label="Client Dod"
                    inputFormat="DD/MM/YYYY"
                    value={record.ClientDod}
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) => {}}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>{" "}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default OwnerModal;
