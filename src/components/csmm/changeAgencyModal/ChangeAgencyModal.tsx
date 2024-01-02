import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormControl, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomChangeAgencyModal from "./CustomChangeAgencyModal";
import CustomModal from "../../../utilities/modal/CustomModal";
import Agency from "../../agency/Agency";
import AgencyModal from "../../agency/agencyModal/AgencyModal";


function ChangeAgencyModal({
  open,
  handleClose,
  data,
  completed,
  setcompleted,
  func,
  setfunc,
  getData,
  selectedAgencyId,
  SetselectedAgencyId,
  agentClientData,
  SetagentClientData,
  agChange,
  setagChange
  
  
}: any) {
  const size: string = "xl";
  const title: string = "Agency Change";
  //const [nextDate, setNextDate] = useState<any>(null);
  const [result, setresult] = useState<any>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
 console.log("******",data)


  const [isResult, setIsResult] = useState(false);
  
  

  useEffect(() => {
    setIsResult(false);
    //setNextDate("");
    setresult("");
    setfunc("Calculate");
    setcompleted(false);
    return () => {};
  }, [open === false]);

  // const [agChange, setagChange] = useState<any>({NewAgent:"",TerminationReason:""});

  const handleAgChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const{name,value }= e.target
    setagChange((prev :any)=>({...prev,[name]:value}))
    console.log(value,"value")
  }

  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const handleNewAgentClick = () => {
    setIsAgencyModalOpen(true);
  };
  const [agencyid,Setagencyid] = useState ()  
  
  const handleAgencySelection = (NewAgent: any) => {
    const newagencyid = NewAgent.ID
    setagChange((prev: any) => ({ ...prev, NewAgent: NewAgent }));
    Setagencyid(newagencyid)
    setIsAgencyModalOpen(false); 
    console.log(agencyid,"agencyid")
  };

  const handleAgencyClose = ()=>{
    setIsAgencyModalOpen(false); 
  }

  const doAgencyChange = (state: any) => {
    axios
      .post(
        `http://localhost:3000/api/v1/customerservice/polagencychange/${data?.PolicyId}`,
        {
          CompanyID:data?.CompanyId,
          PolicyID: data?.PolicyId,
          //NewAgent: +agChange?.NewAgent,
          NewAgent: +selectedAgencyId,
          TerminationReason:agChange?.TerminationReason,
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

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const [agencyClientid,SetagencyClientid] = useState(0)
  
  const agencyOpenFunc = (item: any) => {
    console.log("*** agencyopenfunc ***",item.ClientID )
    SetselectedAgencyId(item.ID)
    SetagencyClientid(item.ClientID)
    handleAgencyClose()  
  };

  const getClientByNewAgentId = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${agencyClientid}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        SetagentClientData(resp.data.Client);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    // getCoverage();
    getClientByNewAgentId();
    return () => {};
  }, [agencyClientid]);


  

  return (
    <div>
      <CustomChangeAgencyModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={doAgencyChange}
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
              id="AgentId"
              name="AgentId"
              value={data?.AgencyId}
              placeholder="CurrentAgent"
              label="CurrentAgent"
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
              placeholder="CurrentClient"
              label="CurrentClient"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={12} /> {/* This empty Grid2 will create space */}
          <Grid2 lg={4}>
         <CustomModal size={size} open={isAgencyModalOpen} handleClose={handleAgencyClose}>
         <Agency modalFunc={agencyOpenFunc} />
         </CustomModal>

         <TextField
          id="NewAgent"
          name="NewAgent"
          value={selectedAgencyId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgChange(e)}
          placeholder="NewAgentId"
          label="NewAgentId"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
          onClick={handleNewAgentClick}
        />
       </Grid2>
         <Grid2 lg={4}>
            <TextField
              id="ClientID"
              name="ClientID"
              value={agentClientData?.ClientShortName}
              placeholder="NewClient"
              label="NewClient"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={12} /> {/* This empty Grid2 will create space */}
          <Grid2 lg={4}>
                <TextField
                  multiline
                  id="TerminationReason"
                  name="TerminationReason"
                  value={agChange?.TerminationReason}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleAgChange(e)}
                  placeholder="Reason Description"
                  label="Reason Description"
                  fullWidth
                  margin="dense"
                  //onChange={(e) => onChange(e)}
                />
              </Grid2>
            </Grid2>
     </CustomChangeAgencyModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
   
  );
}

export default ChangeAgencyModal;
