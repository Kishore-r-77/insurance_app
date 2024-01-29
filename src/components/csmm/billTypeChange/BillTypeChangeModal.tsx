import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormControl, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CustomModal from "../../../utilities/modal/CustomModal";
import Agency from "../../agency/Agency";

import CustomBillTypeChangeModal from "./CustomBillTypeChangeModal";
import { paramItem } from "../surrenderModal/surrenderApi";
import PAuth from "../../clientDetails/pAuthority/Pauth";

function BillTypeChangeModal({
  open,
  handleClose,
  data,
  completed,
  setcompleted,
  func,
  setfunc,
  getData,
  payingAuthorityId,
  SetpayingAuthorityId,
  billtypeChange,
  setbilltypeChange,
}: any) {
  const size: string = "xl";
  const title: string = "BillType Change";
  //const [nextDate, setNextDate] = useState<any>(null);
  const [result, setresult] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const [isResult, setIsResult] = useState(false);

  useEffect(() => {
    setIsResult(false);
    //setNextDate("");
    setresult("");
    setfunc("Calculate");
    setcompleted(false);
    return () => {};
  }, [open === false]);

  const handleBTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setbilltypeChange((prev: any) => ({ ...prev, [name]: value }));
    console.log(value, "value");
  };

  const [isBTypeModalOpen, setIsBTypeModalOpen] = useState(false);
  const handleNewBTypeClick = () => {
    setIsBTypeModalOpen(true);
  };
 
  const [paid,Setpaid] = useState ()  

  const handleAgencySelection = (PayingAuthority: any) => {
    const newpaid = PayingAuthority.ID;
    setbilltypeChange((prev: any) => ({ ...prev, PayingAuthority: PayingAuthority }));
    Setpaid(newpaid);
    setIsBTypeModalOpen(false);
    console.log(paid, "paid");
  };

  const handlePaClose = () => {
    setIsBTypeModalOpen(false);
  };

  
  const doBillTypeChange = (state: any) => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/billtypechange/${data?.PolicyId}`,
        {
          CompanyID: data?.CompanyId,
          PolicyID: data?.PolicyId,
          NewBillType: billingType,
          PayingAuthority: payingAuthorityId || 0,
          Function: func,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcompleted(true);
        setfunc("Save");
        setresult(resp.data?.result);
        setIsResult(true);
        if (func === "Save") {
          handleClose();
          getData();
          setNotify({
            isOpen: true,
            message: "Saved",
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
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;

  

  const payingAuthorityOpenFunc = (item: any) => {
   
    SetpayingAuthorityId(item.ID); 
    handlePaClose()
  };

  const [billingType, setbillingType] = useState<any>("");

  useEffect(() => {
    setbilltypeChange("")
    setbillingType("")
    SetpayingAuthorityId("")
  
    return () => {
      
    }
  }, [open === true])
  
  const [billingData, setbillingData] = useState([]);
  const getBilling = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setbillingData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getBilling(companyId, "P0055", languageId);

    return () => {};
  }, []);

  return (
    <div>
      <CustomBillTypeChangeModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doBillTypeChange}
        size={size}
        title={title}
        completed={completed}
      >
        <Grid2 container spacing={2}>
          <Grid2 lg={4}>
            <TextField 
              id="CompanyID"
              name="CompanyID"
              value={data?.CompanyName}
              placeholder="CompanyID"
              label="CompanyID"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
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
          <Grid2 lg={12} /> {/* This empty Grid2 will create space */}
          <hr style={{ color: "black", height: "20px" }} />
          <Grid2 lg={4}>
            <TextField
              id="BillingType"
              name="BillingType"
              value={data?.BillingType}
              placeholder="CurrentBillingType"
              label="CurrentBillingType"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={4}>
            <TextField
              id="PayingAuthorityId"
              name="PayingAuthorityId"
              value={data?.PayingAuthorityId}
              placeholder="CurrentPayingAuthority"
              label="CurrentPayingAuthority"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={12} /> {/* This empty Grid2 will create space */}
         
          <Grid2 xs={8} md={6} lg={4}>
            <TextField
              select
              id="BillingType"
              name="BillingType"
              value={billingType}
              placeholder="New billing_type"
              label=" New billing_type"
              onChange={(e) => setbillingType(e.target.value)}
              fullWidth
              margin="dense"
            >
              {billingData.map((val: any) => (
                <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
              ))}
            </TextField>
          </Grid2>
          <CustomModal size={size} open={isBTypeModalOpen} handleClose={  handlePaClose}>
         <PAuth modalFunc={payingAuthorityOpenFunc} />
         </CustomModal>
          {billingType === "SSI"? 
          <Grid2 xs={8} md={6} lg={4}>
            <TextField
              
              id="PayingAuthority"
              name="PayingAuthority"
              value={payingAuthorityId}
              placeholder="PayingAuthority"
              label="PayingAuthority"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBTypeChange(e)}
              fullWidth
              margin="dense"
              onClick={handleNewBTypeClick}
            >              
            </TextField>
          </Grid2> : null}
        </Grid2>
      </CustomBillTypeChangeModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default BillTypeChangeModal;
