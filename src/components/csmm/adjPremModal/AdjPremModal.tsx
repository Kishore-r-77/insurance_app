import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomAdjPremModal from "./CustomAdjPremModal";
import Notification from "../../../utilities/Notification/Notification";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AdjPremModal({
  open,
  handleClose,
  data,
  completed,
  setcompleted,
  func,
  setfunc,
  getData,
}: any) {
  const size: string = "xl";
  const title: string = "Premium Adjustment";
  const [nextDate, setNextDate] = useState<any>(null);
  const [result, setresult] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [isResult, setIsResult] = useState(false);

  const resultOpen = () => {
    setIsResult(true);
  };
  const resultClose = () => {
    setIsResult(false);
    setcompleted(true);
    setfunc("Save");
  };

  useEffect(() => {
    setNextDate("");
    return () => {};
  }, [open === false]);

  const doPremAdj = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/premadj/${data?.PolicyId}`,
        {
          PolicyID: data?.PolicyId,
          NextDate: moment(nextDate).format("YYYYMMDD"),
          Function: func,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcompleted(true);
        setfunc("Save");
        // if (func === "Save") {
        //   setcompleted(false);
        // }
        setresult(resp.data?.result);
        setIsResult(true);
        if (func === "Save") {
          handleClose();
          getData();
          setNotify({
            isOpen: true,
            message: resp.data?.success,
            type: "success",
          });
        }
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  // moment(data?.NxtBillDate,"DD/MM/YYYY").format("YYYYMMDD").toString()

  const billToDatechange = (date: any) => {
    console.log("Date", date);
    setNextDate(date + 1);
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

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
        completed={completed}
      >
        <Grid2 container spacing={2}>
          <Grid2 lg={4}>
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
          <Grid2 lg={4}>
            <TextField
              id="OwnerName"
              name="OwnerName"
              value={data?.OwnerName}
              placeholder="OwnerName"
              label="OwnerName"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Current Date"
              name="Current Date"
              value={formattedToday}
              placeholder="Current Date"
              label="Current Date"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Premium Risk Cessastion Date"
              name="Premium Risk Cessastion Date"
              value={data?.Rcd}
              placeholder="Premium Risk Cessastion Date"
              label="Premium Risk Cessastion Date"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Intallment Premium"
              name="Intallment Premium"
              value={data?.InstalmentPrem}
              placeholder="Intallment Premium"
              label="Intallment Premium"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Paid To Date"
              name="Paid To Date"
              value={data?.Ptdate}
              placeholder="Paid To Date"
              label="Paid To Date"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Frequency"
              name="Frequency"
              value={data?.Frequency}
              placeholder="Frequency"
              label="Frequency"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <hr style={{ color: "black", height: "20px" }} />
          <Grid2 xs={8} md={6} lg={4}>
            <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  readOnly={isResult}
                  label="Next Date"
                  inputFormat="DD/MM/YYYY"
                  value={nextDate}
                  onChange={(date) => billToDatechange(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="PolicyDeposit"
              name="PolicyDeposit"
              value={data?.PolicyDeposit}
              placeholder="PolicyDeposit"
              label="PolicyDeposit"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 lg={4}>
            <TextField
              id="No Of Dues"
              name="No Of Dues"
              value={result?.NoOfDues}
              placeholder="No Of Dues"
              label="No Of Dues"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Total Premium"
              name="Total Premium"
              value={result?.TotalPrem}
              placeholder="Total Premium"
              label="Total Premium"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="GST"
              name="GST"
              value={result?.TotalGST}
              placeholder="GST"
              label="GST"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="Total Amount"
              name="Total Amount"
              value={result?.TotalAmount}
              placeholder="Total Amount"
              label="Total Amount"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
        </Grid2>
      </CustomAdjPremModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AdjPremModal;
