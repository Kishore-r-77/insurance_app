import { FormControl, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react'
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

function BenefitInfo({open,handleClose,record}:any) {

    console.log(record,"*********** Ben Info Record **************")

    const [companyData, setCompanyData] = useState<any>({});
    const getCompanyData = (id: number) => {
      getApi(id).then((resp) => {
        setCompanyData(resp.data["Company"]);
      });
    };

    useEffect(() => {
        getCompanyData(record.CompanyID);
      }, [open]);
  return (
    <div>
    <Modal show={open} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Benefit Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <form>
       <Grid2 container spacing={2}>
            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="Company"
                label="Company"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="ID"
                name="ID"
                value={record.ID}
                placeholder="Benefit ID"
                label="Benefit ID"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BCoverage"
                name="BCoverage"
                value={record.BCoverage}
                placeholder="Coverage"
                label="Coverage"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BStartDate"
                name="BStartDate"
                value={moment(record.BStartDate).format("DD/MM/YYYY")}
                placeholder="Start Date"
                label="Start Date"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BRiskCessDate"
                name="BRiskCessDate"
                value={moment(record.BRiskCessDate).format("DD/MM/YYYY")}
                placeholder="Risk Cessation Date"
                label="Risk Cessation Date"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BPremCessDate"
                name="BPremCessDate"
                value={moment(record.BPremCessDate).format("DD/MM/YYYY")}
                placeholder="Prem Cessation Date"
                label="Prem Cessation Date"
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BTerm"
                name="BTerm"
                value={record.BTerm}
                placeholder="Term"
                label="Term"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BPTerm"
                name="BPTerm"
                value={record.BPTerm}
                placeholder="Premium Term"
                label="Premium Term"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BRiskCessAge"
                name="BRiskCessAge"
                value={record.BRiskCessAge}
                placeholder="Risk cessation Age"
                label="Risk cessation Age"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BPremCessAge"
                name="BPremCessAge"
                value={record.BPremCessAge}
                placeholder="Premium cessation Age"
                label="Premium cessation Age"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BBasAnnualPrem"
                name="BBasAnnualPrem"
                value={record.BBasAnnualPrem}
                placeholder="Basic Anual Premium"
                label="Basic Anual Premium"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BLoadPrem"
                name="BLoadPrem"
                value={record.BLoadPrem}
                placeholder="Loaded Premium"
                label="Loaded Premium"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BSumAssured"
                name="BSumAssured"
                value={record.BSumAssured}
                placeholder="Sum Assured"
                label="Sum Assured"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BPrem"
                name="BPrem"
                value={record.BPrem}
                placeholder="Premium"
                label="Premium"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BGender"
                name="BGender"
                value={record.BGender}
                placeholder="Gender"
                label="Gender"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BDOB"
                name="BDOB"
                value={moment(record.BDOB).format("DD/MM/YYYY")}
                placeholder="DOB"
                label="DOB"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BMortality"
                name="BMortality"
                value={record.BMortality}
                placeholder="Mortality"
                label="Mortality"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BStatus"
                name="BStatus"
                value={record.BStatus}
                placeholder="Status"
                label="Status"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BAge"
                name="BAge"
                value={record.BAge}
                placeholder="LA Age At Entry"
                label="LA Age At Entry"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="BRerate"
                name="BRerate"
                value={moment(record.BRerate).format("DD/MM/YYYY")}
                placeholder="ReRated"
                label="ReRated"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="IlpMortality"
                name="IlpMortality"
                value={record.IlpMortality}
                placeholder="Ilp Mortality"
                label="Ilp Mortality"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="IlpMortalityDate"
                name="IlpMortalityDate"
                value={record.IlpMortalityDate ? moment(record.IlpMortalityDate).format("DD/MM/YYYY"):"N/A"}
                placeholder="Ilp Mortality Date"
                label="Ilp Mortality Date"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="IlpFee"
                name="IlpFee"
                value={record.IlpFee}
                placeholder="IlpFee"
                label="IlpFee"
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={6} md={4} lg={3}>
              <TextField
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                id="IlpFeeDate"
                name="IlpFeeDate"
                value={record.IlpFeeDate ? moment(record.IlpFeeDate).format("DD/MM/YYYY"):"N/A"}
                placeholder="Ilp Fee Date"
                label="Ilp Fee Date"
                fullWidth
                margin="dense"
              />
            </Grid2>
            </Grid2>
       </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default BenefitInfo