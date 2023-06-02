import {useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {  TextField } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomTranReversalModal from "./CustomTranReversalModal";

import Notification from "../../../utilities/Notification/Notification";

function TranReversalModal({
  open,
  handleClose,
  policyId

}: any) {
  const size: string = "xl";
  const title: string = "Transaction Reversal";
  const [tranno, settranno] = useState<any>(0);
  const [remarks, setremarks] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  
  const doTranReversal = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/nbservices/policyReverseTransaction`,
        {
          PolicyID: policyId,
          Tranno: parseInt(tranno),
          Remark : remarks
          
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
          handleClose();
          setNotify({
            isOpen: true,
            message: resp.data?.Success,
            type: "success",
          });
         
        
      })
      .catch((err) => {
        console.log(err.message);
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

 
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  return (
    <div>
      <CustomTranReversalModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doTranReversal}
        size={size}
        title={title}
      >
        <Grid2 container spacing={2}>
          <Grid2 lg={3}>
            <TextField
              id="PolicyID"
              name="PolicyID"
              value={policyId}
              placeholder="PolicyID"
              label="PolicyID"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              type="number"
              id="Tranno"
              name="Tranno"
              value={tranno}
              onChange={(e) => settranno(e.target.value)}
              placeholder="Transaction Number"
              InputLabelProps={{ shrink: true }}
              label="Transaction Number"
              fullWidth
              margin="dense"
            />
          </Grid2>

          <Grid2 lg={3}>
            <TextField
              id="Remarks"
              name="Remarks"
              value={remarks}
              onChange={(e) => setremarks(e.target.value)}
              placeholder="Reversal Remarks"
              label="Reversal Remarks"
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
        </Grid2>
      </CustomTranReversalModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default TranReversalModal;
