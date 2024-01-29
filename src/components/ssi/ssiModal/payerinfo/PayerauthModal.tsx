import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";

import CustomModal from "../../../../utilities/modal/CustomModal";
import axios from "axios";
import moment from "moment";

function PayerauthModal({ open, handleClose, record }: any) {
  const infoTitle: string = "Paying Authority Info";
  const size: string = "xl";

  const [payerauth, setpayerauth] = useState<any>([0]);
  const getpayerauth = () => {
    return axios
      .get(
        `http://localhost:3000/api/v1/nbservices/paget/${record.PayingAuthorityID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpayerauth(resp.data?.PayingAuthority);
      });
  };

  useEffect(() => {
    getpayerauth();

    return () => {};
  }, [open]);

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
                value={payerauth?.CompanyID}
                placeholder="Company"
                label="Company"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="ClientID"
                name="ClientID"
                value={payerauth?.ClientID}
                placeholder="Client Id"
                label="Client Id"
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaName"
                name="PaName"
                value={payerauth?.PaName}
                placeholder="PaName"
                label="PaName"
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaType"
                name="PaType"
                value={payerauth?.PaType}
                placeholder="PaType"
                label="PaType"
                fullWidth
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaStatus"
                name="PaStatus"
                value={payerauth?.PaStatus}
                placeholder="PaStatus"
                label="PaStatus"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ExtrationDay"
                name="ExtrationDay"
                value={payerauth?.ExtrationDay}
                placeholder="ExtrationDay"
                label="ExtrationDay"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="StartDate"
                name="StartDate"
                value={
                  payerauth.StartDate === ""
                    ? ""
                    : moment(payerauth.StartDate).format("DD/MM/YYYY")
                }
                placeholder="StartDate"
                label="StartDate"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="EndDate"
                name="EndDate"
                value={
                  payerauth.EndDate === ""
                    ? ""
                    : moment(payerauth.EndDate).format("DD/MM/YYYY")
                }
                placeholder="EndDate"
                label="EndDate"
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PayDay"
                name="PayDay"
                value={payerauth?.PayDay}
                placeholder="PayDay"
                label="PayDay"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaToleranceAmt"
                name="PaToleranceAmt"
                value={payerauth?.PaToleranceAmt}
                placeholder="PaToleranceAmt"
                label="PaToleranceAmt"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaCurrency"
                name="PaCurrency"
                value={payerauth?.PaCurrency}
                placeholder="PaCurrency"
                label="PaCurrency"
                fullWidth
                margin="dense"
              ></TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="AddressID"
                name="AddressID"
                value={payerauth?.AddressID}
                placeholder="AddressID"
                label="AddressID"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaPerson"
                name="PaPerson"
                value={payerauth?.PaPerson}
                placeholder="PaPerson"
                label="PaPerson"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaMobCode"
                name="PaMobCode"
                value={payerauth?.PaMobCode}
                placeholder="PaMobCode"
                label="PaMobCode"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaMobMobile"
                name="PaMobMobile"
                value={payerauth?.PaMobMobile}
                placeholder="PaMobMobile"
                label="PaMobMobile"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="PaEmail"
                name="PaEmail"
                value={payerauth?.PaEmail}
                placeholder="PaEmail"
                label="PaEmail"
                fullWidth
                // inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default PayerauthModal;
