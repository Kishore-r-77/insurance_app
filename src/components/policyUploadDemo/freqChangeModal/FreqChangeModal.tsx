import { MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import { freqItems } from "../../clientDetails/client/clientApis/clientApis";
import CustomFreqChangeModal from "./CustomFreqChangeModal";

function FreqChangeModal({
  open,
  handleClose,
  policyId,
  completed,
  setcompleted,
  func,
  setfunc,
  getData,
}: any) {
  const size: string = "xl";
  const title: string = "Frequency Change";
  const [frequency, setfrequency] = useState<any>("");

  const [premium, setpremium] = useState<any>(0);

  const [result, setresult] = useState<any>("");
  const [policyData, setpolicyData] = useState<any>("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [isPolicy, setisPolicy] = useState(false);
  const getByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/policyget/${policyId}`,

        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpolicyData(resp.data?.Policy);
        setisPolicy(!isPolicy);
        getData();
      })
      .catch((err) => {});
  };

  const getFreqChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changefreq`,
        {
          PolicyID: policyId,
          Frequency: frequency,
          Function: func,
          Premium: parseInt(premium),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcompleted(true);
        setfunc("Save");
        setpremium(resp.data?.result?.Premium);
        setresult(resp.data?.result);
        if (func === "Save") {
          handleClose();
          setNotify({
            isOpen: true,
            message: resp.data?.Success,
            type: "success",
          });
          setfrequency("");
          setpremium("");
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

  const [pFreqData, setPFreqData] = useState([]);
  const getPFreq = (
    companyId: number,
    name: string,
    item: string,
    languageId: number,
    func: string
  ) => {
    freqItems(companyId, name, item, languageId, func)
      .then((resp) => {
        setPFreqData(resp.data?.AllowedFrequencies);
        return resp.data?.AllowedFrequencies;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getByPolicy();

    return () => {};
  }, [open]);
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  useEffect(() => {
    getPFreq(
      policyData?.CompanyID,
      "Q0005",
      policyData?.PProduct,
      languageId,
      "Frequencies"
    );
    return () => {};
  }, [isPolicy]);

  return (
    <div>
      <CustomFreqChangeModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={getFreqChange}
        size={size}
        title={title}
        completed={completed}
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
              select
              id="Frequency"
              name="Frequency"
              value={frequency}
              placeholder="Frequency"
              onChange={(e) => setfrequency(e.target.value)}
              label="Frequency"
              fullWidth
              margin="dense"
            >
              {pFreqData.map((val: any) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              id="Function"
              name="Function"
              value={func}
              onChange={(e) => setfunc(e.target.value)}
              placeholder="Function"
              inputProps={{ readOnly: true }}
              label="Function"
              fullWidth
              margin="dense"
            />
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              type="number"
              id="Premium"
              name="Premium"
              value={premium}
              onChange={(e) => setpremium(e.target.value)}
              placeholder="Premium"
              InputLabelProps={{ shrink: true }}
              label="Premium"
              fullWidth
              margin="dense"
            />
          </Grid2>
        </Grid2>
      </CustomFreqChangeModal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default FreqChangeModal;
