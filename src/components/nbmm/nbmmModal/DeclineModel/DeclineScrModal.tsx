import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/app/hooks";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import { addApi } from "../../nbmmApis/declineScrApis";

var initialValues = {
  ReasonDescription: "",
  RequestedDate: "",
};

function DeclineScrModal({ open, handleClose, policyId, getData }: any) {
  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [DeclineData, setDeclineData] = useState(initialValues);
  const onChange = (e: any) => {
    const { value, name } = e.target;
    setDeclineData({ ...DeclineData, [name]: value });
  };

  const onChangeReqDate = (date: any) => {
    setDeclineData({ ...DeclineData, RequestedDate: date });
  };

  const handleFormSubmit = () => {
    return addApi(DeclineData, companyId, policyId).then((resp) => {
      handleClose();
      getData();
    });
  };

  useEffect(() => {
    getCompanyData(companyId);
    return () => {};
  }, []);

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{"Decline"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  InputProps={{ readOnly: true }}
                  id="policyId"
                  name="policyId"
                  value={policyId}
                  placeholder="Policy Id"
                  label="Policy Id"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  margin="dense"
                />
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Effective Date"
                      inputFormat="DD/MM/YYYY"
                      value={DeclineData.RequestedDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) => onChangeReqDate(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={12}>
                <TextField
                  multiline
                  id="ReasonDescription"
                  name="ReasonDescription"
                  value={DeclineData.ReasonDescription}
                  placeholder="Reason Description"
                  label="Reseon Description"
                  fullWidth
                  margin="dense"
                  onChange={(e) => onChange(e)}
                />
              </Grid2>
            </Grid2>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeclineScrModal;
