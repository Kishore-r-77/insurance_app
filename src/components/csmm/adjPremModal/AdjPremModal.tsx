import {useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {  TextField } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomAdjPremModal from "./CustomAdjPremModal";

import Notification from "../../../utilities/Notification/Notification";
import moment from "moment";

function AdjPremModal({
  open,
  handleClose,
  data

}: any) {
  const size: string = "xl";
  const title: string = "Premium Adjustment";
  const [nextDate, setNextDate] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  
  const doPremAdj = () => {
    console.log(moment(data?.NxtBillDate).format("YYYYMMDD"))
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/premadj/${data?.PolicyId}`,
        {
          PolicyID: data?.PolicyId,
          NextDate: moment(data?.NxtBillDate).format("YYYYMMDD"),
          
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
          handleClose();
          setNotify({
            isOpen: true,
            message: resp.data?.success,
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
      <CustomAdjPremModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doPremAdj}
        size={size}
        title={title}
      >
        <Grid2 container spacing={2}>
        <Grid2 lg={3}>
            <TextField
              id="PolicyID"
              name="PolicyID"
              value={data?.PolicyId}
              placeholder="PolicyID"
              label="PolicyID"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="BillToDate"
                  name="BillToDate"
                  value={
                    data?.NxtBillDate === ""
                      ? ""
                      :data?.NxtBillDate
                  }
                  placeholder="Bill To Date"
                  label="Bill To Date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
        </Grid2>
      </CustomAdjPremModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AdjPremModal;